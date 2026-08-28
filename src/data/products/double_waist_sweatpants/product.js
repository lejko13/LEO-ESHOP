import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const double_waist_sweatpants = {
  id: "double_waist_sweatpants",
  code: "PT-17",
  name: {
    en: "Double Waistband Sweatpants",
    sk: "Tepláky s dvojitým pásom",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants with a layered double waistband — a black outer band over a camo inner layer.",
    sk: "Tepláky so širokou nohavicou s vrstveným dvojitým pásom — čierny vrchný pás nad maskáčovou vnútornou vrstvou.",
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
  },
};

export default double_waist_sweatpants;
