// Single source of truth for the seller's legal/business identification —
// used by the Footer. Keep in sync with api/_lib/invoice.js's SELLER
// constant if either ever changes (that one stays server-side/CommonJS-
// friendly on purpose, so it's not imported directly from here).
export const BUSINESS = {
  legalName: "Leo Fudaly",
  brand: "LEO FUDALY",
  addressLine1: "Krátka 91/8A",
  addressLine2: "059 01 Spišská Belá",
  ico: "57726256",
  dic: "1131312732",
  email: "leo.fudaly@gmail.com",
  phone: "+421 908 836 584",
};
