import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const multi_cargo_pants = {
  id: "multi_cargo_pants",
  code: "PT-18",
  name: {
    en: "Strap Cargo Pants",
    sk: "Cargo nohavice s popruhmi",
  },
  price: 120.0,
  currency: "EUR",
  description: {
    en: "Wide-leg cargo pants with oversized flap pockets and dangling strap and buckle detailing down each leg.",
    sk: "Cargo nohavice so širokou nohavicou, veľkými klopovými vreckami a visiacimi popruhmi s prackami na oboch nohaviciach.",
  },
  features: {
   en: [
  "Oversized flap pockets",
  "Dangling strap and buckle detail",
  "Waterproof",
  "Made in Slovakia",
],

sk: [
  "Nadrozmerné klopové vrecká",
  "Prívesné popruhy a spony",
  "Nepremokavé",
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

export default multi_cargo_pants;
