import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const crease_pants = {
  id: "crease_pants",
  code: "PT-07",
  name: {
    en: "Crease Pants",
    sk: "Nohavice Crease",
  },
  price: 100.0,
  currency: "EUR",
  description: {
    en: "Balloon-cut pants in the same crinkled nylon finish as the Crease jacket line, with a drawstring waist.",
    sk: "Nohavice s balónovým strihom v rovnakom pokrčenom nylonovom prevedení ako bundy z kolekcie Crease, so sťahovacím pásom.",
  },
  features: {
    en: [
      "Crinkled, sculptural nylon",
      "Balloon cut, drawstring waist",
      "Made in Slovakia",
    ],
    sk: [
      "Pokrčený, sochársky nylon",
      "Balónový strih, sťahovací pás",
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

export default crease_pants;
