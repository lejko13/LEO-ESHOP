import front from "./front.webp";

// Sold by the meter, not by piece — see MaterialProduct.jsx for the
// quantity picker and how `pricePerMeter` turns into a line total.
const sweatfleece = {
  id: "sweatfleece",
  code: "MAT-01",
  name: {
    en: "Sweatshirt Fleece",
    sk: "Teplákovina",
  },
  description: {
    en: "Brushed cotton-blend fleece, 320 gsm — the standard for hoodies and sweatpants.",
    sk: "Česaná bavlnená teplákovina, 320 g/m² — štandard na mikiny a tepláky.",
  },
  materialType: "sweatfleece",
  pricePerMeter: 12.9,
  currency: "EUR",
  widthCm: 150,
  colors: ["Grey", "Black", "Navy"],
  showSwatches: true,
  delivery: {
    en: "Ships in 1–2 business days",
    sk: "Expedícia do 1–2 pracovných dní",
  },
  images: {
    front,
  },
};

export default sweatfleece;
