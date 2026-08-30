import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const camo_hoodie = {
  id: "camo_hoodie",
  code: "HD-02",
  name: {
    en: "Camo Hoodie",
    sk: "Maskáčová mikina",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "A heavyweight hoodie in a classic woodland camo print, cut with the same relaxed fit as the rest of the line.",
    sk: "Ťažká mikina s klasickou maskáčovou potlačou, strihnutá rovnako voľne ako zvyšok kolekcie.",
  },
  features: {
    en: [
      "Classic woodland camo",
      "Relaxed fit",
      "Made in Slovakia",
    ],
    sk: [
      "Klasický lesný maskáč",
      "Uvoľnený strih",
      "Šité na Slovensku",
    ],
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Camo"],
  showSwatches: false,
  sizeChart: "A",
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

export default camo_hoodie;
