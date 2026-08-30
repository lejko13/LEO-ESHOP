import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const black_tee = {
  id: "black_tee",
  code: "TS-01",
  name: {
    en: "Oversized Tee",
    sk: "Oversized tričko",
  },
  price: 45.0,
  currency: "EUR",
  description: {
    en: "A heavyweight, boxy-fit tee in black with dropped shoulders for an oversized silhouette.",
    sk: "Ťažké tričko v čiernej farbe s boxy strihom a spustenými ramenami pre oversized siluetu.",
  },
  features: {
    en: [
      "Heavyweight cotton",
      "Dropped shoulders, oversized fit",
      "Made in Slovakia",
    ],
    sk: [
      "Ťažká bavlna",
      "Spustené ramená, oversized strih",
      "Šité na Slovensku",
    ],
  },
  category: "t-shirts",
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

export default black_tee;
