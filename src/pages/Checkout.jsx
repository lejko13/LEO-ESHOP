import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { resolveCartItem } from "../utils/cartItem.js";
import {
  getShippingMethod,
  getPacketaPrice,
  isCartTooBulkyForBox,
} from "../data/shippingMethods.js";
import { STRIPE_PUBLISHABLE_KEY } from "../config/stripe.js";
import ContactSection from "../components/checkout/ContactSection.jsx";
import DeliverySection from "../components/checkout/DeliverySection.jsx";
import PaymentSection from "../components/checkout/PaymentSection.jsx";
import OrderSummary from "../components/checkout/OrderSummary.jsx";
import Button from "../components/ui/Button.jsx";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Reads the same :root CSS variables tailwind.config.js points white/black
// at (see src/index.css), so Stripe's Appearance API — which needs literal
// color strings, not Tailwind classes — stays in sync automatically if
// those variables ever change. Falls back to the current defaults if
// called before styles are attached (shouldn't normally happen).
const readRootColor = (varName, fallback) => {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return raw ? `rgb(${raw})` : fallback;
};

// Stripe Elements' Appearance API, tuned to match the site's existing look:
// flat, square corners, black/white, uppercase tracked labels. No new
// visual language — just mapping the site's tokens onto Stripe's UI.
// See https://stripe.com/docs/elements/appearance-api
const buildAppearance = () => {
  const black = readRootColor("--color-black-rgb", "#0a0a0a");
  const white = readRootColor("--color-white-rgb", "#ffffff");

  return {
    theme: "stripe",
    variables: {
      colorPrimary: black,
      colorBackground: white,
      colorText: black,
      colorDanger: "#df1b41",
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      borderRadius: "0px",
      spacingUnit: "4px",
    },
    rules: {
      ".Label": {
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontSize: "10px",
        color: "rgba(10,10,10,0.5)",
      },
      ".Input": {
        border: "1px solid rgba(10,10,10,0.2)",
        boxShadow: "none",
      },
      ".Input:focus": {
        border: `1px solid ${black}`,
        boxShadow: "none",
      },
      ".Tab": {
        border: "1px solid rgba(10,10,10,0.2)",
        boxShadow: "none",
      },
      ".Tab--selected": {
        border: `1px solid ${black}`,
        boxShadow: "none",
      },
    },
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateContact = (values, t) => {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = t("checkout.errors.required");
  if (!values.lastName.trim()) errors.lastName = t("checkout.errors.required");
  if (!values.email.trim()) errors.email = t("checkout.errors.required");
  else if (!EMAIL_RE.test(values.email)) errors.email = t("checkout.errors.invalidEmail");
  if (!values.phone.trim()) errors.phone = t("checkout.errors.required");
  return errors;
};

// Page-level orchestration only: owns contact/shipping/payment/consent
// state and computes the order total, then hands that down to the section
// components. Shipping (data/shippingMethods.js, DeliverySection) never
// imports anything Stripe-related, and PaymentSection never imports
// anything shipping-related beyond the plain values it's given — the two
// concerns stay logically separate per the brief, even though they render
// on the same page.
const Checkout = () => {
  const { items } = useCart();
  const { t, pick } = useLanguage();

  // "form": editing contact + delivery. "review": read-only recap of
  // everything (items, destination, contact info) — payment/Elements only
  // mounts once the shopper reaches this step, so nothing is actually
  // charged until they've seen the full order and pressed on.
  const [step, setStep] = useState("form");

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [touched, setTouched] = useState({});

  const [shippingMethod, setShippingMethod] = useState(null);
  const [pickupPoint, setPickupPoint] = useState(null);
  const [glsAddress, setGlsAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  // Destination country for pricing purposes — separate from glsAddress's
  // free-text country field (that one's the literal courier delivery
  // address; this one only drives the Packeta price tier, see
  // getPacketaPrice in data/shippingMethods.js). Defaults to Slovakia.
  const [country, setCountry] = useState("SK");

  const [orderNote, setOrderNote] = useState("");
  const [consents, setConsents] = useState({ terms: false, privacy: false });

  // Computed once per mount, after styles are attached to the page.
  const appearance = useMemo(() => buildAppearance(), []);

  const handleContactChange = (field, value) =>
    setContact((c) => ({ ...c, [field]: value }));
  const handleContactBlur = (field) =>
    setTouched((tch) => ({ ...tch, [field]: true }));

  const handleShippingMethodChange = (id) => {
    setShippingMethod(id);
    setPickupPoint(null);
  };
  const handleGlsChange = (field, value) =>
    setGlsAddress((a) => ({ ...a, [field]: value }));
  const handleConsentChange = (field, value) =>
    setConsents((c) => ({ ...c, [field]: value }));

  const contactErrors = validateContact(contact, t);
  const isContactValid = Object.keys(contactErrors).length === 0;

  const selectedShipping = getShippingMethod(shippingMethod);
  const isShippingValid = (() => {
    if (!selectedShipping) return false;
    if (selectedShipping.type === "pickupPoint") return Boolean(pickupPoint);
    if (selectedShipping.type === "address") {
      return Boolean(
        glsAddress.street.trim() &&
          glsAddress.city.trim() &&
          glsAddress.postalCode.trim() &&
          glsAddress.country.trim()
      );
    }
    return false;
  })();

  // Resolves each cart line to either a clothing product or a material
  // (see utils/cartItem.js) so the rest of this page doesn't care which
  // catalog an item came from.
  const itemsWithProducts = items
    .map((item) => ({ item, entry: resolveCartItem(item) }))
    .filter(({ entry }) => Boolean(entry));

  // Any oversized item (`big: "C"`) in the cart restricts delivery to GLS
  // courier only — Packeta BOX/pickup points don't fit it. Re-adding a
  // regular item, or removing the oversized one, brings the other methods
  // back automatically since this is recomputed from the live cart.
  // Materials never carry `big`, so they never trigger this.
  const hasBulkyItem = itemsWithProducts.some(
    ({ entry }) => entry.big === "C"
  );

  // Packeta's price depends on how many "B" (bigger, e.g. jackets) items
  // are in the cart plus the destination country — see getPacketaPrice.
  const packetaItems = itemsWithProducts.map(({ entry }) => ({
    big: entry.big,
    quantity: entry.quantity,
  }));
  const packetaPrice = getPacketaPrice(packetaItems, country);
  // Heavy enough that a real Packeta BOX (fixed compartment size)
  // realistically wouldn't fit it — hide box points, keep staffed pickup
  // points and GLS. See isCartTooBulkyForBox.
  const tooBulkyForBox = isCartTooBulkyForBox(packetaItems);

  useEffect(() => {
    if (hasBulkyItem && shippingMethod && shippingMethod !== "gls") {
      setShippingMethod(null);
      setPickupPoint(null);
    }
  }, [hasBulkyItem, shippingMethod]);

  // A previously chosen BOX point stops being valid the moment the cart
  // gets too bulky for it (e.g. adding a second jacket after already
  // picking a box).
  useEffect(() => {
    if (tooBulkyForBox && pickupPoint?.kind === "box") {
      setPickupPoint(null);
    }
  }, [tooBulkyForBox, pickupPoint]);

  // A previously chosen pickup point belongs to whichever country was
  // selected at the time — switching countries invalidates it, since the
  // point list itself is keyed by country (see mockPickupPoints).
  useEffect(() => {
    setPickupPoint(null);
  }, [country]);

  const subtotal = itemsWithProducts.reduce(
    (sum, { entry }) => sum + entry.lineTotal,
    0
  );
  // Packeta (pickupPoint-type) methods use the dynamic tier/country price;
  // GLS keeps its own static price from data/shippingMethods.js for now.
  const shippingPrice = !selectedShipping
    ? 0
    : selectedShipping.type === "pickupPoint"
      ? packetaPrice
      : selectedShipping.price;
  const total = subtotal + shippingPrice;
  const amountInCents = Math.round(total * 100);

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

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="text-[11px] uppercase tracking-widest2 text-black/50 mb-8">
        {t("checkout.title")}
      </h1>

      {step === "form" ? (
        <>
          <ContactSection
            values={contact}
            errors={contactErrors}
            touched={touched}
            onChange={handleContactChange}
            onBlur={handleContactBlur}
          />

          <DeliverySection
            method={shippingMethod}
            onMethodChange={handleShippingMethodChange}
            pickupPoint={pickupPoint}
            onPickupPointChange={setPickupPoint}
            glsAddress={glsAddress}
            onGlsChange={handleGlsChange}
            restricted={hasBulkyItem}
            country={country}
            onCountryChange={setCountry}
            packetaPrice={packetaPrice}
            tooBulkyForBox={tooBulkyForBox}
          />

          <Button
            type="button"
            disabled={!isContactValid || !isShippingValid}
            onClick={() => setStep("review")}
            className="w-full disabled:opacity-40"
          >
            {t("checkout.reviewOrder")}
          </Button>
        </>
      ) : (
        <>
          {/* Read-only recap — contact + delivery destination — with a way
              back to edit either before anything is charged. */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-widest2 text-black/30">
                {t("checkout.contact")}
              </p>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-[10px] uppercase tracking-widest2 underline text-black/40 hover:text-black"
              >
                {t("checkout.editDetails")}
              </button>
            </div>
            <p className="text-[12px] uppercase tracking-widest2">
              {contact.firstName} {contact.lastName}
            </p>
            <p className="text-[11px] text-black/50 mt-1">{contact.email}</p>
            <p className="text-[11px] text-black/50">{contact.phone}</p>
          </div>

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest2 text-black/30 mb-3">
              {t("checkout.delivery")}
            </p>
            <p className="text-[12px] uppercase tracking-widest2">
              {selectedShipping ? pick(selectedShipping.name) : ""}
            </p>
            {selectedShipping?.type === "pickupPoint" && pickupPoint && (
              <p className="text-[11px] text-black/50 mt-1">
                {pickupPoint.name}, {pickupPoint.address}, {pickupPoint.city}
              </p>
            )}
            {selectedShipping?.type === "address" && (
              <p className="text-[11px] text-black/50 mt-1">
                {glsAddress.street}, {glsAddress.city} {glsAddress.postalCode},{" "}
                {glsAddress.country}
              </p>
            )}
          </div>

          <OrderSummary
            items={itemsWithProducts}
            subtotal={subtotal}
            shippingLabel={selectedShipping ? pick(selectedShipping.name) : null}
            shippingPrice={shippingPrice}
            total={total}
          />

          {/* Remounting on amount change (key) is the simplest reliable way
              to keep Stripe's deferred Elements flow in sync when shipping
              cost changes the total — contact/shipping/note/consent state
              all live in this parent component, so nothing is lost when it
              remounts. Elements only mounts once the shopper reaches the
              review step, so no Stripe call happens before then. */}
          <Elements
            key={amountInCents}
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: amountInCents,
              currency: "eur",
              appearance,
            }}
          >
            <PaymentSection
              amount={amountInCents}
              orderNote={orderNote}
              onOrderNoteChange={setOrderNote}
              consents={consents}
              onConsentChange={handleConsentChange}
              contact={contact}
              shippingMethod={shippingMethod}
              shippingLabel={selectedShipping ? pick(selectedShipping.name) : null}
              pickupPoint={pickupPoint}
              glsAddress={glsAddress}
              isContactValid={isContactValid}
              isShippingValid={isShippingValid}
              itemsWithProducts={itemsWithProducts}
              subtotal={subtotal}
              shippingPrice={shippingPrice}
              total={total}
            />
          </Elements>
        </>
      )}
    </div>
  );
};

export default Checkout;
