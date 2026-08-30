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
  price: 270.0,
  currency: "EUR",
  description: {
    en: "A cropped puffer jacket with a crinkled, sculptural nylon finish, full front zip, and welt pockets.",
    sk: "Skrátená prešívaná bunda s pokrčeným sochárskym nylonovým povrchom, predným zipsom v celej dĺžke a všitými vreckami.",
  },
  features: {
    en: [
      "Crinkled, sculptural nylon",
      "Welt pockets",
      "High-quality natural filling",
      "Made in Slovakia",
    ],
    sk: [
      "Pokrčený, sochársky nylon",
      "Vsadené vrecká",
      "Kvalitná prírodná výplň",
      "Šité na Slovensku",
    ],
  },
  category: "jackets",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "A",
  big: "B",
  delivery: {
    en: "Production/Dispatch: within 4-5 business days\nDelivery: within 1-2 business days after your item is completed\n(each piece is handmade to order, so delivery times may vary slightly)",
    sk: "Výroba/Expedícia: do 4-5 pracovných dní\nDodanie: do 1-2 pracovných dní od dokončenia produktu\n(každý kus šijeme ručne na objednávku, termín dodania sa preto môže mierne líšiť)",
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
