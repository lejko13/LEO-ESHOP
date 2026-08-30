import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const double_waist_sweatpants = {
  id: "double_waist_sweatpants",
  code: "PT-17",
  name: {
    en: "Double Waistband Sweatpants",
    sk: "Tepláky s dvojitým pásom",
  },
  price: 85.0,
  currency: "EUR",
  description: {
    en: "Wide-leg sweatpants with a layered double waistband — a black outer band over a camo inner layer.",
    sk: "Tepláky so širokou nohavicou s vrstveným dvojitým pásom — čierny vrchný pás nad maskáčovou vnútornou vrstvou.",
  },
  features: {
    en: [
      "Layered double waistband",
      "Wide-leg cut",
      "Made in Slovakia",
    ],
    sk: [
      "Dvojitý pás — čierny a maskáčový",
      "Široký strih nohavíc",
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
  },
};

export default double_waist_sweatpants;
