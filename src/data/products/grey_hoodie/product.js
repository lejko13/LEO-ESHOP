import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const grey_hoodie = {
  id: "grey_hoodie",
  code: "HD-05",
  name: {
    en: "Essential Hoodie",
    sk: "Základná mikina",
  },
  price: 75.0,
  currency: "EUR",
  description: {
    en: "A relaxed, oversized hoodie made from heavyweight brushed cotton.",
    sk: "Voľná, oversized mikina z ťažkej česanej bavlny.",
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
  colors: ["Grey"],
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

export default grey_hoodie;
