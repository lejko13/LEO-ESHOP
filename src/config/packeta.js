// Packeta's pickup-point picker ("Widget v6") is a free, public widget —
// unlike shipment/label creation, it only needs an API KEY (not a full
// carrier contract), and you can get one for free by registering at
// https://client.packeta.com/ (User support -> API password). See
// src/utils/packetaWidget.js for how it's loaded and opened.
//
// Set VITE_PACKETA_API_KEY in .env to enable it. Without it, checkout falls
// back to the placeholder pickup-point list (src/data/shippingMethods.js)
// so the UI keeps working during development.
export const PACKETA_API_KEY = import.meta.env.VITE_PACKETA_API_KEY || "";
export const PACKETA_WIDGET_ENABLED = Boolean(PACKETA_API_KEY);
