// Replace with your own Stripe PUBLISHABLE key (starts with pk_test_ or
// pk_live_) from https://dashboard.stripe.com/apikeys. This key is safe to
// ship in frontend code — on its own it can only initialize Stripe.js and
// collect payment details, never move money.
//
// Set it via VITE_STRIPE_PUBLISHABLE_KEY in a root .env file (copy
// .env.example) — Vite only exposes env vars prefixed with VITE_ to the
// browser (this project uses Vite, not Next.js, so NEXT_PUBLIC_ won't work).
export const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_51FICTIONALxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// Base URL of the backend that creates PaymentIntents.
//
// In production (Vercel), the backend now lives at /api/create-payment-intent
// and /api/confirm-order — plain Vercel Serverless Functions on the SAME
// domain as the frontend (see api/create-payment-intent.js and
// api/confirm-order.js), the same way api/send-email.js already works. So
// in production leave VITE_STRIPE_API_URL unset entirely: this then
// defaults to "" (empty string), which makes PaymentSection.jsx's
// `${STRIPE_API_URL}/create-payment-intent` resolve to the relative path
// "/create-payment-intent" on whatever domain the page is served from —
// exactly what's needed, no separate hosting required.
//
// For local development only: `npm run dev` runs Vite's dev server, which
// does NOT run /api functions (those only run under `vercel dev`, or once
// deployed). The old standalone server/index.js (a separate Express app,
// started with `node server/index.js` from the /server folder) still
// works for local testing — if you use it, set VITE_STRIPE_API_URL in your
// local .env to "http://localhost:4242" to point at it.
export const STRIPE_API_URL = import.meta.env.VITE_STRIPE_API_URL || "";
