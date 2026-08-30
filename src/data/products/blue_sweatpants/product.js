import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const blue_sweatpants = {
  id: "blue_sweatpants",
  code: "PT-02",
  name: {
    en: "Essential Sweatpants",
    sk: "Základné tepláky",
  },
  price: 75.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants in heavyweight cotton fleece, cut to match the Essential Hoodie.",
    sk: "Tepláky so širokou nohavicou z ťažkej bavlnenej teplákoviny, strihom ladiace so Základnou mikinou.",
  },
  category: "tracksuit",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Blue"],
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
  },
};

export default blue_sweatpants;
