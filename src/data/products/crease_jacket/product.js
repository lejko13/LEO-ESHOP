import front from "./front.webp";
import back from "./back.webp";

const crease_jacket = {
  id: "crease_jacket",
  code: "JK-05",
  name: {
    en: "Crease Pullover Jacket",
    sk: "Pulóverová bunda Crease",
  },
  price: 159.0,
  currency: "EUR",
  description: {
    en: "A cropped pullover jacket with a crinkled, sculptural nylon finish and an oversized hood.",
    sk: "Skrátená pulóverová bunda s pokrčeným sochárskym nylonovým povrchom a oversized kapucňou.",
  },
  category: "jackets",
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
    detail: null,
  },
};

export default crease_jacket;
