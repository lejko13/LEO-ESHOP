// Feature flags — flip a boolean here to toggle features on/off across the app.
// No UI toggle on purpose: these are code-level switches.

// When true, the entire app is hidden behind a full-window signup gate on
// load — visitors can only submit their email; nothing else (shop, cart,
// pages) renders until they do. Purely client-side state, resets on reload.
export const SITE_GATE_ENABLED = true;
