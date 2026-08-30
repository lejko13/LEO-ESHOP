import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const grass_bag = {
  id: "grass_bag",
  code: "BG-04",
  name: {
    en: "Fringed Tote Bag",
    sk: "Strapcová taška",
  },
  price: 80.0,
  currency: "EUR",
  description: {
 en: "A tote bag made from frayed, fringed thread for a raw, textured finish.",

sk: "Taška zo strapcovitých, rozstrapkaných vlákien pre surový, textúrovaný vzhľad."

  },
  features: {
    en: [
      "Fringed, textured weave",
      "Raw, unfinished look",
      "Made in Slovakia",
    ],
    sk: [
      "Strapcová, textúrovaná pletenina",
      "Surový, nedokončený vzhľad",
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

export default grass_bag;
