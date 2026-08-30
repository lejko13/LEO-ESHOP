import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const camo_distressed_shorts = {
  id: "camo_distressed_shorts",
  code: "PT-03",
  name: {
    en: "Distressed Cargo Shorts",
    sk: "Roztrhané cargo kraťasy",
  },
  price: 70.0,
  currency: "EUR",
  description: {
    en: "Cargo shorts in a classic woodland camo print, finished with a distressed, deconstructed wash.",
    sk: "Cargo kraťasy s klasickou maskáčovou potlačou, dokončené speraným, deštruovaným vzhľadom.",
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

export default camo_distressed_shorts;
