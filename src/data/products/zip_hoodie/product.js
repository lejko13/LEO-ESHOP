import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const zip_hoodie = {
  id: "zip_hoodie",
  code: "HD-09",
  name: {
    en: "Zip Hoodie",
    sk: "Zipsová mikina",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "A cropped, full-zip hoodie in heavyweight cotton fleece with a clean, minimal silhouette.",
    sk: "Skrátená mikina na zips z ťažkej bavlnenej teplákoviny s čistou, minimalistickou siluetou.",
  },
  features: {
    en: [
      "Cropped silhouette",
      "Full front zip",
      "Made in Slovakia",
    ],
    sk: [
      "Skrátený strih",
      "Plný predný zips",
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

export default zip_hoodie;
