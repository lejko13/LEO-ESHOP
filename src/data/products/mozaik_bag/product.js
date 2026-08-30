import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const mozaik_bag = {
  id: "mozaik_bag",
  code: "BG-03",
  name: {
    en: "Mosaic Tote Bag",
    sk: "Mozaiková taška",
  },
  price: 200.0,
  currency: "EUR",
  description: {
    en: "A tote bag in patchworked faux leather, pieced together with exposed metal grommets and rings.",
    sk: "Taška z patchworkovej ekokože, poskladaná z kúskov spojených viditeľnými kovovými očkami a krúžkami.",
  },
  features: {
    en: [
      "Patchworked faux leather",
      "Exposed metal grommets and rings",
      "Made in Slovakia",
    ],
    sk: [
      "Patchworková imitácia kože",
      "Kovové cvočky a krúžky",
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
    extra4,
  },
};

export default mozaik_bag;
