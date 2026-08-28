// Central store of every size chart used on the site. A product doesn't
// carry its own measurements — it just references a chart by key via
// `sizeChart: "A"` in its product.js. Add a new chart here (any number of
// columns, any column names, any rows) and point products at it.
//
// Convention: `sizeChart: "X"` means "no chart" — use this for one-size
// products or anything where a measurement table doesn't make sense. The
// "View Size Chart" button on the product page only renders when the chart
// resolves to something real, so "X" (or an unknown/missing key) hides it
// automatically.
//
// Columns can differ per chart (different labels, different count) — the
// only fixed convention is that each row has a `size` field matching one of
// the product's `sizes`.

export const sizeCharts = {
  A: {
    unit: "cm",
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "length", label: { en: "Length", sk: "Dĺžka" } },
      { id: "width", label: { en: "Width", sk: "Šírka" } },
      { id: "sleeve", label: { en: "Sleeve", sk: "Rukáv" } },
    ],
    rows: [
      { size: "S", length: 65, width: 52, sleeve: 62 },
      { size: "M", length: 67, width: 54, sleeve: 63 },
      { size: "L", length: 69, width: 56, sleeve: 64 },
      { size: "XL", length: 72, width: 58, sleeve: 65 },
      { size: "XXL", length: 75, width: 60, sleeve: 67 },
    ],
  },
  B: {
    unit: "cm",
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "Waist", sk: "Pás" } },
      { id: "hip", label: { en: "Hip", sk: "Boky" } },
      { id: "inseam", label: { en: "Inseam", sk: "Rozkrok" } },
    ],
    rows: [
      { size: "XS", waist: 68, hip: 90, inseam: 78 },
      { size: "S", waist: 72, hip: 94, inseam: 79 },
      { size: "M", waist: 76, hip: 98, inseam: 80 },
      { size: "L", waist: 82, hip: 104, inseam: 81 },
      { size: "XL", waist: 88, hip: 110, inseam: 82 },
    ],
  },
};

// Returns null for "X", for a missing/null key, or for any key that isn't
// a real chart — callers only need to check truthiness.
export const getSizeChart = (key) =>
  key && key !== "X" ? sizeCharts[key] ?? null : null;
