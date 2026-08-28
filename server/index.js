// Minimal backend that creates Stripe PaymentIntents on demand for the
// storefront's /checkout page.
//
// IMPORTANT:
// Secret keys must exist ONLY in server/.env
// Never hardcode real secret keys in this file.

import "dotenv/config";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const PORT = process.env.PORT || 4242;

// --------------------------------------------------------------------------
// Environment variables
// --------------------------------------------------------------------------

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY. Add it to server/.env before starting the server."
  );
}

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const isOrderStorageConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
);

// --------------------------------------------------------------------------
// Stripe
// --------------------------------------------------------------------------

const stripe = new Stripe(STRIPE_SECRET_KEY);

// --------------------------------------------------------------------------
// Supabase
// --------------------------------------------------------------------------

const supabaseAdmin = isOrderStorageConfigured
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

// --------------------------------------------------------------------------
// Express
// --------------------------------------------------------------------------

const app = express();

app.use(cors());
app.use(express.json());

// --------------------------------------------------------------------------
// Create Stripe PaymentIntent
// --------------------------------------------------------------------------
//
// Body:
// {
//   amount: number,
//   currency?: string,
//   metadata?: object
// }
//
// amount is in cents.
// Example: 49.99 EUR = 4999
//

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "eur", metadata = {} } = req.body;

    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({
        error: "A valid amount in cents is required.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe PaymentIntent error:", error);

    return res.status(500).json({
      error: error.message || "Unable to create PaymentIntent.",
    });
  }
});

// --------------------------------------------------------------------------
// Confirm order
// --------------------------------------------------------------------------
//
// Called after Stripe payment succeeds.
//
// The backend checks Stripe directly before saving the order into Supabase.
//

app.post("/confirm-order", async (req, res) => {
  if (!isOrderStorageConfigured || !supabaseAdmin) {
    return res.status(501).json({
      error:
        "Order storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to server/.env.",
    });
  }

  const {
    paymentIntentId,
    contact = {},
    shippingMethod,
    shippingLabel,
    pickupPoint,
    glsAddress,
    orderNote,
    items = [],
    subtotal,
    shippingPrice,
    total,
    currency = "eur",
  } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({
      error: "paymentIntentId is required.",
    });
  }

  try {
    // Verify payment directly with Stripe.
    const paymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        error: "Payment has not succeeded.",
      });
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .upsert(
        {
          stripe_payment_intent_id: paymentIntentId,
          status: paymentIntent.status,

          first_name: contact.firstName ?? null,
          last_name: contact.lastName ?? null,
          email: contact.email ?? null,
          phone: contact.phone ?? null,

          shipping_method: shippingMethod ?? null,
          shipping_label: shippingLabel ?? null,
          pickup_point: pickupPoint ?? null,
          gls_address: glsAddress ?? null,

          items,
          order_note: orderNote ?? null,

          subtotal: subtotal ?? null,
          shipping_price: shippingPrice ?? null,
          total: total ?? null,
          currency,
        },
        {
          onConflict: "stripe_payment_intent_id",
        }
      );

    if (error) {
      throw error;
    }

    return res.json({
      ok: true,
    });
  } catch (error) {
    console.error("Order confirmation error:", error);

    return res.status(500).json({
      error: error.message || "Unable to save order.",
    });
  }
});

// --------------------------------------------------------------------------
// Packeta shipment creation
// --------------------------------------------------------------------------
//
// Requires:
// PACKETA_API_PASSWORD
// PACKETA_SENDER_LABEL
//
// Real Packeta API integration can be added later.
//

app.post("/create-packeta-shipment", async (req, res) => {
  const PACKETA_API_PASSWORD = process.env.PACKETA_API_PASSWORD;
  const PACKETA_SENDER_LABEL = process.env.PACKETA_SENDER_LABEL;

  if (!PACKETA_API_PASSWORD || !PACKETA_SENDER_LABEL) {
    return res.status(501).json({
      error:
        "Packeta is not configured. Add PACKETA_API_PASSWORD and PACKETA_SENDER_LABEL to server/.env.",
    });
  }

  return res.status(501).json({
    error: "Packeta shipment creation is not implemented yet.",
  });
});

// --------------------------------------------------------------------------
// GLS shipment creation
// --------------------------------------------------------------------------
//
// Requires:
// GLS_API_USERNAME
// GLS_API_PASSWORD
// GLS_CLIENT_ID
//

app.post("/create-gls-shipment", async (req, res) => {
  const GLS_API_USERNAME = process.env.GLS_API_USERNAME;
  const GLS_API_PASSWORD = process.env.GLS_API_PASSWORD;
  const GLS_CLIENT_ID = process.env.GLS_CLIENT_ID;

  if (!GLS_API_USERNAME || !GLS_API_PASSWORD || !GLS_CLIENT_ID) {
    return res.status(501).json({
      error:
        "GLS is not configured. Add GLS_API_USERNAME, GLS_API_PASSWORD and GLS_CLIENT_ID to server/.env.",
    });
  }

  return res.status(501).json({
    error: "GLS shipment creation is not implemented yet.",
  });
});

// --------------------------------------------------------------------------
// Health check
// --------------------------------------------------------------------------

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    message: "LEO ESHOP backend is running.",
  });
});

// --------------------------------------------------------------------------
// Start server
// --------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});