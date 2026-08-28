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

// Base URL of the backend that creates PaymentIntents — see /server. Point
// this at your deployed API in production; defaults to the local dev server.
export const STRIPE_API_URL =
  import.meta.env.VITE_STRIPE_API_URL || "http://localhost:4242";
