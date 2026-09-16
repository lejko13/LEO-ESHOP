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
//
// Optional per-chart extras:
// - `note` ({en, sk}) — a short explanatory line rendered under the table
//   (e.g. "waist is stretchable" for an elastic-waist garment).
// - `image` — a reference/measurement-diagram image, rendered under the
//   table (above the unit/note line). Import the image file below and
//   assign it here once a photo exists; leave unset (or null) until then —
//   SizeChartPanel only renders it when present.

import sweatpantsDiagram from "../assets/size-charts/sweatpants-diagram.png";
import hoodieDiagram from "../assets/size-charts/hoodie-diagram.png";
import flaredZipDiagram from "../assets/size-charts/flared-zip-diagram.png";
import parachutePantsDiagram from "../assets/size-charts/parachute-pants-diagram.png";
import teeDiagram from "../assets/size-charts/tee-diagram.png";
import vestDiagram from "../assets/size-charts/vest-diagram.png";
import pufferDiagram from "../assets/size-charts/puffer-diagram.png";
import cargoStrapsDiagram from "../assets/size-charts/cargo-straps-diagram.png";
import cargoLaceupDiagram from "../assets/size-charts/cargo-laceup-diagram.png";
import cargoDrawstringDiagram from "../assets/size-charts/cargo-drawstring-diagram.png";
import cargoClassicDiagram from "../assets/size-charts/cargo-classic-diagram.png";
import cargoSplitDiagram from "../assets/size-charts/cargo-split-diagram.png";
import creaseZipDiagram from "../assets/size-charts/crease-zip-diagram.webp";
import creasePulloverDiagram from "../assets/size-charts/crease-pullover-diagram.webp";
import camoDistressedShortsDiagram from "../assets/size-charts/camo-distressed-shorts-diagram.webp";
import camoDistressedPantsDiagram from "../assets/size-charts/camo-distressed-pants-diagram.webp";
import zipHoodieDiagram from "../assets/size-charts/zip-hoodie-diagram.webp";

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
  // Tepláky (tracksuit sweatpants) — from the tech pack. Column headers
  // are plain letters (A/B/C) matching the tech pack's own lettering.
  C: {
    unit: "cm",
    note: {
      en: "Waist and leg hem can be tightened or loosened with a drawstring.",
      sk: "Pás aj spodný lem si viete sťahovacou šnúrkou stiahnuť alebo natiahnuť.",
    },
    image: sweatpantsDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "legOpening", label: { en: "B", sk: "B" } },
      { id: "length", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 36, legOpening: 23, length: 108 },
      { size: "S", waist: 38, legOpening: 24, length: 109 },
      { size: "M", waist: 40, legOpening: 25, length: 110 },
      { size: "L", waist: 42, legOpening: 26, length: 111 },
      { size: "XL", waist: 44, legOpening: 27, length: 112 },
      { size: "XXL", waist: 46, legOpening: 28, length: 113 },
    ],
  },
  // Mikiny (hoodies) — new tech pack. Plain "A/B/C" column labels to match
  // this tech pack's own header style (unlike chart C's "A — Waist" style).
  D: {
    unit: "cm",
    image: hoodieDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "sleeve", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", shoulder: 57, bodyLength: 62, sleeve: 59 },
      { size: "S", shoulder: 59, bodyLength: 64, sleeve: 60 },
      { size: "M", shoulder: 61, bodyLength: 66, sleeve: 61 },
      { size: "L", shoulder: 63, bodyLength: 68, sleeve: 62 },
      { size: "XL", shoulder: 65, bodyLength: 70, sleeve: 63 },
    ],
  },
  // HD-04 Zip Sleeve Hoodie — its own measurements, separate from the
  // regular hoodie chart (D).
  E: {
    unit: "cm",
    image: flaredZipDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "sleeve", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", shoulder: 57, bodyLength: 60, sleeve: 55 },
      { size: "S", shoulder: 59, bodyLength: 62, sleeve: 56 },
      { size: "M", shoulder: 61, bodyLength: 64, sleeve: 57 },
      { size: "L", shoulder: 63, bodyLength: 66, sleeve: 58 },
      { size: "XL", shoulder: 65, bodyLength: 68, sleeve: 59 },
    ],
  },
  // PT-01 / PT-09 Nepremokavé parašutistické nohavice (waterproof
  // parachute pants) — drawstring waist and adjustable ankle hems.
  F: {
    unit: "cm",
    note: {
      en: "Waist and leg hem can be tightened or loosened with a drawstring.",
      sk: "Pás aj spodný lem si viete sťahovacou šnúrkou stiahnuť alebo natiahnuť.",
    },
    image: parachutePantsDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // TS-01 / TS-02 Oversized tričko (oversized t-shirt) — own chart,
  // separate from chart A which now only covers jackets.
  G: {
    unit: "cm",
    image: teeDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "sleeve", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", shoulder: 48, bodyLength: 62, sleeve: 23 },
      { size: "S", shoulder: 50, bodyLength: 64, sleeve: 24 },
      { size: "M", shoulder: 52, bodyLength: 66, sleeve: 25 },
      { size: "L", shoulder: 54, bodyLength: 68, sleeve: 26 },
      { size: "XL", shoulder: 56, bodyLength: 70, sleeve: 27 },
    ],
  },
  // JK-03 Prešívaná vesta Crease (quilted vest) — own chart, separate
  // from chart A which now covers the remaining (sleeved) jackets.
  H: {
    unit: "cm",
    image: vestDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "hem", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", shoulder: 49, bodyLength: 63, hem: 52 },
      { size: "S", shoulder: 51, bodyLength: 65, hem: 54 },
      { size: "M", shoulder: 53, bodyLength: 67, hem: 56 },
      { size: "L", shoulder: 55, bodyLength: 69, hem: 58 },
      { size: "XL", shoulder: 57, bodyLength: 71, hem: 60 },
    ],
  },
  // JK-02 Prešívaná bunda Crease (puffer jacket) — own chart, separate
  // from chart A which now covers the remaining jackets.
  I: {
    unit: "cm",
    image: pufferDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "sleeve", label: { en: "C", sk: "C" } },
      { id: "hem", label: { en: "D", sk: "D" } },
    ],
    rows: [
      { size: "XS", shoulder: 43, bodyLength: 64, sleeve: 68, hem: 46 },
      { size: "S", shoulder: 45, bodyLength: 66, sleeve: 69, hem: 48 },
      { size: "M", shoulder: 47, bodyLength: 68, sleeve: 70, hem: 50 },
      { size: "L", shoulder: 49, bodyLength: 70, sleeve: 71, hem: 52 },
      { size: "XL", shoulder: 51, bodyLength: 72, sleeve: 72, hem: 54 },
    ],
  },
  // PT-18 Cargo nohavice s popruhmi (straps/buckles cargo).
  J: {
    unit: "cm",
    note: {
      en: "The leg hem can be tightened with a drawstring.",
      sk: "Spodný lem nohavíc si viete stiahnuť šnúrkou.",
    },
    image: cargoStrapsDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // PT-10 Šnurovacie cargo nohavice (lace-up/grommet cargo).
  K: {
    unit: "cm",
    note: {
      en: "Waist and leg hem can be tightened or loosened with a drawstring.",
      sk: "Pás aj spodný lem si viete sťahovacou šnúrkou stiahnuť alebo natiahnuť.",
    },
    image: cargoLaceupDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // PT-12 Cargo nohavice (drawstring-waist cargo).
  L: {
    unit: "cm",
    image: cargoDrawstringDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // PT-04 Maskáčové cargo nohavice (classic belt-loop camo cargo).
  M: {
    unit: "cm",
    note: {
      en: "The leg hem can be tightened with a drawstring.",
      sk: "Spodný lem nohavíc si viete stiahnuť šnúrkou.",
    },
    image: cargoClassicDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // PT-13 Delené maskáčové nohavice (split camo/denim).
  N: {
    unit: "cm",
    image: cargoSplitDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // PT-27 Delené maskáčové nohavice — svetlý denim (same cut as PT-13).
  O: {
    unit: "cm",
    image: cargoSplitDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // JK-01 Bunda Crease V2 / JK-04 Zipsova bunda Crease V1 (front-zip
  // jackets) — same measurements as chart P, separate diagram (front view
  // showing the zip).
  Q: {
    unit: "cm",
    image: creaseZipDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "sleeve", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", shoulder: 52, bodyLength: 65, sleeve: 62 },
      { size: "S", shoulder: 54, bodyLength: 67, sleeve: 63 },
      { size: "M", shoulder: 56, bodyLength: 69, sleeve: 64 },
      { size: "L", shoulder: 58, bodyLength: 71, sleeve: 65 },
      { size: "XL", shoulder: 60, bodyLength: 73, sleeve: 66 },
    ],
  },
  // JK-05 Pulóverová bunda Crease (pullover, no zip) — own diagram (back
  // view, no zip), same measurements as chart Q.
  P: {
    unit: "cm",
    image: creasePulloverDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "sleeve", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", shoulder: 52, bodyLength: 65, sleeve: 62 },
      { size: "S", shoulder: 54, bodyLength: 67, sleeve: 63 },
      { size: "M", shoulder: 56, bodyLength: 69, sleeve: 64 },
      { size: "L", shoulder: 58, bodyLength: 71, sleeve: 65 },
      { size: "XL", shoulder: 60, bodyLength: 73, sleeve: 66 },
    ],
  },
  // PT-03 Roztrhané cargo kraťasy — own chart with A/B/C measurements.
  R: {
    unit: "cm",
    image: camoDistressedShortsDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "width", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 37, length: 56, width: 30 },
      { size: "S", waist: 39, length: 58, width: 32 },
      { size: "M", waist: 41, length: 60, width: 34 },
      { size: "L", waist: 43, length: 62, width: 36 },
      { size: "XL", waist: 45, length: 64, width: 38 },
    ],
  },
  // PT-30 Roztrhané cargo nohavice — same waist/length/leg-opening values as
  // the other cargo pants (J/K/L/M/N/O), own diagram.
  S: {
    unit: "cm",
    image: camoDistressedPantsDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "waist", label: { en: "A", sk: "A" } },
      { id: "length", label: { en: "B", sk: "B" } },
      { id: "legOpening", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", waist: 34, length: 109, legOpening: 25 },
      { size: "S", waist: 36, length: 110, legOpening: 26 },
      { size: "M", waist: 38, length: 111, legOpening: 27 },
      { size: "L", waist: 40, length: 112, legOpening: 28 },
      { size: "XL", waist: 42, length: 113, legOpening: 29 },
    ],
  },
  // HD-09 Zipsová mikina / HD-10 Zipsová mikina s dvojitou kapucňou — same
  // measurements as chart D, own diagram (front view with zip) so chart D's
  // image (shared by every other regular hoodie) isn't touched.
  T: {
    unit: "cm",
    image: zipHoodieDiagram,
    columns: [
      { id: "size", label: { en: "Size", sk: "Veľkosť" } },
      { id: "shoulder", label: { en: "A", sk: "A" } },
      { id: "bodyLength", label: { en: "B", sk: "B" } },
      { id: "sleeve", label: { en: "C", sk: "C" } },
    ],
    rows: [
      { size: "XS", shoulder: 57, bodyLength: 62, sleeve: 59 },
      { size: "S", shoulder: 59, bodyLength: 64, sleeve: 60 },
      { size: "M", shoulder: 61, bodyLength: 66, sleeve: 61 },
      { size: "L", shoulder: 63, bodyLength: 68, sleeve: 62 },
      { size: "XL", shoulder: 65, bodyLength: 70, sleeve: 63 },
    ],
  },
};

// Returns null for "X", for a missing/null key, or for any key that isn't
// a real chart — callers only need to check truthiness.
export const getSizeChart = (key) =>
  key && key !== "X" ? sizeCharts[key] ?? null : null;
