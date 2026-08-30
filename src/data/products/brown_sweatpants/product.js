import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const brown_sweatpants = {
  id: "brown_sweatpants",
  code: "PT-20",
  name: {
    en: "Essential Sweatpants",
    sk: "Základné tepláky",
  },
  price: 75.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants in heavyweight cotton fleece, cut to match the Essential Hoodie.",
    sk: "Tepláky so širokou nohavicou z ťažkej bavlnenej teplákoviny, strihom ladiace so Základnou mikinou.",
  },
  features: {
    en: [
      "Heavyweight cotton fleece",
      "Wide-leg cut",
      "Made in Slovakia",
    ],
    sk: [
      "Ťažká bavlnená froté",
      "Široký strih nohavíc",
      "Šité na Slovensku",
    ],
  },
  category: "tracksuit",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Brown"],
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

export default brown_sweatpants;
