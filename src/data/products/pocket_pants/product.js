import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const pocket_pants = {
  id: "pocket_pants",
  code: "PT-12",
  name: {
    en: "Cargo Pants",
    sk: "Cargo nohavice",
  },
  price: 90.0,
  currency: "EUR",
  description: {
    en: "Cargo pants with a drawstring waist and utility pockets down each leg.",
    sk: "Cargo nohavice so širokou nohavicou, sťahovacím pásom a úžitkovými vreckami na oboch nohaviciach.",
  },
  features: {
    en: [
      "Corduroy fabric",
      "Drawstring waist, utility pockets",
      "Made in Slovakia",
    ],
    sk: [
      "Menčestrová látka",
      "Sťahovací pás a nákladné vrecká",
      "Šité na Slovensku",
    ],
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
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
    extra5,
  },
};

export default pocket_pants;
