import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const beige_tee = {
  id: "beige_tee",
  code: "TS-02",
  name: {
    en: "Oversized Tee",
    sk: "Oversized tričko",
  },
  price: 45.0,
  currency: "EUR",
  description: {
    en: "A heavyweight, boxy-fit tee in beige with dropped shoulders for an oversized silhouette.",
    sk: "Ťažké tričko v béžovej farbe s boxy strihom a spustenými ramenami pre oversized siluetu.",
  },
  category: "t-shirts",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Beige"],
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

export default beige_tee;
