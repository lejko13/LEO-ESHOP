import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const zip_sweatpants = {
  id: "zip_sweatpants",
  code: "PT-16",
  name: {
    en: "Zip Sweatpants",
    sk: "Zipsové tepláky",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants finished with full-length zips down both legs.",
    sk: "Tepláky so širokou nohavicou dokončené zipsami v celej dĺžke oboch nohavíc.",
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
    extra4,
    extra5,
  },
};

export default zip_sweatpants;
