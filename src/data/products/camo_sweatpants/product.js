import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const camo_sweatpants = {
  id: "camo_sweatpants",
  code: "PT-06",
  name: {
    en: "Camo Sweatpants",
    sk: "Maskáčové tepláky",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants in a classic woodland camo print, cut to match the Camo Hoodie.",
    sk: "Tepláky so širokou nohavicou s klasickou maskáčovou potlačou, strihom ladiace s maskáčovou mikinou.",
  },
  features: {
    en: [
      "Classic woodland camo",
      "Matches the Camo Hoodie",
      "Made in Slovakia",
    ],
    sk: [
      "Klasický lesný maskáč",
      "Ladí s Maskáčovou mikinou",
      "Šité na Slovensku",
    ],
  },
  category: "tracksuit",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Camo"],
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
    extra4,
  },
};

export default camo_sweatpants;
