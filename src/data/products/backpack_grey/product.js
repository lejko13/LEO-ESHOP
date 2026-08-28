import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const backpack_grey = {
  id: "backpack_grey",
  code: "BG-02",
  name: {
    en: "Quilted Backpack",
    sk: "Prešívaný batoh",
  },
  price: 95.0,
  currency: "EUR",
  description: {
    en: "A padded, quilted backpack with adjustable straps and a drawstring top closure. Roomy enough for daily carry.",
    sk: "Vypchatý, prešívaný batoh s nastaviteľnými popruhmi a sťahovacím horným uzáverom. Dostatočne priestranný na každodenné nosenie.",
  },
  category: "accessories",
  sizes: ["One Size"],
  colors: ["Grey"],
  showSwatches: false,
  sizeChart: "X",
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
  },
};

export default backpack_grey;
