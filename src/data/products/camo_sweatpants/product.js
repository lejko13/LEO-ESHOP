import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const camo_sweatpants = {
  id: "camo_sweatpants",
  code: "PT-06",
  name: {
    en: "Camo Sweatpants",
    sk: "Maskáčové tepláky",
  },
  price: 79.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants in a classic woodland camo print, cut to match the Camo Hoodie.",
    sk: "Tepláky so širokou nohavicou s klasickou maskáčovou potlačou, strihom ladiace s maskáčovou mikinou.",
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Camo"],
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
  },
};

export default camo_sweatpants;
