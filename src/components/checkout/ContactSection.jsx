import { useMemo } from "react";
import { useLanguage } from "../../hooks/useLanguage.js";
import { buildPhoneCountryOptions, getPhoneExamplePlaceholder } from "../../utils/phoneCountries.js";
import CustomSelect from "../ui/CustomSelect.jsx";

// Same input style as Contact.jsx (border-b, transparent, no box) — reused
// rather than reinvented.
const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] leading-[1.2] font-normal bg-transparent";
const errorClass = "text-[10px] uppercase tracking-widest2 text-red-600 mt-1";
const sectionLabelClass = "text-[10px] uppercase tracking-widest2 text-black/30 mb-3";

const ContactSection = ({
  values,
  errors,
  touched,
  onChange,
  onBlur,
  phoneCountry,
  onPhoneCountryChange,
}) => {
  const { t, language } = useLanguage();

  // Rebuilt only when the interface language actually changes (country
  // names come from Intl.DisplayNames, keyed by language — see
  // utils/phoneCountries.js), not on every keystroke.
  const phoneCountryOptions = useMemo(
    () => buildPhoneCountryOptions(language),
    [language]
  );

  // Placeholder shows a real-shaped example number for the picked
  // country (e.g. "0912 123 456") instead of the generic word "Telefón",
  // so the shopper sees the expected format up front.
  const phonePlaceholder = useMemo(
    () => getPhoneExamplePlaceholder(phoneCountry),
    [phoneCountry]
  );

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
        {/* Country picker drives which numbering plan the phone number is
            checked against (see isValidPhoneNumber in Checkout.jsx) — a
            Slovak mobile number and a German one have different valid
            lengths/prefixes, so the shopper picking their country here is
            what makes that check meaningful instead of a generic "looks
            like digits" regex. */}
        <div className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-2">
          {/* Both cells are pinned to the exact same fixed height (h-11)
              instead of relying on the grid row to stretch them evenly —
              a <button> (CustomSelect) and a plain <input> can end up a
              pixel or two apart under stretch depending on how each one's
              own content/focus state affects its natural height, and a
              fixed shared height removes that uncertainty entirely so the
              two border-bottom lines always land on the same row. */}
          <div className="h-11">
            <CustomSelect
              value={phoneCountry}
              onChange={onPhoneCountryChange}
              options={phoneCountryOptions}
            />
          </div>
          <input
            type="tel"
            placeholder={phonePlaceholder}
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
            className={`${inputClass} h-11`}
          />
        </div>
        {touched.phone && errors.phone && (
          <p className={errorClass}>{errors.phone}</p>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
