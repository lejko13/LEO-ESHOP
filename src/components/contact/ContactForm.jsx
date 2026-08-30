import { useState, useRef, useEffect, useMemo } from "react";
import { useLanguage } from "../../hooks/useLanguage.js";
import { supabase, isSupabaseConfigured } from "../../config/supabase.js";
import Button from "../ui/Button.jsx";

const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent";

const MAX_FILES = 5;

// Shared by the full /contact page and the gate overlay's embedded contact
// mode (the gate blocks routing entirely while locked, so it needs its own
// copy of this form rather than a link to /contact — see GateOverlay.jsx).
//
// Reference images are optional — mainly for custom/made-to-order requests
// where someone wants to show what they have in mind. Files upload to the
// "contact-uploads" Storage bucket, and their public URLs are saved
// alongside the message in the "contact_messages" table's `image_urls`
// column. Required Supabase setup (bucket + policies + column) is in the
// project setup notes given alongside this change.
const ContactForm = () => {
  const { t } = useLanguage();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
  };

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files || []);

    setFiles((prev) => {
      const combined = [...prev, ...selected];
      // De-dupe in case the same file gets picked twice across separate
      // "Vybrať súbory" clicks.
      const seen = new Set();
      const deduped = combined.filter((f) => {
        const key = `${f.name}-${f.size}-${f.lastModified}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return deduped.slice(0, MAX_FILES);
    });

    // Native file inputs otherwise won't fire onChange again if the person
    // reopens the picker and selects the exact same file(s).
    e.target.value = "";
  };

  // Small local thumbnails for the picked files (before upload) — compact,
  // fixed-size squares rather than a growing filename list, so attaching
  // photos doesn't stretch the rest of the form.
  const previewUrls = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files]
  );
  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const removeFile = (index) => {
    setFiles((f) => f.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const urls = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("contact-uploads")
        .upload(path, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage
        .from("contact-uploads")
        .getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured) return;
    if (!values.name.trim() || !values.email.trim() || !values.message.trim())
      return;

    setStatus("sending");
    try {
      const image_urls = files.length ? await uploadImages() : [];
      const { error } = await supabase.from("contact_messages").insert({
        name: values.name,
        email: values.email,
        message: values.message,
        image_urls,
      });
      if (error) throw error;
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Best-effort — the message is already saved above, so a failure here
      // (e.g. Resend not configured yet) must not affect the success state
      // the person already sees.
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: values.name,
          email: values.email,
          message: values.message,
          image_urls,
        }),
      }).catch(() => {});
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="text-[11px] uppercase tracking-widest2 text-black/70 text-center">
        {t("contact.sent")}
      </p>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input
        type="text"
        required
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder={t("contact.name")}
        className={inputClass}
      />
      <input
        type="email"
        required
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder={t("contact.email")}
        className={inputClass}
      />
      <textarea
        required
        rows={3}
        value={values.message}
        onChange={(e) => handleChange("message", e.target.value)}
        placeholder={t("contact.message")}
        className={inputClass}
      />

      <div>
        <label className="block text-[10px] uppercase tracking-widest2 text-black/40 mb-2">
          {t("contact.attachImages")}
        </label>
        {/* The native file input's own button + "no file chosen" label are
            rendered by the browser itself (OS chrome), not by our CSS/JS —
            they always follow the browser/OS language and can't be
            translated. Hiding the native input and driving it from our own
            button keeps everything on this form in the site's language. */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="sr-only"
        />
        <div className="flex flex-col items-start gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={files.length >= MAX_FILES}
            className="py-2 px-3 border border-black/20 bg-transparent text-[10px] uppercase tracking-widest2 hover:border-black transition-colors disabled:opacity-30 disabled:hover:border-black/20"
          >
            {t("contact.chooseFiles")}
          </button>
          <span className="text-[11px] text-black/40 truncate">
            {files.length === 0
              ? t("contact.noFileChosen")
              : t("contact.filesSelected", { count: files.length })}
          </span>
        </div>
        <p className="text-[9px] uppercase tracking-widest2 text-black/30 mt-2">
          {t("contact.attachHint")}
        </p>

        {files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {files.map((f, i) => (
              <div key={`${f.name}-${f.size}-${i}`} className="relative w-14 h-14 shrink-0">
                <img
                  src={previewUrls[i]}
                  alt={f.name}
                  className="w-14 h-14 object-cover border border-black/10"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={t("contact.removeImage")}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-black text-white text-[10px] leading-none rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {status === "error" && (
        <p className="text-[10px] uppercase tracking-widest2 text-black/40">
          {t("contact.error")}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "sending" || !isSupabaseConfigured}
        className="w-full disabled:opacity-40"
      >
        {status === "sending" ? t("contact.sending") : t("contact.send")}
      </Button>

      {!isSupabaseConfigured && (
        <p className="text-[9px] uppercase tracking-widest2 text-black/20 text-center">
          {t("gate.notConfigured")}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
