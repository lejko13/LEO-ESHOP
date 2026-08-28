import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice.js";
import { COLOR_SWATCHES } from "../../utils/colors.js";
import { useLanguage } from "../../hooks/useLanguage.js";

// Same visual language as ProductCard (plain image on white, centered
// caption, square color swatches, no card chrome) — only the price line
// differs, showing a per-meter rate instead of a flat price.
const MaterialCard = ({ material }) => {
  const { pick, language, t, colorLabel } = useLanguage();
  const name = pick(material.name);

  return (
    <Link to={`/material/${material.id}`} className="group block">
      <div className="aspect-square flex items-center justify-center bg-white">
        <img
          src={material.images.front}
          alt={name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest2">
          {material.code}
        </p>
        <p className="text-[10px] uppercase tracking-widest2 text-black/50 mt-1">
          {name}
        </p>
        <p className="text-[11px] uppercase tracking-widest2 text-black/40 mt-1">
          {formatPrice(material.pricePerMeter, material.currency, language)}
          {t("material.unit") ? `/${t("material.unit")}` : ""}
        </p>
        {material.showSwatches && material.colors?.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {material.colors.map((c) => (
              <span
                key={c}
                title={colorLabel(c)}
                className="w-2.5 h-2.5 border border-black/10"
                style={{ backgroundColor: COLOR_SWATCHES[c] ?? "#cccccc" }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MaterialCard;
