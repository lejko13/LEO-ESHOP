import { useState, useRef } from "react";
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

  const handleChange = (field, value) =>
    setValues((v) => ({ ...v, [field]: value }));

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files || []).slice(0, MAX_FILES);
    setFiles(selected);
  };

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
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="text-[11px] uppercase tracking-widest2 text-black/70">
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
        rows={4}
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="py-2 px-3 border border-black/20 bg-transparent text-[10px] uppercase tracking-widest2 hover:border-black transition-colors"
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
          <ul className="mt-3 space-y-1">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between text-[11px] text-black/60"
              >
                <span className="truncate pr-2">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-black/30 hover:text-black shrink-0"
                  aria-label={t("contact.removeImage")}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
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
