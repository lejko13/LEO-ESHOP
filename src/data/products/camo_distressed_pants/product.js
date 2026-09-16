import front from "./front.png";
import back from "./back.png";
import detail from "./detail.png";
import extra4 from "./extra4.png";

const camo_distressed_pants = {
  id: "camo_distressed_pants",
  code: "PT-30",
  name: {
    en: "Distressed Cargo Pants",
    sk: "Roztrhané cargo nohavice",
  },
  price: 90.0,
  currency: "EUR",
  description: {
    en: "Wide-leg cargo pants in a classic woodland camo print, finished with a distressed, deconstructed wash and a raw frayed hem.",
    sk: "Cargo nohavice so širokou nohavicou a klasickou maskáčovou potlačou, dokončené speraným, deštruovaným vzhľadom a surovým strapkatým lemom.",
  },
  features: {
    en: [
      "Classic woodland camo",
      "Distressed, deconstructed finish",
      "Made in Slovakia",
    ],
    sk: [
      "Klasický lesný maskáč",
      "Deštruovaný, otrhaný vzhľad",
      "Šité na Slovensku",
    ],
  },
  category: "pants",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Camo"],
  showSwatches: false,
  sizeChart: "S",
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

export default camo_distressed_pants;
