import { useLanguage } from "../hooks/useLanguage.js";
import ContactForm from "../components/contact/ContactForm.jsx";

// The actual form (fields, image upload, Supabase submit logic) lives in
// ContactForm.jsx so it can be reused by GateOverlay's embedded contact
// mode too, since the gate blocks all routing while locked — see
// GateOverlay.jsx.
const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto px-5 py-24">
      <h1 className="text-[11px] uppercase tracking-widest2 text-black/50 mb-8">
        {t("contact.title")}
      </h1>
      <ContactForm />
    </div>
  );
};

export default Contact;
