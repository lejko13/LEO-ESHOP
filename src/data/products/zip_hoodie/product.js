import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const zip_hoodie = {
  id: "zip_hoodie",
  code: "HD-09",
  name: {
    en: "Zip Hoodie",
    sk: "Zipsová mikina",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "A cropped, full-zip hoodie in heavyweight cotton fleece with a clean, minimal silhouette.",
    sk: "Skrátená mikina na zips z ťažkej bavlnenej teplákoviny s čistou, minimalistickou siluetou.",
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
    extra5,
  },
};

export default zip_hoodie;
