import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";

const sweatpants_black_sprayed = {
  id: "sweatpants_black_sprayed",
  code: "PT-14",
  name: {
    en: "Sprayed Sweatpants",
    sk: "Postriekané tepláky",
  },
  price: 89.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants finished with a hand-sprayed, paint-splatter print, cut to match the Sprayed Hoodie.",
    sk: "Tepláky so širokou nohavicou dokončené ručne striekanou potlačou, strihom ladiace s postriekanou mikinou.",
  },
  category: "tracksuit",
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
  },
};

export default sweatpants_black_sprayed;
