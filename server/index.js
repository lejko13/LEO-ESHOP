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

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const isEmailConfigured = Boolean(RESEND_API_KEY);

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
// Order emails (Resend) — best-effort, sent after an order is saved.
// Mirrors the look of /api/send-email.js (white background, black text,
// LEO FUDALY wordmark, dark-mode-proofed) so every email from the site
// looks the same regardless of which backend sent it.
// --------------------------------------------------------------------------

const EMAIL_FROM = "LEO FUDALY <hello@leofudaly.com>";
const OWNER_EMAIL = "leo.fudaly@gmail.com";

const emailShell = (bodyHtml) => `
<!DOCTYPE html>
<html lang="sk">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <style>
      :root { color-scheme: light; supported-color-schemes: light; }
      body, table, td { background-color: #ffffff !important; }
      .lf-text, .lf-heading { color: #000000 !important; }
      .lf-muted { color: #999999 !important; }
      @media (prefers-color-scheme: dark) {
        body, table, td { background-color: #ffffff !important; }
        .lf-text, .lf-heading { color: #000000 !important; }
        .lf-muted { color: #999999 !important; }
      }
      [data-ogsc] body, [data-ogsc] table, [data-ogsc] td { background-color: #ffffff !important; }
      [data-ogsc] .lf-text, [data-ogsc] .lf-heading { color: #000000 !important; }
      [data-ogsc] .lf-muted { color: #999999 !important; }
    </style>
  </head>
  <body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="background-color:#ffffff;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="background-color:#ffffff;max-width:480px;width:100%;">
            <tr>
              <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 0 20px;border-bottom:1px solid #000000;text-align:center;">
                <span class="lf-heading" style="font-size:13px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#000000;">LEO FUDALY</span>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" style="background-color:#ffffff;padding:32px 4px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" style="background-color:#ffffff;padding:20px 4px 0;border-top:1px solid #e5e5e5;text-align:center;">
                <a href="https://www.leofudaly.com" class="lf-muted" style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#999999;text-decoration:none;">leofudaly.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const paragraph = (text) =>
  `<p class="lf-text" style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#000000;">${text}</p>`;

const label = (text) =>
  `<p class="lf-muted" style="margin:0 0 4px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#999999;">${text}</p>`;

const itemName = (item) =>
  escapeHtml(item?.name?.sk || item?.name?.en || item?.name || item?.code || "Položka");

const formatMoney = (amount, currency = "eur") =>
  `${Number(amount ?? 0).toFixed(2)} ${String(currency).toUpperCase() === "EUR" ? "€" : currency.toUpperCase()}`;

function orderItemsTable(items = [], currency = "eur") {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:12px;color:#000000;">
            ${itemName(item)}
            <br/>
            <span style="font-size:10px;color:#999999;">
              ${item.size ? `${escapeHtml(item.size)}` : ""}${item.size && item.color ? " · " : ""}${item.color ? escapeHtml(item.color) : ""}${item.quantity ? ` × ${item.quantity}` : ""}
            </span>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:12px;color:#000000;text-align:right;white-space:nowrap;">
            ${formatMoney(item.lineTotal ?? item.unitPrice, item.currency || currency)}
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 16px;">
      ${rows}
    </table>
  `;
}

function orderTotalsTable({ subtotal, shippingPrice, total, currency }) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      <tr>
        <td style="padding:2px 0;font-size:11px;color:#999999;">Medzisúčet</td>
        <td style="padding:2px 0;font-size:11px;color:#999999;text-align:right;">${formatMoney(subtotal, currency)}</td>
      </tr>
      <tr>
        <td style="padding:2px 0;font-size:11px;color:#999999;">Doprava</td>
        <td style="padding:2px 0;font-size:11px;color:#999999;text-align:right;">${formatMoney(shippingPrice, currency)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0 0;font-size:13px;font-weight:bold;color:#000000;">Spolu</td>
        <td style="padding:8px 0 0;font-size:13px;font-weight:bold;color:#000000;text-align:right;">${formatMoney(total, currency)}</td>
      </tr>
    </table>
  `;
}

function shippingBlock({ shippingLabel, pickupPoint, glsAddress }) {
  const addressLine = pickupPoint
    ? `${pickupPoint.name}, ${pickupPoint.address}, ${pickupPoint.city}`
    : glsAddress
      ? `${glsAddress.street}, ${glsAddress.city} ${glsAddress.postalCode}, ${glsAddress.country}`
      : "";

  return `
    ${label("Doprava")}
    ${paragraph(escapeHtml(shippingLabel || "-"))}
    ${addressLine ? `${label("Adresa / miesto vyzdvihnutia")}${paragraph(escapeHtml(addressLine))}` : ""}
  `;
}

function orderNotificationHtml({ contact = {}, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, glsAddress, orderNote, paymentIntentId }) {
  return emailShell(`
    ${label("Nová objednávka")}
    <p class="lf-heading" style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#000000;">${escapeHtml(`${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim() || "Zákazník")}</p>
    ${label("Kontakt")}
    ${paragraph(`${escapeHtml(contact.email ?? "-")}${contact.phone ? `<br/>${escapeHtml(contact.phone)}` : ""}`)}
    ${label("Položky")}
    ${orderItemsTable(items, currency)}
    ${orderTotalsTable({ subtotal, shippingPrice, total, currency })}
    ${shippingBlock({ shippingLabel, pickupPoint, glsAddress })}
    ${orderNote ? `${label("Poznámka k objednávke")}${paragraph(escapeHtml(orderNote))}` : ""}
    ${label("Stripe platba")}
    ${paragraph(escapeHtml(paymentIntentId ?? "-"))}
  `);
}

function orderConfirmationHtml({ contact = {}, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, glsAddress }) {
  return emailShell(`
    ${label("Ďakujeme za objednávku")}
    <p class="lf-heading" style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#000000;">Dobrý deň${contact.firstName ? `, ${escapeHtml(contact.firstName)}` : ""}.</p>
    ${paragraph("Vaša platba prebehla úspešne a objednávku už spracovávame.")}
    ${label("Položky")}
    ${orderItemsTable(items, currency)}
    ${orderTotalsTable({ subtotal, shippingPrice, total, currency })}
    ${shippingBlock({ shippingLabel, pickupPoint, glsAddress })}
  `);
}

async function sendResendEmail({ to, subject, html, replyTo }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Resend error (${res.status}): ${errorBody}`);
  }
}

async function sendOrderEmails({ paymentIntentId, contact, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, glsAddress, orderNote }) {
  if (!isEmailConfigured) return;

  const payload = { contact, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, glsAddress };

  await Promise.all([
    sendResendEmail({
      to: OWNER_EMAIL,
      subject: `Nová objednávka — ${formatMoney(total, currency)}`,
      html: orderNotificationHtml({ ...payload, orderNote, paymentIntentId }),
      replyTo: contact?.email,
    }),
    contact?.email
      ? sendResendEmail({
          to: contact.email,
          subject: "Potvrdenie objednávky — LEO FUDALY",
          html: orderConfirmationHtml(payload),
          replyTo: OWNER_EMAIL,
        })
      : Promise.resolve(),
  ]);
}

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

    // Best-effort — a failed email should never undo the fact that the
    // order was already saved successfully above, so this is deliberately
    // outside the try/catch that would turn it into a 500 response.
    sendOrderEmails({
      paymentIntentId,
      contact,
      items,
      subtotal,
      shippingPrice,
      total,
      currency,
      shippingLabel,
      pickupPoint,
      glsAddress,
      orderNote,
    }).catch((err) => {
      console.error("Order email error:", err);
    });

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