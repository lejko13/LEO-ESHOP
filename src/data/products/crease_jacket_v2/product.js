import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";
import extra6 from "./extra6.webp";

const crease_jacket_v2 = {
  id: "crease_jacket_v2",
  code: "JK-01",
  name: {
    en: "Crease Jacket V2",
    sk: "Bunda Crease V2",
  },
  price: 220.0,
  currency: "EUR",
  description: {
    en: "A cropped, hooded jacket with a crinkled, sculptural nylon finish and full front zip.",
    sk: "Skrátená bunda s kapucňou, pokrčeným sochárskym nylonovým povrchom a predným zipsom v celej dĺžke.",
  },
  features: {
    en: [
      "Crinkled, sculptural nylon",
      "Full front zip",
      "High-quality natural filling",
      "Made in Slovakia",
    ],
    sk: [
      "Pokrčený, sochársky nylon",
      "Plný predný zips",
      "Kvalitná prírodná výplň",
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
    detail,
    extra4,
    extra5,
    extra6,
  },
};

export default crease_jacket_v2;
