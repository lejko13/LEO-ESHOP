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
  price: 360.0,
  currency: "EUR",
  description: {
    en: "An oversized, cap-shaped beanbag inspired by an NY Yankees cap — a statement piece for the room, not the wardrobe.",
    sk: "Nadrozmerný tulivak v tvare šiltovky inšpirovaný čiapkou NY Yankees — výrazný kúsok do izby, nie do skrine.",
  },
  category: "beanbag",
  sizes: ["One Size"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "X",
  big: "C",
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

export default beanbag_yankees;
