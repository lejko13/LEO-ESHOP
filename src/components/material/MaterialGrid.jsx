import MaterialCard from "./MaterialCard.jsx";

// Same grid/density mapping as ProductGrid.jsx (kept as a small duplicate
// rather than a shared import since the two grids render different card
// components and there's no other shared logic worth abstracting).
const densityClasses = {
  1: "grid-cols-3 lg:grid-cols-6",
  2: "grid-cols-2 lg:grid-cols-4",
  3: "grid-cols-1 lg:grid-cols-3",
};

const MaterialGrid = ({ materials, density }) => (
  <div
    className={`grid gap-x-2 gap-y-10 ${
      density ? densityClasses[density] : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    }`}
  >
    {materials.map((material) => (
      <MaterialCard key={material.id} material={material} />
    ))}
  </div>
);

export default MaterialGrid;
