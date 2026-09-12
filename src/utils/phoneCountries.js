import { getCountryCallingCode, getExampleNumber } from "libphonenumber-js";
import examplePhoneNumbers from "libphonenumber-js/examples.mobile.json";

// Phone country picker is deliberately limited to Slovakia and Czechia —
// this shop's actual customer base (matches DELIVERY_COUNTRIES in
// data/shippingMethods.js, the only two priced shipping destinations).
// Kept as an ordered list (not just an object) so this order is also the
// dropdown's order — Slovakia first since that's the default.
const SUPPORTED_PHONE_COUNTRIES = ["SK", "CZ"];

const FLAG_OFFSET = 127397; // regional indicator symbol base offset — 'A'
// (charCode 65) + this lands on U+1F1E6 (regional indicator 'A'), so e.g.
// "SK" becomes the flag pieced together from the regional indicators for
// S and K. No image assets or extra data needed, works the same in both
// languages.
export const countryFlagEmoji = (isoCode) =>
  isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(FLAG_OFFSET + char.charCodeAt(0)));

// Builds { value, label, callingCode } options for the phone country
// picker (CustomSelect's shape) — flag, dial code, and the full country
// name (e.g. "🇸🇰 +421 Slovensko"), so it reads clearly rather than just
// a flag + number. Country names come from the runtime's own
// Intl.DisplayNames rather than a hand-maintained translation, so they
// follow the SK/EN language toggle for free.
export const buildPhoneCountryOptions = (language) => {
  const displayNames = new Intl.DisplayNames([language], { type: "region" });
  return SUPPORTED_PHONE_COUNTRIES.map((code) => ({
    value: code,
    label: `${countryFlagEmoji(code)} +${getCountryCallingCode(code)} ${displayNames.of(code) ?? code}`,
    callingCode: getCountryCallingCode(code),
  }));
};

// Real, valid-format example mobile number for the picked country (e.g.
// "0912 123 456" for SK, "601 123 456" for CZ) — used as the phone
// input's placeholder so shoppers see the expected format at a glance
// instead of a generic "Telefón" label. Comes from libphonenumber-js's
// own bundled example-number dataset (examples.mobile.json), not
// hand-typed, so it's always a realistic, correctly-shaped number.
export const getPhoneExamplePlaceholder = (countryCode) => {
  const example = getExampleNumber(countryCode, examplePhoneNumbers);
  return example ? example.formatNational() : "";
};
