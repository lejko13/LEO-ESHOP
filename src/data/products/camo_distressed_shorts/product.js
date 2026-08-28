import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const camo_distressed_shorts = {
  id: "camo_distressed_shorts",
  code: "PT-03",
  name: {
    en: "Distressed Cargo Shorts",
    sk: "Sperané cargo kraťasy",
  },
  price: 69.0,
  currency: "EUR",
  description: {
    en: "Cargo shorts in a classic woodland camo print, finished with a distressed, deconstructed wash.",
    sk: "Cargo kraťasy s klasickou maskáčovou potlačou, dokončené speraným, deštruovaným vzhľadom.",
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

export default camo_distressed_shorts;
