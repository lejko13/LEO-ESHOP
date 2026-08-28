import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice.js";
import { COLOR_SWATCHES } from "../../utils/colors.js";
import { useLanguage } from "../../hooks/useLanguage.js";

// Yeezy-style card: plain image on white, no border/shadow/card chrome.
// Caption is centered — code, then the actual product name, then price,
// then (for products with `showSwatches: true`) square color swatches.
//
// Clicking a swatch previews that color's photo right here on the card
// (via `product.imagesByColor`, when the product has one — see e.g.
// data/products/hoodie/product.js) without navigating to the product page.
// Swatches are inside the card's <Link>, so clicks need
// preventDefault/stopPropagation or they'd just navigate away instead.
const ProductCard = ({ product }) => {
  const { pick, colorLabel, language } = useLanguage();
  const name = pick(product.name);
  const [activeColor, setActiveColor] = useState(product.colors?.[0] ?? null);

  const displayImage =
    product.imagesByColor?.[activeColor]?.front ?? product.images.front;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {/* Slight zoom on hover — mouse/trackpad only, see the `hover`
          variant override in tailwind.config.js, which keeps this from
          getting stuck "on" after a tap on touch devices. */}
      <div className="aspect-square flex items-center justify-center bg-white overflow-hidden">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest2">
          {product.code}
        </p>
        <p className="text-[10px] uppercase tracking-widest2 text-black/50 mt-1">
          {name}
        </p>
        <p className="text-[11px] uppercase tracking-widest2 text-black/40 mt-1">
          {formatPrice(product.price, product.currency, language)}
        </p>
        {product.showSwatches && product.colors?.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                title={colorLabel(c)}
                aria-label={colorLabel(c)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveColor(c);
                }}
                className={`w-2.5 h-2.5 border ${
                  activeColor === c ? "border-black" : "border-black/10"
                }`}
                style={{ backgroundColor: COLOR_SWATCHES[c] ?? "#cccccc" }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
