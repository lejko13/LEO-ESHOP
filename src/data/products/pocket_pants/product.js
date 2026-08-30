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
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Wide-leg corduroy cargo pants with a drawstring waist and utility pockets down each leg.",
    sk: "Menčestrové cargo nohavice so širokou nohavicou, sťahovacím pásom a úžitkovými vreckami na oboch nohaviciach.",
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "B",
  big: "A",
  delivery: {
    en: "Ships in 1-2 business days, delivery in 3-5 business days",
    sk: "Expedicia do 1-2 pracovnych dni, dorucenie do 3-5 pracovnych dni",
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
