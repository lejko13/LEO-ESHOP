// Central material aggregator — same pattern as data/products/index.js.
// Materials are a separate catalog from clothing products: sold by the
// meter (pricePerMeter) instead of a flat price, no size/color.

import sweatfleece from "./sweatfleece/material.js";
import ecoleather from "./ecoleather/material.js";
import polyester from "./polyester/material.js";

export const materials = [sweatfleece, ecoleather, polyester];

export const getMaterialById = (id) => materials.find((m) => m.id === id);

export const getMaterialsByType = (materialType) =>
  materials.filter((m) => m.materialType === materialType);

export const materialTypes = [
  ...new Set(materials.map((m) => m.materialType)),
];

export const getAllMaterialColors = () => [
  ...new Set(materials.flatMap((m) => m.colors ?? [])),
];
