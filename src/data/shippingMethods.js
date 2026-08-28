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
    id: "packetaBox",
    name: { en: "Packeta BOX", sk: "Packeta BOX" },
    description: {
      en: "Pick up your parcel from a 24/7 automated box.",
      sk: "Vyzdvihnite si zásielku z automatizovaného boxu, dostupného 24/7.",
    },
    price: 2.99,
    type: "pickupPoint",
    pointsKey: "packetaBox",
  },
  {
    id: "packetaPickup",
    name: { en: "Packeta Pickup Point", sk: "Packeta výdajné miesto" },
    description: {
      en: "Pick up your parcel at a partner store near you.",
      sk: "Vyzdvihnite si zásielku na partnerskej predajni vo vašom okolí.",
    },
    price: 3.49,
    type: "pickupPoint",
    pointsKey: "packetaPickup",
  },
  {
    id: "gls",
    name: { en: "GLS Courier", sk: "GLS kuriér" },
    description: {
      en: "Delivered by courier straight to your address.",
      sk: "Doručenie kuriérom priamo na vašu adresu.",
    },
    price: 4.5,
    type: "address",
  },
];

// Mock data standing in for a real Packeta pickup-point picker. Same shape
// for both BOX and regular pickup points so PickupPointPanel can render
// either list without knowing which one it is.
export const mockPickupPoints = {
  packetaBox: [
    {
      id: "box-1",
      name: "Packeta BOX Bratislava - Eurovea",
      address: "Pribinova 8",
      city: "Bratislava",
    },
    {
      id: "box-2",
      name: "Packeta BOX Košice - Aupark",
      address: "Námestie Osloboditeľov 1",
      city: "Košice",
    },
    {
      id: "box-3",
      name: "Packeta BOX Žilina - Mirage",
      address: "Národná 6",
      city: "Žilina",
    },
  ],
  packetaPickup: [
    {
      id: "pp-1",
      name: "Packeta Point - Potraviny Jednota",
      address: "Hlavná 22",
      city: "Bratislava",
    },
    {
      id: "pp-2",
      name: "Packeta Point - Trafika Novák",
      address: "Mlynská 5",
      city: "Košice",
    },
    {
      id: "pp-3",
      name: "Packeta Point - Papiernictvo U Petra",
      address: "Sládkovičova 3",
      city: "Nitra",
    },
  ],
};

export const getShippingMethod = (id) =>
  shippingMethods.find((m) => m.id === id) ?? null;

// A product can carry `big: "A"` (oversized — too large for a pickup box
// or point, courier only) or `big: "B"` (normal, all methods available).
// When any cart item is flagged "A", only address-based delivery (GLS)
// should be offered. Checkout.jsx computes the flag from cart contents and
// passes it down; this helper just applies it to the method list so the
// rule lives in one place instead of being duplicated per component.
export const getAvailableShippingMethods = (restrictToAddressOnly) =>
  restrictToAddressOnly
    ? shippingMethods.filter((m) => m.type === "address")
    : shippingMethods;
