import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const hoodie_black_sprayed = {
  id: "hoodie_black_sprayed",
  code: "HD-06",
  name: {
    en: "Sprayed Hoodie",
    sk: "Postriekaná mikina",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "A heavyweight hoodie finished with a hand-sprayed, paint-splatter print — no two are exactly alike.",
    sk: "Ťažká mikina dokončená ručne striekanou potlačou v štýle rozstrekanej farby — žiadne dve nie sú úplne rovnaké.",
  },
  features: {
    en: [
      "Hand-sprayed splatter print",
      "Every piece unique",
      "Made in Slovakia",
    ],
    sk: [
      "Ručne nastriekaný vzor",
      "Každý kus je unikát",
      "Šité na Slovensku",
    ],
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
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

export default hoodie_black_sprayed;
