import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const crease_zip_jacket_v1 = {
  id: "crease_zip_jacket_v1",
  code: "JK-04",
  name: {
    en: "Crease Zip Jacket V1",
    sk: "Zipsová bunda Crease V1",
  },
  price: 165.0,
  currency: "EUR",
  description: {
    en: "A cropped, hooded jacket with a crinkled, sculptural nylon finish and full front zip — the first version in the Crease line.",
    sk: "Skrátená bunda s kapucňou, pokrčeným sochárskym nylonovým povrchom a predným zipsom — prvá verzia z kolekcie Crease.",
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

export default crease_zip_jacket_v1;
