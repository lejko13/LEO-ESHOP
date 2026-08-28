import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const hoodie_black_sprayed = {
  id: "hoodie_black_sprayed",
  code: "HD-06",
  name: {
    en: "Sprayed Hoodie",
    sk: "Postriekaná mikina",
  },
  price: 95.0,
  currency: "EUR",
  description: {
    en: "A heavyweight hoodie finished with a hand-sprayed, paint-splatter print — no two are exactly alike.",
    sk: "Ťažká mikina dokončená ručne striekanou potlačou v štýle rozstrekanej farby — žiadne dve nie sú úplne rovnaké.",
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "A",
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

export default hoodie_black_sprayed;
