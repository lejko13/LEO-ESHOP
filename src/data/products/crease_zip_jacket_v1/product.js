import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";

const crease_zip_jacket_v1 = {
  id: "crease_zip_jacket_v1",
  code: "JK-04",
  name: {
    en: "Crease Zip Jacket V1",
    sk: "Zipsová bunda Crease V1",
  },
  price: 230.0,
  currency: "EUR",
  description: {
   en: "A cropped, hooded jacket with a crinkled, sculptural nylon finish and full front zip — the first version in the Crease line. WITHOUT FILLING.",

sk: "Skrátená bunda s kapucňou, pokrčeným sochárskym nylonovým povrchom a predným zipsom — prvá verzia z kolekcie Crease. BEZ VÝPLNE.",
  },
  features: {
    en: [
      "Crinkled, sculptural nylon",
      "Hooded, full front zip",
      "Made in Slovakia",
    ],
    sk: [
      "Pokrčený, sochársky nylon",
      "Kapucňa a plný predný zips",
      "Šité na Slovensku",
    ],
  },
  category: "jackets",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "A",
  big: "B",
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

export default crease_zip_jacket_v1;
