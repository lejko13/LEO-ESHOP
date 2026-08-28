import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";
import extra6 from "./extra6.webp";

const crease_jacket_v2 = {
  id: "crease_jacket_v2",
  code: "JK-01",
  name: {
    en: "Crease Jacket V2",
    sk: "Bunda Crease V2",
  },
  price: 165.0,
  currency: "EUR",
  description: {
    en: "A cropped, hooded jacket with a crinkled, sculptural nylon finish and full front zip.",
    sk: "Skrátená bunda s kapucňou, pokrčeným sochárskym nylonovým povrchom a predným zipsom v celej dĺžke.",
  },
  category: "jackets",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "A",
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
    extra5,
    extra6,
  },
};

export default crease_jacket_v2;
