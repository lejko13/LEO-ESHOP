// Vercel Serverless Function — deploys automatically alongside the
// frontend on the same domain, no separate hosting needed (same pattern
// as api/send-email.js). Replaces the old standalone server/index.js
// version of this endpoint, which Vercel never actually ran (it's a plain
// Express app with app.listen(), and Vercel only auto-deploys files that
// live directly under /api).
//
// Called by the frontend (PaymentSection.jsx) to create a Stripe
// PaymentIntent right before the shopper enters payment details.
//
// Required env var (set in Vercel: Project -> Settings -> Environment
// Variables, Production scope — NOT prefixed with VITE_, so it never
// reaches the browser bundle):
//   STRIPE_SECRET_KEY
//
// Body:
// {
//   amount: number,   // in cents, e.g. 49.99 EUR = 4999
//   currency?: string,
//   metadata?: object
// }

import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!STRIPE_SECRET_KEY) {
    return res.status(501).json({
      error: "STRIPE_SECRET_KEY is not configured on the server.",
    });
  }

  const { amount, currency = "eur", metadata = {} } = req.body || {};

  if (!Number.isInteger(amount) || amount < 1) {
    return res.status(400).json({
      error: "A valid amount in cents is required.",
    });
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe PaymentIntent error:", error);

    return res.status(500).json({
      error: error.message || "Unable to create PaymentIntent.",
    });
  }
}
