import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";

const camo_pants = {
  id: "camo_pants",
  code: "PT-04",
  name: {
    en: "Camo Cargo Pants",
    sk: "Maskáčové cargo nohavice",
  },
  price: 89.0,
  currency: "EUR",
  description: {
    en: "Wide-leg cargo pants in a classic woodland camo print, with utility pockets down each leg.",
    sk: "Cargo nohavice so širokou nohavicou a klasickou maskáčovou potlačou, s úžitkovými vreckami na oboch nohaviciach.",
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Camo"],
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
  },
};

export default camo_pants;
