import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const crease_vest = {
  id: "crease_vest",
  code: "JK-03",
  name: {
    en: "Crease Puffer Vest",
    sk: "Prešívaná vesta Crease",
  },
  price: 170.0,
  currency: "EUR",
  description: {
    en: "A sleeveless puffer vest in the same crinkled nylon finish as the Crease jacket line, with ribbed collar and hem.",
    sk: "Vesta bez rukávov v rovnakom pokrčenom nylonovom prevedení ako bundy z kolekcie Crease, s rebrovaným golierom a lemom.",
  },
  features: {
    en: [
      "Crinkled, sculptural nylon",
      "Ribbed collar and hem",
      "High-quality natural filling",
      "Made in Slovakia",
    ],
    sk: [
      "Pokrčený, sochársky nylon",
      "Rebrovaný golier a lem",
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
  },
};

export default crease_vest;
