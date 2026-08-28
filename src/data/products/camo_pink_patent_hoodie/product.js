import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const camo_pink_patent_hoodie = {
  id: "camo_pink_patent_hoodie",
  code: "HD-03",
  name: {
    en: "Cropped Camo Hoodie — Pink Trim",
    sk: "Skrátená maskáčová mikina — ružový lem",
  },
  price: 95.0,
  currency: "EUR",
  description: {
    en: "A cropped camo hoodie finished with contrast pink ribbing at the cuffs and hem.",
    sk: "Skrátená maskáčová mikina dokončená kontrastným ružovým rebrovaním na manžetách a spodnom leme.",
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

export default camo_pink_patent_hoodie;
