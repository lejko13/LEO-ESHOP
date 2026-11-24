// Google Analytics 4 — consent-gated.
//
// Nothing here runs (no gtag.js download, no _ga cookies, no events) until
// the shopper presses "Accept" in the cookie bar (CookieConsent.jsx). A
// "Decline" — or withdrawing consent later via the footer's cookie
// settings link — turns tracking back off and deletes GA's cookies.
//
// Page views are NOT sent manually: GA4's "Enhanced measurement" (on by
// default in the GA4 web stream) picks up React Router's pushState
// navigations by itself. Only the e-commerce events below are sent by hand.
//
// The real gtag.js script is only loaded on the production domain, so local
// dev and Vercel preview deployments never pollute the live reports — on
// those hosts events are just logged to the console for debugging.

export const GA_MEASUREMENT_ID = "G-SBFTQ4KKHB";
export const CONSENT_STORAGE_KEY = "yzy-cookie-consent";
// Fired on window by the footer's "Cookie settings" link — CookieConsent
// listens for it and re-opens the bar so consent can be changed.
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

const PRODUCTION_HOSTS = ["leofudaly.com", "www.leofudaly.com"];
const CURRENCY = "EUR";

const isProductionHost = () =>
  typeof window !== "undefined" &&
  PRODUCTION_HOSTS.includes(window.location.hostname);

let initialized = false;
let enabled = false;

function gtag() {
  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the raw `arguments` object, not an array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export const getStoredConsent = () => {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
};

const loadGoogleAnalytics = () => {
  if (initialized) return;
  initialized = true;

  // Ads-related storage stays denied — this site only does analytics.
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  if (!isProductionHost()) {
    console.info(
      `[analytics] consent accepted — not loading gtag.js on "${window.location.hostname}" (production only)`
    );
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

// Removes _ga / _ga_<id> cookies from both the exact host and the parent
// domain (GA sets them on ".leofudaly.com").
const clearGoogleAnalyticsCookies = () => {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ""
      }`;
    });
  });
};

// Called by CookieConsent whenever the shopper decides ("accepted" or
// "declined").
export const applyConsent = (value) => {
  if (value === "accepted") {
    enabled = true;
    loadGoogleAnalytics();
    gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  enabled = false;
  if (initialized) gtag("consent", "update", { analytics_storage: "denied" });
  clearGoogleAnalyticsCookies();
};

// Called once on app start (main.jsx) — resumes tracking for returning
// visitors who already accepted.
export const initAnalytics = () => {
  if (getStoredConsent() === "accepted") applyConsent("accepted");
};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
};

const trackEvent = (name, params) => {
  if (!enabled) return;
  gtag("event", name, params);
  if (!isProductionHost()) console.info(`[analytics] ${name}`, params);
};

// --- E-commerce -----------------------------------------------------------
// All helpers take entries in the shape returned by resolveCartItem()
// (utils/cartItem.js), so products and materials are handled the same way.

const round2 = (n) => Math.round(n * 100) / 100;

const toGaItem = (entry) => ({
  item_id: entry.code ?? entry.id,
  // Always the Slovak name, so reports don't split one product into two
  // rows depending on which language the shopper had selected.
  item_name: entry.name?.sk ?? entry.name?.en ?? String(entry.name),
  item_category: entry.category ?? entry.kind,
  item_variant: [entry.color, entry.size].filter(Boolean).join(" / ") || undefined,
  price: entry.unitPrice,
  quantity: entry.quantity,
});

const itemsPayload = (entries) => {
  const valid = entries.filter(Boolean);
  return {
    currency: CURRENCY,
    value: round2(valid.reduce((sum, e) => sum + e.lineTotal, 0)),
    items: valid.map(toGaItem),
  };
};

export const trackViewItem = (entry) => {
  if (entry) trackEvent("view_item", itemsPayload([entry]));
};

export const trackAddToCart = (entry) => {
  if (entry) trackEvent("add_to_cart", itemsPayload([entry]));
};

export const trackRemoveFromCart = (entry) => {
  if (entry) trackEvent("remove_from_cart", itemsPayload([entry]));
};

export const trackViewCart = (entries) => {
  if (entries.length) trackEvent("view_cart", itemsPayload(entries));
};

export const trackBeginCheckout = (entries) => {
  if (entries.length) trackEvent("begin_checkout", itemsPayload(entries));
};

export const trackPurchase = ({ transactionId, entries, total, shipping }) => {
  trackEvent("purchase", {
    ...itemsPayload(entries),
    transaction_id: transactionId,
    value: round2(total),
    shipping: round2(shipping),
  });
};
