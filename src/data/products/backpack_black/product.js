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
  price: 110.0,
  currency: "EUR",
  description: {
    en: "A padded, quilted backpack with adjustable straps and a drawstring top closure. Roomy enough for daily carry.",
    sk: "Vypchatý, prešívaný batoh s nastaviteľnými popruhmi a sťahovacím horným uzáverom. Dostatočne priestranný na každodenné nosenie.",
  },
  features: {
    en: [
      "Padded, quilted design",
      "Adjustable straps",
      "Made in Slovakia",
    ],
    sk: [
      "Prešívaný, vypchatý dizajn",
      "Nastaviteľné popruhy",
      "Šité na Slovensku",
    ],
  },
  category: "bags",
  sizes: ["One Size"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "X",
  big: "A",
  delivery: {
    en: "Production/Dispatch: within 4-5 business days\nDelivery: within 1-2 business days after your item is completed\n(each piece is handmade to order, so delivery times may vary slightly)",
    sk: "Výroba/Expedícia: do 4-5 pracovných dní\nDodanie: do 1-2 pracovných dní od dokončenia produktu\n(každý kus šijeme ručne na objednávku, termín dodania sa preto môže mierne líšiť)",
  },
  images: {
    front,
    back,
    detail,
  },
};

export default backpack_black;
