import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const flared_zip = {
  id: "flared_zip",
  code: "HD-04",
  name: {
    en: "Zip Sleeve Hoodie",
    sk: "Mikina so zipsami na rukávoch",
  },
  price: 89.0,
  currency: "EUR",
  description: {
    en: "A heavyweight hoodie finished with full-length zips down both sleeves.",
    sk: "Ťažká mikina dokončená zipsami v celej dĺžke oboch rukávov.",
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

export default flared_zip;
