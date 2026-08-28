import { useMemo, useState } from "react";
import { products, getAllColors } from "../../data/products/index.js";
import ProductGrid from "./ProductGrid.jsx";
import GridDensityToggle from "./GridDensityToggle.jsx";
import FilterOverlay, { priceRanges } from "./Filters.jsx";
import { useLanguage } from "../../hooks/useLanguage.js";
import { useGridDensity } from "../../hooks/useGridDensity.js";

const categoryValues = [
  "all", "hoodies", "t-shirts", "pants", "jackets", "footwear", "accessories",
];

// Shared by Home ("/") and Shop ("/produkty") so both render the exact same
// catalog UI. Grid density itself now comes from GridDensityContext since
// the toggle for it lives in the desktop navbar, not in this component.
//
// `scope="accessories"` (used by the Doplnky page) pre-filters to just the
// accessories category and drops the category + color filter sections —
// "different filter, different products" for that page, without a second
// near-duplicate catalog component.
const CatalogView = ({ scope = "all" }) => {
  const { t } = useLanguage();
  const { density, cycleDensity } = useGridDensity();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePriceKey, setActivePriceKey] = useState("all");
  const [activeColor, setActiveColor] = useState(null);

  const showCategoryFilter = scope === "all";
  const baseProducts = useMemo(
    () =>
      scope === "accessories"
        ? products.filter((p) => p.category === "accessories")
        : products,
    [scope]
  );
  const showColorFilter = scope === "all";

  const allColors = useMemo(
    () => (showColorFilter ? getAllColors() : []),
    [showColorFilter]
  );

  const categories = showCategoryFilter
    ? categoryValues.map((value) => ({
        value,
        label: t(`filters.categories.${value}`),
      }))
    : [];

  const filtered = useMemo(() => {
    const range = priceRanges.find((r) => r.key === activePriceKey) ?? priceRanges[0];
    return baseProducts.filter((p) => {
      if (showCategoryFilter && activeCategory !== "all" && p.category !== activeCategory) return false;
      if (p.price < range.min || p.price > range.max) return false;
      if (showColorFilter && activeColor && !p.colors.includes(activeColor)) return false;
      return true;
    });
  }, [baseProducts, showCategoryFilter, showColorFilter, activeCategory, activePriceKey, activeColor]);

  const clearAllFilters = () => {
    setActiveCategory("all");
    setActivePriceKey("all");
    setActiveColor(null);
  };

  return (
    <div>
      {/* One row always — All on the left, grid density + Filter together
          on the right — same layout on mobile and desktop. */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-black/10 px-5 md:px-8 pb-4 flex items-center justify-between">
        <h1 className="text-[11px] uppercase tracking-widest2 text-black/50">
          {t("shop.allCount", { count: filtered.length })}
        </h1>
        <div className="flex items-center gap-5">
          <GridDensityToggle
            density={density}
            onCycle={cycleDensity}
            label={t("shop.gridView")}
          />
          <button onClick={() => setFilterOpen(true)} className="text-[11px] uppercase tracking-widest2 text-black hover:text-black/60">
            {t("shop.filter")}
          </button>
        </div>
      </div>

      <div className="px-2 md:px-3 py-6">
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} density={density} />
        ) : (
          <p className="px-3 text-[11px] uppercase tracking-widest2 text-black/40">{t("shop.noResults")}</p>
        )}
      </div>

      <FilterOverlay
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activePriceKey={activePriceKey}
        onPriceChange={setActivePriceKey}
        colors={allColors}
        activeColor={activeColor}
        onColorChange={setActiveColor}
        onClearAll={clearAllFilters}
        resultCount={filtered.length}
      />
    </div>
  );
};

export default CatalogView;
