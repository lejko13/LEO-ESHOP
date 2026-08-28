// Loads and opens Packeta's real, official "Widget v6" pickup-point picker
// (https://docs.packeta.com/docs/pudo-delivery/widget) — this is Packeta's
// own hosted UI, not something we built, so the list of points, search, and
// map are all genuinely live/real once VITE_PACKETA_API_KEY is set (see
// src/config/packeta.js). No backend involved for this part: the widget
// talks to Packeta directly from the browser.

const WIDGET_SRC = "https://widget.packeta.com/v6/www/js/library.js";

let loadPromise = null;

const loadScript = () => {
  if (window.Packeta?.Widget) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Packeta widget script."));
    document.head.appendChild(script);
  });

  return loadPromise;
};

// Opens the official Packeta modal and resolves with the point the shopper
// picked, mapped onto this project's internal { id, name, address, city }
// shape (see data/shippingMethods.js) so the rest of the checkout doesn't
// need to know whether a point came from the widget or the mock fallback.
// Resolves with null if the shopper closes the widget without picking one.
export const openPacketaWidget = (apiKey, options = {}) =>
  loadScript().then(
    () =>
      new Promise((resolve) => {
        window.Packeta.Widget.pick(
          apiKey,
          (point) => {
            if (!point) {
              resolve(null);
              return;
            }
            resolve({
              id: point.id,
              name: point.name,
              address: point.street || point.name,
              city: point.city,
              // Kept for later use (e.g. passing to a real label-creation
              // API call once one exists) without forcing every consumer to
              // know Packeta's exact response shape.
              raw: point,
            });
          },
          options
        );
      })
  );
