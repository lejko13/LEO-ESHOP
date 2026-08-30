import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const purple_hoodie = {
  id: "purple_hoodie",
  code: "HD-16",
  name: {
    en: "Essential Hoodie",
    sk: "Základná mikina",
  },
  price: 75.0,
  currency: "EUR",
  description: {
    en: "A relaxed, oversized hoodie made from heavyweight brushed cotton in a rich purple.",
    sk: "Voľná, oversized mikina z ťažkej česanej bavlny v sýtej fialovej farbe.",
  },
  features: {
    en: [
      "Heavyweight brushed cotton",
      "Relaxed, oversized fit",
      "Made in Slovakia",
    ],
    sk: [
      "Ťažká česaná bavlna",
      "Voľný, oversized strih",
      "Šité na Slovensku",
    ],
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Purple"],
  showSwatches: false,
  sizeChart: "A",
  big: "A",
  delivery: {
    en: "Production/Dispatch: within 4-5 business days\nDelivery: within 1-2 business days after your item is completed\n(each piece is handmade to order, so delivery times may vary slightly)",
    sk: "Výroba/Expedícia: do 4-5 pracovných dní\nDodanie: do 1-2 pracovných dní od dokončenia produktu\n(každý kus šijeme ručne na objednávku, termín dodania sa preto môže mierne líšiť)",
  },
  images: {
    front,
    back,
    detail,
    extra4,
  },
};

export default purple_hoodie;
