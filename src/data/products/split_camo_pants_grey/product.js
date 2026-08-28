import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const split_camo_pants_grey = {
  id: "split_camo_pants_grey",
  code: "PT-13",
  name: {
    en: "Split Camo Pants",
    sk: "Delené maskáčové nohavice",
  },
  price: 99.0,
  currency: "EUR",
  description: {
    en: "Pants split down the middle — one leg in woodland camo twill, the other in washed black denim.",
    sk: "Nohavice delené v strede — jedna nohavica z maskáčového tvílu, druhá z vyšúchanej čiernej džínsoviny.",
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

export default split_camo_pants_grey;
