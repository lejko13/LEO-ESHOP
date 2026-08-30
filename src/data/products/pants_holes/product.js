import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const pants_holes = {
  id: "pants_holes",
  code: "PT-10",
  name: {
    en: "Laced Cargo Pants",
    sk: "Šnurovacie cargo nohavice",
  },
  price: 90.0,
  currency: "EUR",
  description: {
    en: "Wide-leg pants finished with eyelet lacing down both legs, for an undone, deconstructed look.",
    sk: "Nohavice so širokou nohavicou dokončené šnurovaním s očkami po oboch stranách, pre rozvoľnený, deštruovaný vzhľad.",
  },
  features: {
    en: [
      "Eyelet lacing down both legs",
      "Undone, deconstructed look",
      "Made in Slovakia",
    ],
    sk: [
      "Šnurovanie po celej dĺžke nohavíc",
      "Deštruovaný vzhľad",
      "Šité na Slovensku",
    ],
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "B",
  big: "A",
  delivery: {
    en: "Production/Dispatch: within 4-5 business days\nDelivery: within 1-2 business days after your item is completed\n(each piece is handmade to order, so delivery times may vary slightly)",
    sk: "Výroba/Expedícia: do 4-5 pracovných dní\nDodanie: do 1-2 pracovných dní od dokončenia produktu\n(každý kus šijeme ručne na objednávku, termín dodania sa preto môže mierne líšiť)",
  },
  images: {
    front,
    back,
    detail,
    extra4,
  },
};

export default pants_holes;
