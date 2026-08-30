import front from "./front.webp";
import back from "./back.webp";
import detail from "./detail.webp";
import extra4 from "./extra4.webp";
import extra5 from "./extra5.webp";

const flared_zip = {
  id: "flared_zip",
  code: "HD-04",
  name: {
    en: "Zip Sleeve Hoodie",
    sk: "Mikina so zipsami na rukávoch",
  },
  price: 90.0,
  currency: "EUR",
  description: {
    en: "A heavyweight hoodie finished with full-length zips down both sleeves.",
    sk: "Ťažká mikina dokončená zipsami v celej dĺžke oboch rukávov.",
  },
  features: {
    en: [
      "Heavyweight cotton",
      "Full-length zips down sleeves",
      "Made in Slovakia",
    ],
    sk: [
      "Ťažká bavlna",
      "Zipsy po celej dĺžke rukávov",
      "Šité na Slovensku",
    ],
  },
  category: "hoodies",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black"],
  showSwatches: false,
  sizeChart: "A",
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

export default flared_zip;
