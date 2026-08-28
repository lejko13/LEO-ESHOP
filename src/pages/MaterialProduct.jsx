import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMaterialById } from "../data/materials/index.js";
import { useCart } from "../hooks/useCart.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { formatPrice } from "../utils/formatPrice.js";
import { COLOR_SWATCHES } from "../utils/colors.js";
import Button from "../components/ui/Button.jsx";
import QuantityStepper from "../components/ui/QuantityStepper.jsx";

// Sold by the meter, not by piece: the listing price is a rate (€/m), and
// picking a quantity here computes the actual line total live —
// pricePerMeter * quantity — before it's added to the cart. Mirrors
// Product.jsx's layout (single centered column), with a color choice same
// as clothing products, and — unlike clothing, which is always whole
// pieces — a quantity that can be fractional (e.g. 3.4 m, 8.6 m).
const METER_OPTIONS = [0.5, 1, 2, 3, 4, 5];

const MaterialProduct = () => {
  const { id } = useParams();
  const material = getMaterialById(id);
  const { t, pick, colorLabel, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(material?.colors?.[0] ?? null);
  const { addItem } = useCart();

  if (!material) {
    return (
      <div className="px-5 md:px-8 py-16 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-black/50">
          {t("material.notFound")}
        </p>
        <Link
          to="/material"
          className="text-[11px] uppercase tracking-widest2 underline mt-4 inline-block"
        >
          {t("material.backToMaterials")}
        </Link>
      </div>
    );
  }

  const name = pick(material.name);
  const lineTotal = material.pricePerMeter * quantity;
  const hasColorChoice = material.colors?.length > 1;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-md aspect-square flex items-center justify-center bg-white">
          <img
            src={material.images.front}
            alt={name}
            className="w-full h-full object-contain p-6"
          />
        </div>
      </div>

      <div className="w-full max-w-md px-5 pb-16 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-black/40">
          {material.code}
        </p>
        <h1 className="text-lg uppercase tracking-widest2 mt-2">{name}</h1>
        <p className="mt-2 text-[13px] tracking-wide">
          {formatPrice(material.pricePerMeter, material.currency, language)}/
          {t("material.unit")} · {t("material.pricePerMeter")}
        </p>

        <p className="mt-8 text-[13px] leading-relaxed text-black/60">
          {pick(material.description)}
        </p>

        {material.widthCm && (
          <p className="mt-4 text-[10px] uppercase tracking-widest2 text-black/40">
            {t("material.widthLabel", { width: material.widthCm })}
          </p>
        )}

        {material.delivery && (
          <p className="mt-2 text-[10px] uppercase tracking-widest2 text-black/40">
            {t("material.delivery")}: {pick(material.delivery)}
          </p>
        )}

        {hasColorChoice && (
          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-widest2 text-black/50 mb-3">
              {t("product.color")} — {colorLabel(color)}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {material.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  title={colorLabel(c)}
                  aria-label={colorLabel(c)}
                  className={`w-9 h-9 border ${
                    color === c
                      ? "border-black ring-1 ring-offset-2 ring-black"
                      : "border-black/20 hover:border-black"
                  }`}
                  style={{ backgroundColor: COLOR_SWATCHES[c] ?? "#cccccc" }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <p className="text-[11px] uppercase tracking-widest2 text-black/50 mb-3">
            {t("material.quantity")} ({t("material.unit")})
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {METER_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={() => setQuantity(m)}
                className={`min-w-[52px] h-12 px-3 border text-[11px] uppercase tracking-widest2 ${
                  quantity === m
                    ? "border-black bg-black text-white"
                    : "border-black/20 hover:border-black"
                }`}
              >
                {m}
              </button>
            ))}
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              min={0.1}
              step={0.1}
              decimals={1}
              ariaLabel={t("material.quantity")}
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4">
          <p className="text-[11px] uppercase tracking-widest2 text-black/50">
            {t("material.total")}
          </p>
          <p className="text-[13px] uppercase tracking-widest2">
            {formatPrice(lineTotal, material.currency, language)}
          </p>
        </div>

        <Button
          className="mt-6 w-full"
          onClick={() => addItem(material.id, null, color, quantity, "material")}
        >
          {t("material.addToCart")}
        </Button>
      </div>
    </div>
  );
};

export default MaterialProduct;
