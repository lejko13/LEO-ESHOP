import { useState, useRef, useEffect, useMemo } from "react";
import { useLanguage } from "../../hooks/useLanguage.js";
import { supabase, isSupabaseConfigured } from "../../config/supabase.js";
import Button from "../ui/Button.jsx";

const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent";

const MAX_FILES = 5;

// Country dial-code presets. "other" means the person types the full
// international number themselves, "+" included.
const COUNTRY_CODES = [
  { value: "+421", labelKey: "contact.countrySK" },
  { value: "+420", labelKey: "contact.countryCZ" },
  { value: "other", labelKey: "contact.countryOther" },
];

// SK and CZ mobile numbers are 9 digits (spaces allowed while typing,
// e.g. "910 323 325").
const LOCAL_PHONE_PATTERN = /^[0-9]{9}$/;
// "Other" must be a full international number: leading + then 6-15 digits.
const INTL_PHONE_PATTERN = /^[+][0-9]{6,15}$/;

const isValidPhone = (countryCode, raw) => {
  const digits = raw.replace(/\s+/g, "");
  if (!digits) return true; // optional field
  return countryCode === "other"
    ? INTL_PHONE_PATTERN.test(digits)
    : LOCAL_PHONE_PATTERN.test(digits);
};

const fullPhoneNumber = (countryCode, raw) => {
  const digits = raw.replace(/\s+/g, "");
  if (!digits) return "";
  return countryCode === "other" ? digits : `${countryCode}${digits}`;
};

// Small custom dropdown for the country dial-code, styled to match the rest
// of the site (thin borders, uppercase tracked labels) instead of the
// browser's native <select> chrome.
const CountryCodeSelect = ({ value, onChange }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = COUNTRY_CODES.find((c) => c.value === value) ?? COUNTRY_CODES[0];

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-32 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between border-b border-black/20 hover:border-black focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent transition-colors"
      >
        <span className="truncate">{t(current.labelKey)}</span>
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          className={`ml-1.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full mt-1 w-full min-w-[9rem] bg-white border border-black/10 z-20"
        >
          {COUNTRY_CODES.map((c) => (
            <li key={c.value}>
              <button
                type="button"
                role="option"
                aria-selected={c.value === value}
                onClick={() => {
                  onChange(c.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-[12px] uppercase tracking-widest2 transition-colors ${
                  c.value === value
                    ? "text-black bg-black/[0.04]"
                    : "text-black/50 hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                {t(c.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [countryCode, setCountryCode] = useState("+421");
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    if (field === "phone" && phoneInvalid) setPhoneInvalid(false);
    setValues((v) => ({ ...v, [field]: value }));
  };

  const handleCountryChange = (value) => {
    setCountryCode(value);
    if (phoneInvalid) setPhoneInvalid(false);
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

    // Phone is optional, but if entered it must be a full, valid number.
    const phone = values.phone.trim();
    if (!isValidPhone(countryCode, phone)) {
      setPhoneInvalid(true);
      return;
    }
    setPhoneInvalid(false);

    setStatus("sending");
    try {
      const image_urls = files.length ? await uploadImages() : [];
      const { error } = await supabase.from("contact_messages").insert({
        name: values.name,
        email: values.email,
        phone: fullPhoneNumber(countryCode, phone),
        message: values.message,
        image_urls,
      });
      if (error) throw error;
      setStatus("sent");
      setValues({ name: "", email: "", phone: "", message: "" });
      setCountryCode("+421");
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
          phone: fullPhoneNumber(countryCode, phone),
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
      <div>
        <div className="flex gap-2">
          <CountryCodeSelect value={countryCode} onChange={handleCountryChange} />
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder={
              countryCode === "other"
                ? t("contact.phonePlaceholderOther")
                : t("contact.phonePlaceholderLocal")
            }
            title={t("contact.phoneInvalid")}
            aria-invalid={phoneInvalid}
            className={inputClass}
          />
        </div>
        {phoneInvalid && (
          <p className="mt-1 text-[10px] uppercase tracking-widest2 text-red-600">
            {t("contact.phoneInvalid")}
          </p>
        )}
      </div>
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
