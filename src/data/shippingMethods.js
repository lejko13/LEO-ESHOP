// Shipping methods available at checkout. Real carrier integrations aren't
// wired up yet — this module exists specifically so that shipping logic
// stays separate from Stripe/payment logic (Stripe only ever sees a final
// amount + optional metadata, never carrier details).
//
// Packeta is the only shipping method (GLS courier was removed — every
// order now goes out via a Packeta pickup point/BOX; an oversized item
// additionally needs a separate filling address, see below).
//
// TODO(Packeta API): replace mockPickupPoints with a real widget/API call
// (Packeta "Widget v6" or REST API) once API credentials are available.
// Keep the point shape as { id, name, address, city } so PickupPointPanel
// doesn't need to change.

export const shippingMethods = [
  {
    id: "packeta",
    name: { en: "Packeta", sk: "Packeta" },
    description: {
      en: "Pick up your parcel from a BOX or a partner store — choose which when picking your point.",
      sk: "Vyzdvihnite si zásielku z boxu alebo partnerskej predajne — vyberiete si pri výbere miesta.",
    },
    price: null, // dynamic, see getPacketaPrice / getOversizedShippingPrice
    // — kept null so a stale static price is never accidentally read.
    type: "pickupPoint",
    pointsKey: "packeta",
  },
];

// Mock data standing in for a real Packeta pickup-point picker. BOX and
// partner-store (pickup) points are shown together in one list — each
// point carries its own `kind` so PickupPointPanel can label it — since
// they now cost the same and the real Packeta "Widget v6" this eventually
// gets swapped for (see the TODO above) also shows both together in one
// map/list rather than as two separate flows. Nested per destination
// country so the country selector in DeliverySection.jsx actually changes
// which points show up, instead of always offering Slovak cities no
// matter what the shopper picked — this is still placeholder data.
export const mockPickupPoints = {
  packeta: {
    SK: [
      { id: "box-sk-1", kind: "box", name: "Packeta BOX Bratislava - Eurovea", address: "Pribinova 8", city: "Bratislava" },
      { id: "box-sk-2", kind: "box", name: "Packeta BOX Košice - Aupark", address: "Námestie Osloboditeľov 1", city: "Košice" },
      { id: "box-sk-3", kind: "box", name: "Packeta BOX Žilina - Mirage", address: "Národná 6", city: "Žilina" },
      { id: "pp-sk-1", kind: "pickup", name: "Packeta Point - Potraviny Jednota", address: "Hlavná 22", city: "Bratislava" },
      { id: "pp-sk-2", kind: "pickup", name: "Packeta Point - Trafika Novák", address: "Mlynská 5", city: "Košice" },
      { id: "pp-sk-3", kind: "pickup", name: "Packeta Point - Papiernictvo U Petra", address: "Sládkovičova 3", city: "Nitra" },
    ],
    CZ: [
      { id: "box-cz-1", kind: "box", name: "Packeta BOX Praha - Palladium", address: "Náměstí Republiky 1", city: "Praha" },
      { id: "box-cz-2", kind: "box", name: "Packeta BOX Brno - Vaňkovka", address: "Ve Vaňkovce 1", city: "Brno" },
      { id: "box-cz-3", kind: "box", name: "Packeta BOX Ostrava - Forum Nová Karolina", address: "Jantarová 3344", city: "Ostrava" },
      { id: "pp-cz-1", kind: "pickup", name: "Packeta Point - Trafika Dvořák", address: "Wenceslas Square 12", city: "Praha" },
      { id: "pp-cz-2", kind: "pickup", name: "Packeta Point - Papírnictví Novotný", address: "Česká 8", city: "Brno" },
      { id: "pp-cz-3", kind: "pickup", name: "Packeta Point - Smíšené zboží U Krále", address: "Nádražní 15", city: "Ostrava" },
    ],
  },
};

export const getShippingMethod = (id) =>
  shippingMethods.find((m) => m.id === id) ?? null;

// A product carries a `big` size class:
//   "A" - classic (bags, hoodies, tracksuits, pants, t-shirts)
//   "B" - bigger (jackets)
//   "C" - oversized (beanbags/tulivak) - the outer cover still goes out
//         via Packeta (see below), but the filling always ships
//         separately, straight to an address the shopper provides (see
//         fillingAddress in Checkout.jsx), since it can't go through a
//         pickup point at all. A BOX specifically still isn't realistic
//         for the cover, so the UI steers shoppers away from it
//         (DeliverySection.jsx's oversized notice) even though — unlike
//         the mock pickup-point list — the real Packeta widget can't be
//         filtered to hide BOX points outright.
// Checkout.jsx computes hasBulkyItem from cart contents (true whenever any
// item has big === "C") and both DeliverySection and the pricing below key
// off of it.
export const getAvailableShippingMethods = () => shippingMethods;

// --------------------------------------------------------------------------
// Cross-border Packeta pricing
// --------------------------------------------------------------------------
//
// Packeta BOX and Packeta Pickup Point share one price (rather than each
// keeping its own flat rate) that depends on:
//   1. how "heavy" the cart is (see WEIGHT_POINTS below) - this tiered
//      price only applies to a non-oversized cart; once any "C" item is
//      present, getOversizedShippingPrice below takes over instead
//      regardless of what this would have scored.
//   2. the destination country
//
// Weight scoring: each "A" item is worth 1 point, each "B" item (bigger,
// e.g. jackets) is worth 4 points. A single "B" item (4 points) or a
// basket of just a few "A" items both land in the light tier by
// themselves - the point system exists so a cart that's ONLY "A" items
// still gets bumped to a pricier tier once there are enough of them to
// realistically not fit a small box anymore, instead of shipping any
// quantity of light items for a flat 5 EUR forever.
//
// Tiers:
//   0-3 points   -> flat 5 EUR everywhere
//   4-7 points   -> SK 7 EUR, CZ 8 EUR
//   8-11 points  -> SK 8 EUR, CZ 10 EUR
//   12+ points   -> +3 EUR (both SK and CZ) for every additional full
//                   block of 4 points beyond 11 (12-15, 16-19, ...), so a
//                   much heavier/bulkier order keeps costing more instead
//                   of capping forever at the 8-11 price.
//
// Only Slovakia and Czechia are real, priced options - Packeta isn't
// actually wired up for Hungary/Romania (there's no real API integration
// yet at all, see the TODO above), so rather than quote a made-up price
// for a shipment that couldn't actually be created, DELIVERY_COUNTRIES
// includes an "OTHER" pseudo-option that DeliverySection.jsx renders as a
// "get in touch" message instead of a price - see OTHER_COUNTRY_CODE.

// ---------------------------------------------------------------------
// TEMPORARY TEST MODE — set back to false to restore real shipping prices.
// While true, getPacketaPrice and getOversizedShippingPrice both return
// 0.01 EUR regardless of cart contents/country, so the site owner can run
// real end-to-end Stripe test purchases cheaply. Flip SHIPPING_TEST_MODE
// to false (only that one line) to fully restore original pricing — none
// of the real tier/oversized logic below was touched.
// ---------------------------------------------------------------------
export const SHIPPING_TEST_MODE = true;

export const OTHER_COUNTRY_CODE = "OTHER";

export const DELIVERY_COUNTRIES = [
  { code: "SK", name: { en: "Slovakia", sk: "Slovensko" } },
  { code: "CZ", name: { en: "Czechia", sk: "Česko" } },
  { code: OTHER_COUNTRY_CODE, name: { en: "Other country", sk: "Iná krajina" } },
];

const WEIGHT_POINTS = { A: 1, B: 4 };

// `items` is any array of objects with `big` and `quantity` (e.g. the
// `entry` half of Checkout.jsx's itemsWithProducts).
const cartWeightScore = (items) =>
  items.reduce(
    (sum, item) => sum + (WEIGHT_POINTS[item.big] ?? 0) * (item.quantity ?? 1),
    0
  );

export const getPacketaPrice = (items = [], countryCode = "SK") => {
  if (SHIPPING_TEST_MODE) return 0.01;

  const score = cartWeightScore(items);

  if (score <= 3) return 5;

  if (score <= 7) return countryCode === "SK" ? 7 : 8;

  // 8+ points: base "8-11" tier, plus +3 EUR per extra full block of 4
  // points beyond 11 — e.g. 12-15 points is one block (+3), 16-19 is two
  // blocks (+6), and so on. Keeps the SK/CZ gap (currently 2 EUR) constant
  // at every step since both sides get the same +3 increment.
  const base = countryCode === "SK" ? 8 : 10;
  const extraBlocks = Math.floor((score - 8) / 4);
  return base + extraBlocks * 3;
};

// Rate for an order containing an oversized ("C") item (tulivak beanbag),
// charged instead of the normal tiered Packeta price above — the extra
// cost is for splitting the order into more packages (the filling always
// ships separately to an address, see fillingAddress in Checkout.jsx), not
// for a different carrier.
//
// A single "C" unit costs the flat base rate (SK 10 EUR / CZ 15 EUR). Two
// or more "C" units (e.g. two tulivaks, or one tulivak x2 quantity) double
// that rate (SK 20 EUR / CZ 30 EUR), since each extra unit needs its own
// separate filling shipment — it no longer stays flat regardless of how
// many oversized units are in the cart.
const cartOversizedCount = (items = []) =>
  items.reduce(
    (sum, item) => sum + (item.big === "C" ? (item.quantity ?? 1) : 0),
    0
  );

export const getOversizedShippingPrice = (items = [], countryCode = "SK") => {
  if (SHIPPING_TEST_MODE) return 0.01;

  const base = countryCode === "SK" ? 10 : 15;
  const count = cartOversizedCount(items);
  return count >= 2 ? base * 2 : base;
};

// A real Packeta BOX is a fixed-size compartment — fine for a handful of
// light items, but a cart heavy/bulky enough to land in the "4-7 points"
// tier or above (e.g. a single jacket, or a good handful of light items)
// realistically doesn't fit one. A staffed pickup point (Packeta Point,
// partner store) doesn't have that hard limit, so this only hides
// `kind: "box"` points, not Packeta as a whole — see DeliverySection.jsx.
// (An oversized "C" item also rules out BOX, for a different reason — the
// item itself, not cart weight — see DeliverySection.jsx's own
// hasBulkyItem-based filtering for that case.)
export const isCartTooBulkyForBox = (items = []) => cartWeightScore(items) > 3;
