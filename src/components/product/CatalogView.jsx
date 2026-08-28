import { useMemo, useState } from "react";
import { products, getAllColors } from "../../data/products/index.js";
import ProductGrid from "./ProductGrid.jsx";
import GridDensityToggle from "./GridDensityToggle.jsx";
import FilterOverlay, { priceRanges } from "./Filters.jsx";
import { useLanguage } from "../../hooks/useLanguage.js";
import { useGridDensity } from "../../hooks/useGridDensity.js";

const categoryValues = [
  "all", "hoodies", "tracksuit", "pants", "t-shirts", "jackets", "footwear", "accessories",
];

// Shared by Home ("/"), Shop ("/produkty"), and the dedicated per-category
// pages (/produkty/hoodie, /produkty/tracksuit, /produkty/pants,
// /produkty/jacket) so they all render the exact same catalog UI. Grid
// density itself now comes from GridDensityContext since the toggle for it
// lives in the desktop navbar, not in this component.
//
// `scope` pre-filters to a single category (any value in `categoryValues`
// except "all") and drops the category filter section — the category is
// already implied by the page/URL, so re-offering it in the filter panel
// would be redundant. `hideColorFilter` additionally drops the color
// section too — used by the Doplnky (accessories) page, where "different
// filter, different products" made more sense than a color picker.
const CatalogView = ({ scope = "all", hideColorFilter = false }) => {
  const { t } = useLanguage();
  const { density, cycleDensity } = useGridDensity();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePriceKey, setActivePriceKey] = useState("all");
  const [activeColor, setActiveColor] = useState(null);

  const showCategoryFilter = scope === "all";
  const baseProducts = useMemo(
    () => (scope === "all" ? products : products.filter((p) => p.category === scope)),
    [scope]
  );
  const showColorFilter = !hideColorFilter;

  const allColors = useMemo(
    () => (showColorFilter ? getAllColors(baseProducts) : []),
    [showColorFilter, baseProducts]
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
          {scope === "all"
            ? t("shop.allCount", { count: filtered.length })
            : `${t(`filters.categories.${scope}`)} (${filtered.length})`}
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
