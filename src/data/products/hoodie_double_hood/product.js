import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const hoodie_double_hood = {
  id: "hoodie_double_hood",
  code: "HD-10",
  name: {
    en: "Double Hood Zip Hoodie",
    sk: "Zipsová mikina s dvojitou kapucňou",
  },
  price: 120.0,
  currency: "EUR",
  description: {
    en: "A full-zip hoodie with a layered double hood construction for extra depth and drama.",
    sk: "Zipsová mikina s vrstvenou konštrukciou dvojitej kapucne pre výraznejší efekt.",
  },
  features: {
    en: [
      "Full front zip",
      "Layered double hood",
      "Made in Slovakia",
    ],
    sk: [
      "Plný predný zips",
      "Zdvojená kapucňa",
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
    extra5,
  },
};

export default hoodie_double_hood;
