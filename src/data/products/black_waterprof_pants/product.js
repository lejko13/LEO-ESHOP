import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const black_waterprof_pants = {
  id: "black_waterprof_pants",
  code: "PT-01",
  name: {
    en: "Waterproof Parachute Pants",
    sk: "Nepremokavé parašutistické nohavice",
  },
  price: 99.0,
  currency: "EUR",
  description: {
    en: "Wide, parachute-cut pants in a lightweight waterproof shell. Drawstring waist and adjustable cuffs at the ankle.",
    sk: "Široké nohavice v strihu parašutistov z ľahkého nepremokavého materiálu. Sťahovací pás a nastaviteľné lemy na členkoch.",
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "B",
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

export default black_waterprof_pants;
