import { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLanguage } from "../../hooks/useLanguage.js";
import { useCart } from "../../hooks/useCart.js";
import { STRIPE_API_URL } from "../../config/stripe.js";
import { formatPrice } from "../../utils/formatPrice.js";
import Button from "../ui/Button.jsx";
import Checkbox from "../ui/Checkbox.jsx";

const sectionLabelClass = "text-[10px] uppercase tracking-widest2 text-black/30 mb-3";
const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent";

// Everything here lives inside <Elements> (see Checkout.jsx) because the
// submit handler needs useStripe()/useElements(). Shipping and contact data
// arrive as plain props — this component never touches shipping logic
// itself, it only reads the final values to attach as billing/shipping
// details and PaymentIntent metadata. That's the "shipping and Stripe are
// separate" boundary the brief asked for.
//
// Card, Apple Pay and Google Pay are NOT separate hand-rolled options —
// Stripe's own <PaymentElement> below already detects and renders Apple Pay
// / Google Pay as real wallet buttons automatically, above the card fields,
// whenever the browser/device supports them AND the site is served over a
// verified HTTPS domain (automatic_payment_methods is already enabled on
// the backend — see server/index.js). Apple Pay specifically also requires
// the domain to be registered/verified in the Stripe Dashboard (Settings ->
// Payment methods -> Apple Pay) — neither wallet can appear on localhost.
// There is deliberately no fake "Apple Pay"/"Google Pay" button here that
// always shows "coming soon" regardless of eligibility, since that would be
// misleading once the site is actually deployed.
//
// TODO(Stripe API): swap STRIPE_PUBLISHABLE_KEY / STRIPE_SECRET_KEY (see
// src/config/stripe.js and server/.env) for real keys when ready. No other
// code changes should be needed.
// Note: order items/subtotal/shipping/total are shown once, in the review
// step's <OrderSummary> in Checkout.jsx (before this component even mounts)
// — not duplicated here. They're passed down again (itemsWithProducts/
// subtotal/shippingPrice/total below) purely so they can be sent to
// /confirm-order once payment succeeds — see saveOrder().
const PaymentSection = ({
  amount,
  orderNote,
  onOrderNoteChange,
  consents,
  onConsentChange,
  contact,
  shippingMethod,
  shippingLabel,
  pickupPoint,
  glsAddress,
  isContactValid,
  isShippingValid,
  itemsWithProducts,
  subtotal,
  shippingPrice,
  total,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const { t, language } = useLanguage();
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit =
    isContactValid && isShippingValid && consents.terms && consents.privacy;

  // Fire-and-forget: payment has already succeeded by the time this runs
  // (see handleSubmit below), so a failure here shouldn't block or change
  // the success screen the shopper sees — it just means this particular
  // order won't show up in your Supabase "orders" table (the payment
  // itself is still fine and visible in the Stripe dashboard either way).
  // Errors are only logged to the console.
  const saveOrder = async (paymentIntentId) => {
    try {
      await fetch(`${STRIPE_API_URL}/confirm-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          contact,
          shippingMethod,
          shippingLabel,
          pickupPoint,
          glsAddress,
          orderNote,
          items: itemsWithProducts.map(({ entry }) => ({
            kind: entry.kind,
            code: entry.code,
            name: entry.name,
            size: entry.size,
            color: entry.color,
            quantity: entry.quantity,
            unitPrice: entry.unitPrice,
            lineTotal: entry.lineTotal,
            currency: entry.currency,
          })),
          subtotal,
          shippingPrice,
          total,
          currency: "eur",
        }),
      });
    } catch (err) {
      console.error("Couldn't save order to Supabase:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !canSubmit) return;

    setStatus("processing");
    setErrorMessage("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setStatus("error");
      setErrorMessage(submitError.message);
      return;
    }

    try {
      const res = await fetch(`${STRIPE_API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "eur",
          metadata: {
            orderNote,
            shippingMethod: shippingMethod ?? "",
            pickupPointId: pickupPoint?.id ?? "",
            glsStreet: glsAddress?.street ?? "",
            glsCity: glsAddress?.city ?? "",
            glsPostalCode: glsAddress?.postalCode ?? "",
            glsCountry: glsAddress?.country ?? "",
          },
        }),
      });

      if (!res.ok) throw new Error("backend-unreachable");

      const { clientSecret } = await res.json();

      // redirect: "if_required" is the important part here — by default
      // Stripe ALWAYS does a full-page redirect to return_url after
      // confirmation, even for an immediately successful card payment.
      // That would reload this page before the success branch below ever
      // runs, meaning the "Thank you" message, the /confirm-order call,
      // and the cart clear would silently never happen for a normal card
      // payment. With "if_required", card payments (and Apple/Google Pay)
      // resolve right here instead. Only genuinely redirect-based payment
      // methods (bank redirects, some wallets) still navigate away — if
      // you don't intend to offer those, keep them disabled in the Stripe
      // Dashboard (Settings -> Payment methods) so every checkout uses
      // this in-page path.
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/checkout`,
          payment_method_data: {
            billing_details: {
              name: `${contact.firstName} ${contact.lastName}`.trim(),
              email: contact.email,
              phone: contact.phone,
              address:
                shippingMethod === "gls"
                  ? {
                      line1: glsAddress.street,
                      city: glsAddress.city,
                      postal_code: glsAddress.postalCode,
                      country: glsAddress.country,
                    }
                  : undefined,
            },
          },
        },
      });

      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
      } else {
        // With redirect: "if_required", a non-redirect payment method
        // (card, most wallets) resolves right here with the confirmed
        // PaymentIntent — no page reload, so nothing about this component
        // gets lost.
        setStatus("success");
        clearCart();
        saveOrder(paymentIntent.id);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("checkout.backendMissing"));
    }
  };

  if (status === "success") {
    return (
      <p className="text-[11px] uppercase tracking-widest2 text-black/70">
        {t("checkout.success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10">
        <p className={sectionLabelClass}>{t("checkout.payment")}</p>
        {/* Real Stripe element — shows Apple Pay / Google Pay as wallet
            buttons automatically above the card fields when the browser,
            device and domain are eligible (see the comment above this
            component for exactly what that requires). */}
        <PaymentElement options={{ layout: "tabs" }} />
        <p className="mt-3 text-[10px] uppercase tracking-widest2 text-black/30">
          {t("checkout.walletsNotice")}
        </p>
      </div>

      <div className="mb-10">
        <p className={sectionLabelClass}>{t("checkout.orderNote")}</p>
        <textarea
          rows={3}
          placeholder={t("checkout.orderNotePlaceholder")}
          value={orderNote}
          onChange={(e) => onOrderNoteChange(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mb-10 space-y-3">
        <Checkbox
          checked={consents.terms}
          onChange={(v) => onConsentChange("terms", v)}
        >
          {t("checkout.consentTerms")}
        </Checkbox>
        <Checkbox
          checked={consents.privacy}
          onChange={(v) => onConsentChange("privacy", v)}
        >
          {t("checkout.consentPrivacy")}
        </Checkbox>
      </div>

      {status === "error" && (
        <p className="text-[11px] uppercase tracking-widest2 text-red-600 mb-4">
          {errorMessage || t("checkout.error")}
        </p>
      )}

      <Button
        type="submit"
        disabled={!stripe || !canSubmit || status === "processing"}
        className="w-full disabled:opacity-40"
      >
        {status === "processing"
          ? t("checkout.processing")
          : t("checkout.placeOrder", {
              amount: formatPrice(amount / 100, "EUR", language),
            })}
      </Button>
    </form>
  );
};

export default PaymentSection;
