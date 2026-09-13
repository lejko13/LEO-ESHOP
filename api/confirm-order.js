// Vercel Serverless Function — deploys automatically alongside the
// frontend on the same domain, no separate hosting needed (same pattern
// as api/send-email.js). Replaces the old standalone server/index.js
// version of this endpoint, which Vercel never actually ran (it's a plain
// Express app with app.listen(), and Vercel only auto-deploys files that
// live directly under /api).
//
// Called by the frontend (PaymentSection.jsx) right after Stripe confirms
// the payment succeeded. The backend independently re-checks the payment
// with Stripe before saving the order into Supabase — never trusts the
// frontend's word alone that a payment went through.
//
// Required env vars (set in Vercel: Project -> Settings -> Environment
// Variables, Production scope — none prefixed with VITE_, so none of
// these ever reach the browser bundle):
//   STRIPE_SECRET_KEY
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY   (optional — order emails are best-effort; omitting
//                      this just means no confirmation emails go out)

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { generateInvoicePdf, buildInvoiceNumber } from "./_lib/invoice.js";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const isOrderStorageConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
);
const isEmailConfigured = Boolean(RESEND_API_KEY);

// --------------------------------------------------------------------------
// Order emails (Resend) — best-effort, sent after an order is saved.
// Mirrors the look of api/send-email.js (white background, black text,
// LEO FUDALY wordmark, dark-mode-proofed) so every email from the site
// looks the same regardless of which endpoint sent it.
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

function shippingBlock({ shippingLabel, pickupPoint, fillingAddress }) {
  const addressLine = pickupPoint
    ? `${pickupPoint.name}, ${pickupPoint.address}, ${pickupPoint.city}`
    : "";
  const fillingLine = fillingAddress
    ? `${fillingAddress.street}, ${fillingAddress.city} ${fillingAddress.postalCode}, ${fillingAddress.country}`
    : "";

  return `
    ${label("Doprava")}
    ${paragraph(escapeHtml(shippingLabel || "-"))}
    ${addressLine ? `${label("Adresa / miesto vyzdvihnutia")}${paragraph(escapeHtml(addressLine))}` : ""}
    ${fillingLine ? `${label("Adresa pre doručenie výplne")}${paragraph(escapeHtml(fillingLine))}` : ""}
  `;
}

function orderNotificationHtml({ contact = {}, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, fillingAddress, orderNote, paymentIntentId, orderNumber, invoiceNumber }) {
  return emailShell(`
    ${label("Nová objednávka")}
    <p class="lf-heading" style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#000000;">${escapeHtml(`${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim() || "Zákazník")}</p>
    <p class="lf-muted" style="margin:0 0 20px;font-size:11px;color:#999999;">Objednávka č. ${escapeHtml(String(orderNumber ?? "-"))}${invoiceNumber ? ` · Faktúra č. ${escapeHtml(invoiceNumber)}` : ""}</p>
    ${label("Kontakt")}
    ${paragraph(`${escapeHtml(contact.email ?? "-")}${contact.phone ? `<br/>${escapeHtml(contact.phone)}` : ""}`)}
    ${label("Položky")}
    ${orderItemsTable(items, currency)}
    ${orderTotalsTable({ subtotal, shippingPrice, total, currency })}
    ${shippingBlock({ shippingLabel, pickupPoint, fillingAddress })}
    ${orderNote ? `${label("Poznámka k objednávke")}${paragraph(escapeHtml(orderNote))}` : ""}
    ${label("Stripe platba")}
    ${paragraph(escapeHtml(paymentIntentId ?? "-"))}
  `);
}

function orderConfirmationHtml({ contact = {}, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, fillingAddress, orderNumber, invoiceNumber }) {
  return emailShell(`
    ${label("Ďakujeme za objednávku")}
    <p class="lf-heading" style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#000000;">Dobrý deň${contact.firstName ? `, ${escapeHtml(contact.firstName)}` : ""}.</p>
    <p class="lf-muted" style="margin:0 0 20px;font-size:11px;color:#999999;">Objednávka č. ${escapeHtml(String(orderNumber ?? "-"))}${invoiceNumber ? ` · Faktúra č. ${escapeHtml(invoiceNumber)} (v prílohe)` : ""}</p>
    ${paragraph("Vaša platba prebehla úspešne a objednávku už spracovávame.")}
    ${label("Položky")}
    ${orderItemsTable(items, currency)}
    ${orderTotalsTable({ subtotal, shippingPrice, total, currency })}
    ${shippingBlock({ shippingLabel, pickupPoint, fillingAddress })}
  `);
}

async function sendResendEmail({ to, subject, html, replyTo, attachments }) {
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
      ...(attachments ? { attachments } : {}),
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Resend error (${res.status}): ${errorBody}`);
  }
}

async function sendOrderEmails({ paymentIntentId, contact, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, fillingAddress, orderNote, orderNumber, invoiceNumber, createdAt }) {
  if (!isEmailConfigured) return;

  const payload = { contact, items, subtotal, shippingPrice, total, currency, shippingLabel, pickupPoint, fillingAddress };

  // Invoice PDF — attached to both emails when we have a real order number
  // to build the invoice number from (i.e. once the `order_number` column
  // exists in Supabase; see the migration note in the handler below).
  let attachments;
  if (invoiceNumber) {
    try {
      const pdfBuffer = await generateInvoicePdf({
        invoiceNumber,
        orderNumber,
        paymentIntentId,
        createdAt,
        contact,
        items,
        subtotal,
        shippingPrice,
        total,
        currency,
        pickupPoint,
        fillingAddress,
      });
      attachments = [
        {
          filename: `Faktura-${invoiceNumber}.pdf`,
          content: pdfBuffer.toString("base64"),
        },
      ];
    } catch (err) {
      console.error("Invoice PDF generation error:", err);
    }
  }

  await Promise.all([
    sendResendEmail({
      to: OWNER_EMAIL,
      subject: `Nová objednávka č. ${orderNumber ?? "-"} — ${formatMoney(total, currency)}`,
      html: orderNotificationHtml({ ...payload, orderNote, paymentIntentId, orderNumber, invoiceNumber }),
      replyTo: contact?.email,
      attachments,
    }),
    contact?.email
      ? sendResendEmail({
          to: contact.email,
          subject: `Potvrdenie objednávky č. ${orderNumber ?? "-"} — LEO FUDALY`,
          html: orderConfirmationHtml({ ...payload, orderNumber, invoiceNumber }),
          replyTo: OWNER_EMAIL,
          attachments,
        })
      : Promise.resolve(),
  ]);
}

// --------------------------------------------------------------------------
// Handler
// --------------------------------------------------------------------------

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!STRIPE_SECRET_KEY) {
    return res.status(501).json({
      error: "STRIPE_SECRET_KEY is not configured on the server.",
    });
  }

  if (!isOrderStorageConfigured) {
    return res.status(501).json({
      error:
        "Order storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel's Environment Variables.",
    });
  }

  const {
    paymentIntentId,
    contact = {},
    shippingMethod,
    shippingLabel,
    pickupPoint,
    fillingAddress,
    orderNote,
    items = [],
    subtotal,
    shippingPrice,
    total,
    currency = "eur",
  } = req.body || {};

  if (!paymentIntentId) {
    return res.status(400).json({
      error: "paymentIntentId is required.",
    });
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Verify payment directly with Stripe — never trust the frontend's
    // word alone that a payment went through.
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        error: "Payment has not succeeded.",
      });
    }

    const { data: savedOrder, error } = await supabaseAdmin
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
          filling_address: fillingAddress ?? null,

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
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    // `order_number` is a bigserial column added via a one-time migration
    // (see README note) — it's a real, sequential, ever-increasing counter
    // from Supabase, used both as the human-facing order number and as the
    // basis for the invoice number. Older databases without that column
    // simply fall back to no invoice number / no PDF attachment below,
    // rather than failing the whole order confirmation.
    const orderNumber = savedOrder?.order_number ?? null;
    const invoiceNumber =
      orderNumber != null ? buildInvoiceNumber(orderNumber, savedOrder?.created_at) : null;

    // Best-effort — a failed email should never undo the fact that the
    // order was already saved successfully above. IMPORTANT: this must be
    // awaited. Vercel freezes a serverless function's execution as soon as
    // the response is sent, so a fire-and-forget call here would get its
    // in-flight Resend request cut off mid-air (intermittently, depending
    // on timing) instead of ever completing.
    try {
      await sendOrderEmails({
        paymentIntentId,
        contact,
        items,
        subtotal,
        shippingPrice,
        total,
        currency,
        shippingLabel,
        pickupPoint,
        fillingAddress,
        orderNote,
        orderNumber,
        invoiceNumber,
        createdAt: savedOrder?.created_at,
      });
    } catch (err) {
      console.error("Order email error:", err);
    }

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error("Order confirmation error:", error);

    return res.status(500).json({
      error: error.message || "Unable to save order.",
    });
  }
}
