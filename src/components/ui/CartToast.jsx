import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import { getProductById } from "../../data/products/index.js";
import { getMaterialById } from "../../data/materials/index.js";

// Watches CartContext's `notification` event and shows a small flat popup
// in the bottom-right corner — same black/white, uppercase-tracked look as
// the rest of the site. Re-triggers on every addItem call, even repeats.
const CartToast = () => {
  const { notification } = useCart();
  const { t, pick, colorLabel } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!notification) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(timer);
  }, [notification]);

  if (!notification) return null;

  const isMaterial = notification.kind === "material";
  const item = isMaterial
    ? getMaterialById(notification.productId)
    : getProductById(notification.productId);
  if (!item) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-[200] w-full max-w-[280px] bg-black text-white px-5 py-4 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      role="status"
    >
      <p className="text-[10px] uppercase tracking-widest2 text-white/50">
        {t("toast.added")}
      </p>
      <p className="text-[11px] uppercase tracking-widest2 mt-2">
        {item.code} — {pick(item.name)}
      </p>
      {(notification.size || notification.color) && (
        <p className="text-[10px] uppercase tracking-widest2 text-white/40 mt-1">
          {[
            !isMaterial ? notification.size : null,
            notification.color ? colorLabel(notification.color) : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}
      <Link
        to="/cart"
        className="text-[10px] uppercase tracking-widest2 underline mt-3 inline-block text-white/70 hover:text-white"
      >
        {t("toast.viewCart")}
      </Link>
    </div>
  );
};

export default CartToast;
