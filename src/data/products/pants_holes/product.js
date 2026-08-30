import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const pants_holes = {
  id: "pants_holes",
  code: "PT-10",
  name: {
    en: "Laced Cargo Pants",
    sk: "Šnurovacie cargo nohavice",
  },
  price: 95.0,
  currency: "EUR",
  description: {
    en: "Wide-leg pants finished with eyelet lacing down both legs, for an undone, deconstructed look.",
    sk: "Nohavice so širokou nohavicou dokončené šnurovaním s očkami po oboch stranách, pre rozvoľnený, deštruovaný vzhľad.",
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
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

export default pants_holes;
