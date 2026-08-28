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
  price: 99.0,
  currency: "EUR",
  description: {
    en: "Wide-leg cargo pants with oversized flap pockets and dangling strap and buckle detailing down each leg.",
    sk: "Cargo nohavice so širokou nohavicou, veľkými klopovými vreckami a visiacimi popruhmi s prackami na oboch nohaviciach.",
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "B",
  big: "B",
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

export default multi_cargo_pants;
