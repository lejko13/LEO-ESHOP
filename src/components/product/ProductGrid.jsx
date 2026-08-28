import ProductCard from "./ProductCard.jsx";

// density is optional — when provided (Shop.jsx's grid toggle) it overrides
// the default responsive columns used everywhere else (e.g. Home.jsx).
const densityClasses = {
  1: "grid-cols-3 lg:grid-cols-6",
  2: "grid-cols-2 lg:grid-cols-4",
  3: "grid-cols-1 lg:grid-cols-3",
};

const ProductGrid = ({ products, density }) => (
  <div
    className={`grid gap-x-2 gap-y-10 ${
      density ? densityClasses[density] : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    }`}
  >
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductGrid;
