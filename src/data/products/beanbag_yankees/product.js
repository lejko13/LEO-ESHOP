import front from "./front.webp";
import gallery2 from "./gallery2.webp";
import gallery3 from "./gallery3.webp";
import gallery4 from "./gallery4.webp";
import gallery5 from "./gallery5.webp";
import gallery6 from "./gallery6.webp";

// Oversized, heavy — courier delivery only. See `big` below and
// getAvailableShippingMethods() in data/shippingMethods.js for how this
// restricts Checkout to GLS.
const beanbag_yankees = {
  id: "beanbag_yankees",
  code: "BB-02",
  name: {
    en: "Beanbag Cap — NY Yankees",
    sk: "Tulivak čiapka — NY Yankees",
  },
  price: 380.0,
  currency: "EUR",
  description: {
    en: "An oversized, cap-shaped beanbag inspired by an NY Yankees cap.",
    sk: "Nadrozmerný tulivak v tvare šiltovky inšpirovaný čiapkou NY Yankees.",
  },
  features: {
    en: [
      "Oversized cap-shaped design",
      "Statement piece for the room",
      "Made in Slovakia",
    ],
    sk: [
      "Nadrozmerný dizajn v tvare šiltovky",
      "Doplnok do interiéru, nie na nosenie",
      "Šité na Slovensku",
    ],
  },
  category: "beanbag",
  sizes: ["One Size"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "X",
  big: "C",
  delivery: {
    en: "Production/Dispatch: within 4-5 business days\nDelivery: within 1-2 business days after your item is completed\n(each piece is handmade to order, so delivery times may vary slightly)",
    sk: "Výroba/Expedícia: do 4-5 pracovných dní\nDodanie: do 1-2 pracovných dní od dokončenia produktu\n(každý kus šijeme ručne na objednávku, termín dodania sa preto môže mierne líšiť)",
  },
  images: {
    front,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  },
};

export default beanbag_yankees;
