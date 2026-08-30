import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const split_camo_pants_light = {
  id: "split_camo_pants_light",
  code: "PT-27",
  name: {
    en: "Split Camo Pants — Light Wash",
    sk: "Delené maskáčové nohavice — svetlý denim",
  },
  price: 99.0,
  currency: "EUR",
  description: {
    en: "Pants split down the middle — one leg in woodland camo twill, the other in light-wash denim.",
    sk: "Nohavice delené v strede — jedna nohavica z maskáčového tvílu, druhá zo svetlého denimu.",
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
    extra4,
  },
};

export default split_camo_pants_light;
