// TEMPORARY test-only product — exists purely so the site owner can run a
// real, tiny (0.50 EUR) end-to-end purchase (Stripe payment, Apple Pay,
// Google Pay, order saved to Supabase, confirmation emails) without having
// to pay full price for a real item. Reuses grass_bag's existing images so
// no new image assets were needed.
//
// DELETE this whole folder (and its import + entry in
// src/data/products/index.js) before a real launch — it should never be
// visible to real customers. Right now it's harmless because the whole
// site is still behind the SITE_GATE_ENABLED gate (src/config/features.js),
// so no one but the owner can even reach the shop to see it.
import front from "../grass_bag/front.webp";
import back from "../grass_bag/back.webp";
import detail from "../grass_bag/detail.webp";

const test_product = {
  id: "test_product",
  code: "TEST-01",
  name: {
    en: "TEST PRODUCT — DO NOT SELL",
    sk: "TESTOVACÍ PRODUKT — NEPREDÁVAŤ",
  },
  price: 0.01,
  currency: "EUR",
  description: {
    en: "Temporary 0.01 EUR test product for checking out the real Stripe payment flow (card, Apple Pay, Google Pay) end to end. Remove before launch.",
    sk: "Dočasný testovací produkt za 0,01 €, na overenie reálneho platobného procesu (karta, Apple Pay, Google Pay) od začiatku do konca. Pred spustením webu ho odstráň.",
  },
  features: {
    en: ["Test purposes only", "0.01 EUR", "Remove before launch"],
    sk: ["Len na testovanie", "0,01 €", "Pred spustením odstrániť"],
  },
  category: "bags",
  sizes: ["One Size"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "X",
  big: "A",
  delivery: {
    en: "Test product — not a real order.",
    sk: "Testovací produkt — nejde o reálnu objednávku.",
  },
  images: {
    front,
    back,
    detail,
  },
};

export default test_product;
