import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const crease_vest = {
  id: "crease_vest",
  code: "JK-03",
  name: {
    en: "Crease Puffer Vest",
    sk: "Prešívaná vesta Crease",
  },
  price: 129.0,
  currency: "EUR",
  description: {
    en: "A sleeveless puffer vest in the same crinkled nylon finish as the Crease jacket line, with ribbed collar and hem.",
    sk: "Vesta bez rukávov v rovnakom pokrčenom nylonovom prevedení ako bundy z kolekcie Crease, s rebrovaným golierom a lemom.",
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
    detail,
    extra4,
  },
};

export default crease_vest;
