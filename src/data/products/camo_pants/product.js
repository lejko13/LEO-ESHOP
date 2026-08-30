import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";

const camo_pants = {
  id: "camo_pants",
  code: "PT-04",
  name: {
    en: "Camo Cargo Pants",
    sk: "Maskáčové cargo nohavice",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Wide-leg cargo pants in a classic woodland camo print, with utility pockets down each leg.",
    sk: "Cargo nohavice so širokou nohavicou a klasickou maskáčovou potlačou, s úžitkovými vreckami na oboch nohaviciach.",
  },
  features: {
    en: [
      "Classic woodland camo",
      "Utility cargo pockets",
      "Made in Slovakia",
    ],
    sk: [
      "Klasický lesný maskáč",
      "Nákladné vrecká na nohaviciach",
      "Šité na Slovensku",
    ],
  },
  category: "pants",
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
  },
};

export default camo_pants;
