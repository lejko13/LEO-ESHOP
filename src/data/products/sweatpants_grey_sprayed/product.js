import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";

const sweatpants_grey_sprayed = {
  id: "sweatpants_grey_sprayed",
  code: "PT-15",
  name: {
    en: "Sprayed Sweatpants",
    sk: "Postriekané tepláky",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants finished with a hand-sprayed, paint-splatter print, cut to match the Sprayed Hoodie.",
    sk: "Tepláky so širokou nohavicou dokončené ručne striekanou potlačou, strihom ladiace s postriekanou mikinou.",
  },
  features: {
    en: [
      "Hand-sprayed splatter print",
      "Matches the Sprayed Hoodie",
      "Made in Slovakia",
    ],
    sk: [
      "Ručne nastriekaný vzor",
      "Ladí s Postriekanou mikinou",
      "Šité na Slovensku",
    ],
  },
  category: "tracksuit",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Grey"],
  showSwatches: false,
  sizeChart: "B",
  big: "A",
  delivery: {
    en: "Production/Dispatch: within 4-5 business days\nDelivery: within 1-2 business days after your item is completed\n(each piece is handmade to order, so delivery times may vary slightly)",
    sk: "Výroba/Expedícia: do 4-5 pracovných dní\nDodanie: do 1-2 pracovných dní od dokončenia produktu\n(každý kus šijeme ručne na objednávku, termín dodania sa preto môže mierne líšiť)",
  },
  images: {
    front,
    back,
    detail,
  },
};

export default sweatpants_grey_sprayed;
