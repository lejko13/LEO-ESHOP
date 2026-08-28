import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const crease_pants = {
  id: "crease_pants",
  code: "PT-07",
  name: {
    en: "Crease Pants",
    sk: "Nohavice Crease",
  },
  price: 99.0,
  currency: "EUR",
  description: {
    en: "Balloon-cut pants in the same crinkled nylon finish as the Crease jacket line, with a drawstring waist.",
    sk: "Nohavice s balónovým strihom v rovnakom pokrčenom nylonovom prevedení ako bundy z kolekcie Crease, so sťahovacím pásom.",
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

export default crease_pants;
