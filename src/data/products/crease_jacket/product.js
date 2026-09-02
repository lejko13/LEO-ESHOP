import front from "./front.webp";
import back from "./back.webp";

const crease_jacket = {
  id: "crease_jacket",
  code: "JK-05",
  name: {
    en: "Crease Pullover Jacket",
    sk: "Pulóverová bunda Crease",
  },
  price: 220.0,
  currency: "EUR",
  description: {
    en: "A cropped pullover jacket with a crinkled, sculptural nylon finish and an oversized hood.",
    sk: "Skrátená pulóverová bunda s pokrčeným sochárskym nylonovým povrchom a oversized kapucňou.",
  },
  features: {
    en: [
      "Crinkled, sculptural nylon",
      "Oversized hood",
      "Made in Slovakia",
    ],
    sk: [
      "Pokrčený, sochársky nylon",
      "Oversized kapucňa",
      "Šité na Slovensku",
    ],
  },
  category: "jackets",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "A",
  big: "B",
  delivery: {
    en: "Production/Dispatch: within 4-5 business days\nDelivery: within 1-2 business days after your item is completed\n(each piece is handmade to order, so delivery times may vary slightly)",
    sk: "Výroba/Expedícia: do 4-5 pracovných dní\nDodanie: do 1-2 pracovných dní od dokončenia produktu\n(každý kus šijeme ručne na objednávku, termín dodania sa preto môže mierne líšiť)",
  },
  images: {
    front,
    back,
    detail: null,
  },
};

export default crease_jacket;
