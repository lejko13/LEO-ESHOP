import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";
import extra6 from "./extra6.webp";

const crease_puffer = {
  id: "crease_puffer",
  code: "JK-02",
  name: {
    en: "Crease Puffer Jacket",
    sk: "Prešívaná bunda Crease",
  },
  price: 179.0,
  currency: "EUR",
  description: {
    en: "A cropped puffer jacket with a crinkled, sculptural nylon finish, full front zip, and welt pockets.",
    sk: "Skrátená prešívaná bunda s pokrčeným sochárskym nylonovým povrchom, predným zipsom v celej dĺžke a všitými vreckami.",
  },
  category: "jackets",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "A",
  big: "A",
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
    extra6,
  },
};

export default crease_puffer;
