import { COLOR_SWATCHES } from "../../utils/colors.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import SidePanel from "../ui/SidePanel.jsx";

// Shared price buckets — imported by Shop.jsx so the filtering logic and the
// translated labels stay in sync. `key` is stable across languages; the
// display label is resolved at render time via t(`filters.priceRanges.${key}`).
export const priceRanges = [
  { key: "all", min: 0, max: Infinity },
  { key: "under50", min: 0, max: 50 },
  { key: "between50and100", min: 50, max: 100 },
  { key: "over100", min: 100, max: Infinity },
];

const pillClass = (active) =>
  `text-[11px] uppercase tracking-widest2 transition-colors ${
    active ? "text-black" : "text-black/40 hover:text-black"
  }`;

// Content-only now — the slide-in shell itself lives in SidePanel and is
// shared with anything else that opens as an overlay (e.g. SizeChartPanel).
// Reused by the main Shop/Home catalog (categories = clothing categories,
// colors = swatches), the Materials catalog (categories = material types,
// no color section), and the Accessories catalog (no category section,
// price only) — sections are simply omitted when their array is empty, so
// one component covers all three without extra props.
const FilterOverlay = ({
  open,
  onClose,
  categoryLabel,
  categories = [],
  activeCategory,
  onCategoryChange,
  activePriceKey,
  onPriceChange,
  colors = [],
  activeColor,
  onColorChange,
  onClearAll,
  resultCount,
}) => {
  const { t, colorLabel } = useLanguage();

  const hasActiveFilters =
    (categories.length > 0 && activeCategory !== "all") ||
    activePriceKey !== "all" ||
    Boolean(activeColor);

  return (
    <SidePanel open={open} onClose={onClose} title={t("filters.title")}>
      <div className="px-6 py-6 space-y-8">
        {categories.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest2 text-black/30 mb-3">
              {categoryLabel ?? t("filters.category")}
            </p>
            <div className="flex flex-col items-start gap-2.5">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onCategoryChange(c.value)}
                  className={pillClass(activeCategory === c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-[10px] uppercase tracking-widest2 text-black/30 mb-3">
            {t("filters.price")}
          </p>
          <div className="flex flex-col items-start gap-2.5">
            {priceRanges.map((r) => (
              <button
                key={r.key}
                onClick={() => onPriceChange(r.key)}
                className={pillClass(activePriceKey === r.key)}
              >
                {t(`filters.priceRanges.${r.key}`)}
              </button>
            ))}
          </div>
        </div>

        {colors.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest2 text-black/30 mb-3">
              {t("filters.color")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onColorChange(null)}
                className={pillClass(!activeColor)}
              >
                {t("filters.all")}
              </button>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => onColorChange(c)}
                  title={colorLabel(c)}
                  aria-label={colorLabel(c)}
                  className={`w-5 h-5 border ${
                    activeColor === c
                      ? "border-black ring-1 ring-offset-2 ring-black"
                      : "border-black/20"
                  }`}
                  style={{ backgroundColor: COLOR_SWATCHES[c] ?? "#cccccc" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 space-y-3">
        <button
          onClick={onClose}
          className="w-full bg-black text-white text-[11px] uppercase tracking-widest2 py-3.5 hover:bg-black/80 transition-colors"
        >
          {t("filters.showResults", { count: resultCount })}
        </button>
        <button
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          className="w-full text-[10px] uppercase tracking-widest2 text-black/40 hover:text-black underline disabled:opacity-30 disabled:no-underline py-1"
        >
          {t("filters.clearAll")}
        </button>
      </div>
    </SidePanel>
  );
};

export default FilterOverlay;
