import { useMemo, useState } from "react";
import { materials, materialTypes, getAllMaterialColors } from "../data/materials/index.js";
import MaterialGrid from "../components/material/MaterialGrid.jsx";
import GridDensityToggle from "../components/product/GridDensityToggle.jsx";
import FilterOverlay, { priceRanges } from "../components/product/Filters.jsx";
import { useLanguage } from "../hooks/useLanguage.js";
import { useGridDensity } from "../hooks/useGridDensity.js";

// /material — a separate catalog from clothing (data/materials, not
// data/products), with its own filter: material type (teplákovina/ekokoža/
// polyester/...) instead of clothing category, plus the same price filter
// pattern. Grid density is still the shared global control (same as Home/
// Shop/Doplnky) since it's just a display preference, not catalog-specific.
const Materials = () => {
  const { t } = useLanguage();
  const { density, cycleDensity } = useGridDensity();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeType, setActiveType] = useState("all");
  const [activePriceKey, setActivePriceKey] = useState("all");
  const [activeColor, setActiveColor] = useState(null);

  const allColors = useMemo(() => getAllMaterialColors(), []);

  const categories = ["all", ...materialTypes].map((value) => ({
    value,
    label: t(`filters.materialTypes.${value}`),
  }));

  const filtered = useMemo(() => {
    const range = priceRanges.find((r) => r.key === activePriceKey) ?? priceRanges[0];
    return materials.filter((m) => {
      if (activeType !== "all" && m.materialType !== activeType) return false;
      if (m.pricePerMeter < range.min || m.pricePerMeter > range.max) return false;
      if (activeColor && !m.colors?.includes(activeColor)) return false;
      return true;
    });
  }, [activeType, activePriceKey, activeColor]);

  const clearAllFilters = () => {
    setActiveType("all");
    setActivePriceKey("all");
    setActiveColor(null);
  };

  return (
    <div>
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
          <button
            onClick={() => setFilterOpen(true)}
            className="text-[11px] uppercase tracking-widest2 text-black hover:text-black/60"
          >
            {t("shop.filter")}
          </button>
        </div>
      </div>

      <div className="px-2 md:px-3 py-6">
        {filtered.length > 0 ? (
          <MaterialGrid materials={filtered} density={density} />
        ) : (
          <p className="px-3 text-[11px] uppercase tracking-widest2 text-black/40">
            {t("shop.noResults")}
          </p>
        )}
      </div>

      <FilterOverlay
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        categoryLabel={t("filters.materialType")}
        categories={categories}
        activeCategory={activeType}
        onCategoryChange={setActiveType}
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

export default Materials;
