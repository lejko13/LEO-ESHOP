import { Palette, Tags } from "lucide-react";

// Single-click toggle between the catalog's two display orders:
// "color"    — the default, matches the hand-picked order in
//              data/products/index.js (flows through the palette).
// "category" — groups the same (already filtered) products by category
//              instead, via a stable sort in CatalogView.jsx.
const icons = { color: Palette, category: Tags };

const SortToggle = ({ mode, onCycle, label }) => {
  const Icon = icons[mode] ?? Palette;

  return (
    <button
      onClick={onCycle}
      title={label}
      aria-label={label}
      className="text-black/50 hover:text-black transition-colors"
    >
      <Icon size={15} strokeWidth={1.5} />
    </button>
  );
};

export default SortToggle;
