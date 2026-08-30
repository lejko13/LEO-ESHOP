import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const grey_waterprof_pants = {
  id: "grey_waterprof_pants",
  code: "PT-09",
  name: {
    en: "Waterproof Parachute Pants",
    sk: "Nepremokavé parašutistické nohavice",
  },
  price: 65.0,
  currency: "EUR",
  description: {
    en: "Wide, parachute-cut pants in a lightweight waterproof shell. Drawstring waist and adjustable cuffs at the ankle.",
    sk: "Široké nohavice v strihu parašutistov z ľahkého nepremokavého materiálu. Sťahovací pás a nastaviteľné lemy na členkoch.",
  },
  features: {
    en: [
      "Waterproof shell",
      "Adjustable ankle cuffs",
      "Made in Slovakia",
    ],
    sk: [
      "Nepremokavý povrch",
      "Nastaviteľné lemy na členkoch",
      "Šité na Slovensku",
    ],
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Grey"],
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

export default grey_waterprof_pants;
