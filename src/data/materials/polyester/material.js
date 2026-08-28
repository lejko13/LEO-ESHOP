import front from "./front.webp";

const polyester = {
  id: "polyester",
  code: "MAT-03",
  name: {
    en: "Polyester",
    sk: "Polyester",
  },
  description: {
    en: "Lightweight, water-resistant woven polyester — used for shells and linings.",
    sk: "Ľahký, vodoodpudivý tkaný polyester — používa sa na vrchné diely a podšívky.",
  },
  materialType: "polyester",
  pricePerMeter: 9.9,
  currency: "EUR",
  widthCm: 150,
  colors: ["Black", "Navy", "Olive"],
  showSwatches: true,
  delivery: {
    en: "Ships in 1–2 business days",
    sk: "Expedícia do 1–2 pracovných dní",
  },
  images: {
    front,
  },
};

export default polyester;
