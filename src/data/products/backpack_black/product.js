import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";

const backpack_black = {
  id: "backpack_black",
  code: "BG-01",
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
  colors: ["Black"],
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
  },
};

export default backpack_black;
