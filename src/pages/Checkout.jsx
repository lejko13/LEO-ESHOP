import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import { useCart } from "../hooks/useCart.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { resolveCartItem } from "../utils/cartItem.js";
import {
  getShippingMethod,
  getPacketaPrice,
  getOversizedShippingPrice,
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

// Requires an "@", at least one "." after it, and a letters-only TLD of 2+
// chars at the end (rules out things like "a@b" or "a@b.1" slipping
// through while still staying a plain regex, not a full RFC 5322 parser).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

// Phone numbers are checked with libphonenumber-js against the shopper's
// selected country (see phoneCountry state + ContactSection's country
// picker) instead of a generic regex — it knows each country's real
// numbering plan (e.g. a Slovak mobile number is always 9 digits after
// +421 and starts with 9; a US number has a completely different shape),
// so "0909099" (too short) or "123456789" (wrong prefix for that country)
// get rejected even though a plain "looks like enough digits" regex would
// have let them through.
const validateContact = (values, phoneCountry, t) => {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = t("checkout.errors.required");
  if (!values.lastName.trim()) errors.lastName = t("checkout.errors.required");
  if (!values.email.trim()) errors.email = t("checkout.errors.required");
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = t("checkout.errors.invalidEmail");
  if (!values.phone.trim()) errors.phone = t("checkout.errors.required");
  else if (!isValidPhoneNumber(values.phone.trim(), phoneCountry))
    errors.phone = t("checkout.errors.invalidPhone");
  return errors;
};

// The E.164 form (e.g. "+421908836584") is what actually gets sent along
// with the order (Stripe metadata, Supabase, confirmation emails) — far
// more useful there than the raw national-format digits the shopper typed
// (e.g. "0908 836 584"), since it's unambiguous and directly dialable
// regardless of who's reading it later. Falls back to the raw input
// as-is if it doesn't parse as a valid number for the selected country
// (isShippingValid — actually isContactValid — already blocks checkout in
// that case, so this fallback only matters transiently while the shopper
// is still typing).
const toE164 = (phone, phoneCountry) => {
  const parsed = parsePhoneNumberFromString(phone.trim(), phoneCountry);
  return parsed?.isValid() ? parsed.number : phone.trim();
};

// Nicely formatted for display in the review step (e.g.
// "+421 908 836 584") — same fallback reasoning as toE164 above.
const formatPhoneForDisplay = (phone, phoneCountry) => {
  const parsed = parsePhoneNumberFromString(phone.trim(), phoneCountry);
  return parsed?.isValid() ? parsed.formatInternational() : phone.trim();
};

const isAddressComplete = (address) =>
  Boolean(
    address.street.trim() &&
      address.city.trim() &&
      address.postalCode.trim() &&
      address.country.trim()
  );

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
  // Which numbering plan the phone field above is checked against (see
  // validateContact) — defaults to Slovakia since that's who most
  // shoppers here are, but is independent of the delivery `country` state
  // below: someone can live/have a phone in one country and still be
  // shipping the order somewhere else.
  const [phoneCountry, setPhoneCountry] = useState("SK");
  const [touched, setTouched] = useState({});
  // Becomes true the first time the shopper tries to move on from an
  // incomplete form — before that, no error/notice is shown (nobody's
  // failed anything yet). Once true, the review button attempt also marks
  // every contact field touched (see below) so ContactSection's per-field
  // errors light up immediately, and the shipping notice below the
  // Delivery section becomes visible for whatever it is that's missing.
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [shippingMethod, setShippingMethod] = useState(null);
  const [pickupPoint, setPickupPoint] = useState(null);
  // Only relevant when the cart has an oversized ("C") item — the beanbag
  // filling can't go through a pickup point, so it always ships
  // separately, straight to an address. See DeliverySection.
  const [fillingAddress, setFillingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  // Destination country for pricing purposes — drives the Packeta price
  // tier (see getPacketaPrice in data/shippingMethods.js). Defaults to
  // Slovakia.
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
  const handleFillingAddressChange = (field, value) =>
    setFillingAddress((a) => ({ ...a, [field]: value }));
  const handleConsentChange = (field, value) =>
    setConsents((c) => ({ ...c, [field]: value }));

  const contactErrors = validateContact(contact, phoneCountry, t);
  const isContactValid = Object.keys(contactErrors).length === 0;

  // Resolves each cart line to either a clothing product or a material
  // (see utils/cartItem.js) so the rest of this page doesn't care which
  // catalog an item came from.
  const itemsWithProducts = items
    .map((item) => ({ item, entry: resolveCartItem(item) }))
    .filter(({ entry }) => Boolean(entry));

  // Any oversized item (`big: "C"`, i.e. a tulivak beanbag) in the cart
  // triggers the special oversized-shipment handling: a flat price
  // (getOversizedShippingPrice) instead of the normal tiered Packeta
  // price, and a mandatory separate address for the filling, since that
  // can't go through a pickup point. Materials never carry `big`, so they
  // never trigger this.
  const hasBulkyItem = itemsWithProducts.some(
    ({ entry }) => entry.big === "C"
  );

  const selectedShipping = getShippingMethod(shippingMethod);
  const isShippingValid = (() => {
    if (!selectedShipping) return false;
    if (!pickupPoint) return false;
    // Oversized cover picked up at a Packeta point still needs somewhere
    // to send the filling.
    if (hasBulkyItem) return isAddressComplete(fillingAddress);
    return true;
  })();

  // Packeta's price depends on how many "B" (bigger, e.g. jackets) items
  // are in the cart plus the destination country — see getPacketaPrice.
  const packetaItems = itemsWithProducts.map(({ entry }) => ({
    big: entry.big,
    quantity: entry.quantity,
  }));
  const packetaPrice = getPacketaPrice(packetaItems, country);
  // Heavy enough that a real Packeta BOX (fixed compartment size)
  // realistically wouldn't fit it — hide box points, keep staffed pickup
  // points. See isCartTooBulkyForBox. An oversized "C" item rules out BOX
  // too, for a different reason (see DeliverySection), regardless of what
  // this weight score comes out to.
  const tooBulkyForBox = isCartTooBulkyForBox(packetaItems);

  // A previously chosen BOX point stops being valid the moment the cart
  // gets too bulky for it (e.g. adding a second jacket after already
  // picking a box) or gains an oversized item (a tulivak can't ship via
  // BOX at all).
  useEffect(() => {
    if ((tooBulkyForBox || hasBulkyItem) && pickupPoint?.kind === "box") {
      setPickupPoint(null);
    }
  }, [tooBulkyForBox, hasBulkyItem, pickupPoint]);

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
  // Normally the dynamic tier/country Packeta price — but as soon as the
  // cart has an oversized item, it's overridden by the oversized rate
  // instead (see getOversizedShippingPrice), which itself doubles once 2+
  // oversized units are in the cart.
  const oversizedPrice = getOversizedShippingPrice(packetaItems, country);
  const shippingPrice = !selectedShipping
    ? 0
    : hasBulkyItem
      ? oversizedPrice
      : packetaPrice;
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
            phoneCountry={phoneCountry}
            onPhoneCountryChange={setPhoneCountry}
          />

          <DeliverySection
            method={shippingMethod}
            onMethodChange={handleShippingMethodChange}
            pickupPoint={pickupPoint}
            onPickupPointChange={setPickupPoint}
            fillingAddress={fillingAddress}
            onFillingAddressChange={handleFillingAddressChange}
            bulky={hasBulkyItem}
            country={country}
            onCountryChange={setCountry}
            packetaPrice={packetaPrice}
            oversizedPrice={oversizedPrice}
            tooBulkyForBox={tooBulkyForBox}
          />

          {attemptedSubmit && !isShippingValid && (
            <p className="text-[11px] uppercase tracking-widest2 text-red-600 border border-red-600/40 p-3 leading-relaxed mb-4">
              {!selectedShipping || !pickupPoint
                ? t("checkout.errors.selectPickupPoint")
                : t("checkout.errors.fillingAddressRequired")}
            </p>
          )}

          <Button
            type="button"
            onClick={() => {
              if (isContactValid && isShippingValid) {
                setStep("review");
                return;
              }
              // Not ready yet — rather than just sitting there disabled
              // with no explanation, reveal exactly what's wrong: mark
              // every contact field touched so ContactSection's per-field
              // errors show up immediately, and flip on the shipping
              // notice above for whatever's missing there.
              setAttemptedSubmit(true);
              setTouched({ firstName: true, lastName: true, email: true, phone: true });
            }}
            className="w-full"
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
            <p className="text-[16px] uppercase tracking-widest2">
              {contact.firstName} {contact.lastName}
            </p>
            <p className="text-[14px] text-black/50 mt-1">{contact.email}</p>
            <p className="text-[14px] text-black/50">
              {formatPhoneForDisplay(contact.phone, phoneCountry)}
            </p>
          </div>

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest2 text-black/30 mb-3">
              {t("checkout.delivery")}
            </p>
            <p className="text-[16px] uppercase tracking-widest2">
              {selectedShipping ? pick(selectedShipping.name) : ""}
            </p>
            {pickupPoint && (
              <p className="text-[14px] text-black/50 mt-1">
                {pickupPoint.name}, {pickupPoint.address}, {pickupPoint.city}
              </p>
            )}
            {/* Oversized item: the cover goes to the pickup point above,
                but the filling ships separately — recap that address too
                so it isn't a surprise buried in the form. */}
            {hasBulkyItem && (
              <p className="text-[14px] text-black/50 mt-3">
                {t("checkout.fillingAddressTitle")}:{" "}
                {fillingAddress.street}, {fillingAddress.city}{" "}
                {fillingAddress.postalCode}, {fillingAddress.country}
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
              // PaymentSection/saveOrder/Stripe metadata get the E.164
              // form (e.g. "+421908836584") rather than the raw digits the
              // shopper typed — ContactSection itself still edits/displays
              // the raw `contact.phone`, this only swaps it in for what
              // actually gets submitted with the order.
              contact={{ ...contact, phone: toE164(contact.phone, phoneCountry) }}
              shippingMethod={shippingMethod}
              shippingLabel={selectedShipping ? pick(selectedShipping.name) : null}
              pickupPoint={pickupPoint}
              fillingAddress={hasBulkyItem ? fillingAddress : null}
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
