import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const split_camo_pants_light = {
  id: "split_camo_pants_light",
  code: "PT-27",
  name: {
    en: "Split Camo Pants — Light Wash",
    sk: "Delené maskáčové nohavice — svetlý denim",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Pants split down the middle — one leg in woodland camo twill, the other in light-wash denim.",
    sk: "Nohavice delené v strede — jedna nohavica z maskáčového tvílu, druhá zo svetlého denimu.",
  },
  features: {
    en: [
      "Split design — camo and denim",
      "One leg camo, one light-wash denim",
      "Made in Slovakia",
    ],
    sk: [
      "Delený dizajn — maskáč a denim",
      "Jedna nohavica maskáč, druhá svetlý denim",
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
    extra4,
  },
};

export default split_camo_pants_light;
