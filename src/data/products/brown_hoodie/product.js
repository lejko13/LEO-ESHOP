import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const brown_hoodie = {
  id: "brown_hoodie",
  code: "HD-12",
  name: {
    en: "Essential Hoodie",
    sk: "Základná mikina",
  },
  price: 79.0,
  currency: "EUR",
  description: {
    en: "A relaxed, oversized hoodie made from heavyweight brushed cotton in a warm brown.",
    sk: "Voľná, oversized mikina z ťažkej česanej bavlny v teplej hnedej farbe.",
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Brown"],
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

export default brown_hoodie;
