// Shipping methods available at checkout. Real carrier integrations aren't
// wired up yet — this module exists specifically so that shipping logic
// stays separate from Stripe/payment logic (Stripe only ever sees a final
// amount + optional metadata, never carrier details).
//
// TODO(Packeta API): replace mockPickupPoints with a real widget/API call
// (Packeta "Widget v6" or REST API) once API credentials are available.
// Keep the point shape as { id, name, address, city } so PickupPointPanel
// doesn't need to change.
//
// TODO(GLS API): if GLS offers address validation/autocomplete, wire it
// into the street/city/postalCode/country fields in DeliverySection.jsx.

export const shippingMethods = [
  {
    id: "packeta",
    name: { en: "Packeta", sk: "Packeta" },
    description: {
      en: "Pick up your parcel from a BOX or a partner store — choose which when picking your point.",
      sk: "Vyzdvihnite si zásielku z boxu alebo partnerskej predajne — vyberiete si pri výbere miesta.",
    },
    price: null, // dynamic, see getPacketaPrice — kept null so a stale
    // static price is never accidentally read for this method.
    type: "pickupPoint",
    pointsKey: "packeta",
  },
  {
    id: "gls",
    name: { en: "GLS Courier", sk: "GLS kuriér" },
    description: {
      en: "Delivered by courier straight to your address.",
      sk: "Doručenie kuriérom priamo na vašu adresu.",
    },
    price: null, // dynamic, see getGlsPrice — kept null so a stale static
    // price is never accidentally read for this method.
    type: "address",
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
//   "C" - oversized (beanbags) - too large for a pickup box or point,
//         courier (GLS) only.
// When any cart item is flagged "C", only address-based delivery (GLS)
// should be offered. Checkout.jsx computes the flag from cart contents and
// passes it down; this helper just applies it to the method list so the
// rule lives in one place instead of being duplicated per component.
export const getAvailableShippingMethods = (restrictToAddressOnly) =>
  restrictToAddressOnly
    ? shippingMethods.filter((m) => m.type === "address")
    : shippingMethods;

// --------------------------------------------------------------------------
// Cross-border Packeta pricing
// --------------------------------------------------------------------------
//
// Packeta BOX and Packeta Pickup Point share one price (rather than each
// keeping its own flat rate) that depends on:
//   1. how "heavy" the cart is (see WEIGHT_POINTS below) - "C" (oversized)
//      items aren't offered Packeta at all (GLS only, see
//      restrictToAddressOnly above; pricing for that case is still
//      undecided on purpose)
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
// Tiers (matches the original spec exactly at the two reference points -
// exactly one "B" alone = 4pts = tier 2; two "B" alone = 8pts = tier 3):
//   0-3 points  -> flat 5 EUR everywhere
//   4-7 points  -> SK 5 EUR, CZ 7 EUR
//   8+ points   -> SK 8 EUR, CZ 10 EUR
//
// GLS is a flat rate per destination country (not weight-tiered like
// Packeta) - see getGlsPrice below. This also covers oversized ("C") items,
// which are GLS-only.
//
// Only Slovakia and Czechia are real, priced options - Packeta/GLS aren't
// actually wired up for Hungary/Romania (there's no real API integration
// yet at all, see the TODOs above), so rather than quote a made-up price
// for a shipment that couldn't actually be created, DELIVERY_COUNTRIES
// includes an "OTHER" pseudo-option that DeliverySection.jsx renders as a
// "get in touch" message instead of a price - see OTHER_COUNTRY_CODE.

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
  const score = cartWeightScore(items);

  if (score <= 3) return 5;

  if (score <= 7) return countryCode === "SK" ? 5 : 7;

  // 8+ points.
  return countryCode === "SK" ? 8 : 10;
};

// GLS courier price by destination country - flat rate, doesn't depend on
// cart weight/size (unlike Packeta). Covers oversized ("C") items too,
// since GLS is the only option offered for those.
export const getGlsPrice = (countryCode = "SK") =>
  countryCode === "SK" ? 15 : 25;

// A real Packeta BOX is a fixed-size compartment — fine for a handful of
// light items, but a cart heavy/bulky enough to land in the top price tier
// (8+ weight points — e.g. two or more jackets) realistically doesn't fit
// one. A staffed pickup point (Packeta Point, partner store) doesn't have
// that hard limit, so this only hides `kind: "box"` points, not Packeta
// as a whole — see DeliverySection.jsx.
export const isCartTooBulkyForBox = (items = []) => cartWeightScore(items) > 7;
