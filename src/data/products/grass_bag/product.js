import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const grass_bag = {
  id: "grass_bag",
  code: "BG-04",
  name: {
    en: "Fringed Tote Bag",
    sk: "Strapcová taška",
  },
  price: 89.0,
  currency: "EUR",
  description: {
    en: "A tote bag woven from frayed, fringed thread for a raw, textured finish.",
    sk: "Taška utkaná zo strapcovitých, rozstrapkaných vlákien pre surový, textúrovaný vzhľad.",
  },
  category: "accessories",
  sizes: ["One Size"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "X",
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

export default grass_bag;
