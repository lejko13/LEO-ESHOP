import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const mozaik_bag = {
  id: "mozaik_bag",
  code: "BG-03",
  name: {
    en: "Mosaic Tote Bag",
    sk: "Mozaiková taška",
  },
  price: 89.0,
  currency: "EUR",
  description: {
    en: "A tote bag in patchworked faux leather, pieced together with exposed metal grommets and rings.",
    sk: "Taška z patchworkovej ekokože, poskladaná z kúskov spojených viditeľnými kovovými očkami a krúžkami.",
  },
  category: "bags",
  sizes: ["One Size"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "X",
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

export default mozaik_bag;
