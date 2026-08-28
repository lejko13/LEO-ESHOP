import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { resolveCartItem } from "../utils/cartItem.js";
import { formatPrice } from "../utils/formatPrice.js";

const Cart = () => {
  const { items, removeItem } = useCart();
  const { t, pick, colorLabel, language } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="px-5 py-24 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-black/50">
          {t("cart.empty")}
        </p>
        <Link
          to="/produkty"
          className="text-[11px] uppercase tracking-widest2 underline mt-4 inline-block"
        >
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  const resolved = items
    .map((item) => ({ item, entry: resolveCartItem(item) }))
    .filter(({ entry }) => Boolean(entry));

  const total = resolved.reduce((sum, { entry }) => sum + entry.lineTotal, 0);

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="text-[11px] uppercase tracking-widest2 text-black/50 mb-8">
        {t("cart.title", { count: items.length })}
      </h1>

      <div className="divide-y divide-black/10">
        {resolved.map(({ item, entry }) => (
          <div
            key={`${entry.kind}-${item.productId}-${item.size}-${item.color}`}
            className="flex items-center gap-4 py-5"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-white">
              <img
                src={entry.image}
                alt={pick(entry.name)}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-widest2">
                {entry.code}
              </p>
              <p className="text-[11px] uppercase tracking-widest2 text-black/40 mt-1">
                {entry.kind === "material"
                  ? [
                      entry.color
                        ? `${t("cart.color")} ${colorLabel(entry.color)}`
                        : null,
                      `${entry.quantity} ${t("material.unit")}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")
                  : [
                      entry.size ? `${t("cart.size")} ${entry.size}` : null,
                      entry.color
                        ? `${t("cart.color")} ${colorLabel(entry.color)}`
                        : null,
                      `${t("cart.qty")} ${entry.quantity}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-widest2">
              {formatPrice(entry.lineTotal, entry.currency, language)}
            </p>
            <button
              onClick={() =>
                removeItem(item.productId, item.size, item.color, entry.kind)
              }
              className="text-[10px] uppercase tracking-widest2 text-black/30 hover:text-black"
            >
              {t("cart.remove")}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10">
        <p className="text-[13px] uppercase tracking-widest2">
          {formatPrice(total, "EUR", language)}
        </p>
        <Link
          to="/checkout"
          className="inline-block px-6 py-3.5 text-[11px] font-medium uppercase tracking-widest2 bg-black text-white hover:bg-black/80 transition-colors"
        >
          {t("cart.checkout")}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
