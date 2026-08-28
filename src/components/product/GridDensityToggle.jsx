import { Grid3x3, Grid2x2, Square } from "lucide-react";

// Cycles through 3 grid densities on a single click:
// 1 = dense   (mobile 3 cols / desktop 6 cols)
// 2 = medium  (mobile 2 cols / desktop 3 cols)
// 3 = spacious (mobile 1 col  / desktop 3 cols)
const icons = { 1: Grid3x3, 2: Grid2x2, 3: Square };

const GridDensityToggle = ({ density, onCycle, label }) => {
  const Icon = icons[density] ?? Grid3x3;

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

export default GridDensityToggle;
