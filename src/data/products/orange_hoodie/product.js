import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const orange_hoodie = {
  id: "orange_hoodie",
  code: "HD-15",
  name: {
    en: "Essential Hoodie",
    sk: "Základná mikina",
  },
  price: 79.0,
  currency: "EUR",
  description: {
    en: "A relaxed, oversized hoodie made from heavyweight brushed cotton in a bold orange.",
    sk: "Voľná, oversized mikina z ťažkej česanej bavlny v sýtej oranžovej farbe.",
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Orange"],
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

export default orange_hoodie;
