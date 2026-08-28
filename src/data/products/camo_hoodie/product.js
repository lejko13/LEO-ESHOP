import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const camo_hoodie = {
  id: "camo_hoodie",
  code: "HD-02",
  name: {
    en: "Camo Hoodie",
    sk: "Maskáčová mikina",
  },
  price: 82.0,
  currency: "EUR",
  description: {
    en: "A heavyweight hoodie in a classic woodland camo print, cut with the same relaxed fit as the rest of the line.",
    sk: "Ťažká mikina s klasickou maskáčovou potlačou, strihnutá rovnako voľne ako zvyšok kolekcie.",
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Camo"],
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

export default camo_hoodie;
