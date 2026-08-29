import front from "./front.webp";
import gallery2 from "./gallery2.webp";
import gallery3 from "./gallery3.webp";
import gallery4 from "./gallery4.webp";
import gallery5 from "./gallery5.webp";
import gallery6 from "./gallery6.webp";

// Oversized, heavy — courier delivery only. See `big` below and
// getAvailableShippingMethods() in data/shippingMethods.js for how this
// restricts Checkout to GLS.
const beanbag_braves = {
  id: "beanbag_braves",
  code: "BB-01",
  name: {
    en: "Beanbag Cap — Atlanta Braves",
    sk: "Beanbag čiapka — Atlanta Braves",
  },
  price: 360.0,
  currency: "EUR",
  description: {
    en: "An oversized, cap-shaped beanbag inspired by an Atlanta Braves cap — a statement piece for the room, not the wardrobe.",
    sk: "Nadrozmerný beanbag v tvare šiltovky inšpirovaný čiapkou Atlanta Braves — výrazný kúsok do izby, nie do skrine.",
  },
  category: "accessories",
  sizes: ["One Size"],
  colors: ["Blue"],
  showSwatches: false,
  sizeChart: "X",
  big: "A",
  delivery: {
    en: "Ships in 1-2 business days, delivery in 3-5 business days",
    sk: "Expedicia do 1-2 pracovnych dni, dorucenie do 3-5 pracovnych dni",
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

export default beanbag_braves;
