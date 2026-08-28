import { useLanguage } from "../../hooks/useLanguage.js";
import { formatPrice } from "../../utils/formatPrice.js";

// Same line-item layout as Cart.jsx (thumbnail + code + qty + price) so the
// order summary reads as the same UI, not a new one.
const OrderSummary = ({ items, subtotal, shippingLabel, shippingPrice, total }) => {
  const { t, pick, language } = useLanguage();

  return (
    <div className="mb-10">
      <p className="text-[10px] uppercase tracking-widest2 text-black/30 mb-3">
        {t("checkout.orderSummaryTitle")}
      </p>

      <div className="divide-y divide-black/10">
        {items.map(({ item, entry }) => (
          <div
            key={`${entry.kind}-${item.productId}-${item.size}-${item.color}`}
            className="flex items-center gap-4 py-3"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white border border-black/10 shrink-0">
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
              <p className="text-[10px] uppercase tracking-widest2 text-black/40 mt-1">
                {entry.kind === "material"
                  ? `${entry.quantity} ${t("material.unit")}`
                  : `${t("cart.qty")} ${entry.quantity}`}
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-widest2 shrink-0">
              {formatPrice(entry.lineTotal, entry.currency, language)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4 mt-2 border-t border-black/10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest2 text-black/60">
          <p>{t("checkout.subtotal")}</p>
          <p>{formatPrice(subtotal, "EUR", language)}</p>
        </div>
        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest2 text-black/60">
          <p>
            {t("checkout.shippingLabel")}
            {shippingLabel ? ` — ${shippingLabel}` : ""}
          </p>
          <p>{shippingPrice > 0 ? formatPrice(shippingPrice, "EUR", language) : "—"}</p>
        </div>
        <div className="flex items-center justify-between text-[13px] uppercase tracking-widest2 pt-2 mt-1 border-t border-black/10">
          <p>{t("checkout.total")}</p>
          <p>{formatPrice(total, "EUR", language)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
