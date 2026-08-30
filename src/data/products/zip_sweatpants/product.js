import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const zip_sweatpants = {
  id: "zip_sweatpants",
  code: "PT-16",
  name: {
    en: "Zip Sweatpants",
    sk: "Zipsové tepláky",
  },
  price: 90.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants finished with full-length zips down both legs.",
    sk: "Tepláky so širokou nohavicou dokončené zipsami v celej dĺžke oboch nohavíc.",
  },
  features: {
    en: [
      "Full-length zips down both legs",
      "Wide-leg fit",
      "Made in Slovakia",
    ],
    sk: [
      "Zipsy po celej dĺžke nohavíc",
      "Široký strih",
      "Šité na Slovensku",
    ],
  },
  category: "tracksuit",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "B",
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
    extra5,
  },
};

export default zip_sweatpants;
