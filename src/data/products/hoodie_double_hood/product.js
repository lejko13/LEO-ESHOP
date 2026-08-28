import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const hoodie_double_hood = {
  id: "hoodie_double_hood",
  code: "HD-10",
  name: {
    en: "Double Hood Zip Hoodie",
    sk: "Zipsová mikina s dvojitou kapucňou",
  },
  price: 95.0,
  currency: "EUR",
  description: {
    en: "A full-zip hoodie with a layered double hood construction for extra depth and drama.",
    sk: "Zipsová mikina s vrstvenou konštrukciou dvojitej kapucne pre výraznejší efekt.",
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

export default hoodie_double_hood;
