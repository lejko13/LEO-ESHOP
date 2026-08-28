import front from "./front.webp";

const ecoleather = {
  id: "ecoleather",
  code: "MAT-02",
  name: {
    en: "Eco Leather",
    sk: "Ekokoža",
  },
  description: {
    en: "Matte vegan leather with a soft-touch finish, ideal for bags and trims.",
    sk: "Matná vegánska ekokoža s jemným povrchom, vhodná na tašky a doplnky.",
  },
  materialType: "ecoleather",
  pricePerMeter: 18.5,
  currency: "EUR",
  widthCm: 140,
  colors: ["Black", "Sand", "Stone"],
  showSwatches: true,
  delivery: {
    en: "Ships in 1–2 business days",
    sk: "Expedícia do 1–2 pracovných dní",
  },
  images: {
    front,
  },
};

export default ecoleather;
