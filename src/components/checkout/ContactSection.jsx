import { useLanguage } from "../../hooks/useLanguage.js";

// Same input style as Contact.jsx (border-b, transparent, no box) — reused
// rather than reinvented.
const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent";
const errorClass = "text-[10px] uppercase tracking-widest2 text-red-600 mt-1";
const sectionLabelClass = "text-[10px] uppercase tracking-widest2 text-black/30 mb-3";

const ContactSection = ({ values, errors, touched, onChange, onBlur }) => {
  const { t } = useLanguage();

  return (
    <div className="mb-10">
      <p className={sectionLabelClass}>{t("checkout.contact")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder={t("checkout.firstName")}
            value={values.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            onBlur={() => onBlur("firstName")}
            className={inputClass}
          />
          {touched.firstName && errors.firstName && (
            <p className={errorClass}>{errors.firstName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder={t("checkout.lastName")}
            value={values.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            onBlur={() => onBlur("lastName")}
            className={inputClass}
          />
          {touched.lastName && errors.lastName && (
            <p className={errorClass}>{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <input
          type="email"
          placeholder={t("checkout.email")}
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => onBlur("email")}
          className={inputClass}
        />
        {touched.email && errors.email && (
          <p className={errorClass}>{errors.email}</p>
        )}
      </div>

      <div className="mt-4">
        <input
          type="tel"
          placeholder={t("checkout.phone")}
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          onBlur={() => onBlur("phone")}
          className={inputClass}
        />
        {touched.phone && errors.phone && (
          <p className={errorClass}>{errors.phone}</p>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
