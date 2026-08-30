import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage.js";

// Dedicated "thank you" page, navigated to right after a successful Stripe
// payment (see PaymentSection.jsx). This exists as its own route — rather
// than just a local success state inside Checkout.jsx — because clearing
// the cart on success immediately flips Checkout.jsx's own `items.length
// === 0` check, which would otherwise instantly replace any inline success
// message with the generic "your cart is empty" view. Landing on a
// separate URL also means the confirmation survives a refresh instead of
// vanishing the moment local component state resets.
const OrderSuccess = () => {
  const { t } = useLanguage();

  return (
    <div className="px-5 py-24 text-center max-w-md mx-auto">
      <p className="text-[11px] uppercase tracking-widest2 text-black/50 mb-4">
        {t("checkout.successHeading")}
      </p>
      <p className="text-[13px] text-black/70 leading-relaxed mb-8">
        {t("checkout.successMessage")}
      </p>
      <Link
        to="/produkty"
        className="text-[11px] uppercase tracking-widest2 underline"
      >
        {t("cart.continueShopping")}
      </Link>
    </div>
  );
};

export default OrderSuccess;
