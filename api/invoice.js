// Vercel Serverless Function — GET /api/invoice?orderId=<uuid>
//
// Re-generates the exact same PDF invoice that was emailed out when the
// order was placed (same generateInvoicePdf() as api/confirm-order.js) and
// streams it back for direct download from the /admin page. Nothing is
// stored/cached anywhere — it's rebuilt on demand straight from the saved
// order row, so it can never drift from what's in Supabase.
//
// Requires a valid Supabase Auth session (the same owner login /admin
// already uses) sent as `Authorization: Bearer <access_token>` — this
// endpoint uses the service_role key to read the order (bypassing RLS), so
// it must do its own check that the caller is a real logged-in user
// instead of relying on the table's RLS policy the way the client-side
// Supabase read in Admin.jsx does.
//
// Required env vars (same as api/confirm-order.js):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "@supabase/supabase-js";
import { generateInvoicePdf, buildInvoiceNumber } from "./_lib/invoice.js";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const isOrderStorageConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isOrderStorageConfigured) {
    return res.status(501).json({
      error:
        "Order storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel's Environment Variables.",
    });
  }

  const { orderId } = req.query || {};
  if (!orderId) {
    return res.status(400).json({ error: "orderId is required." });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Missing Authorization header." });
  }

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Confirm the token belongs to a real, currently-valid Supabase Auth
  // session — mirrors the `authenticated`-scoped RLS SELECT policy the
  // orders table already relies on for the client-side read in Admin.jsx.
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(
    token
  );
  if (userError || !userData?.user) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }

  try {
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return res.status(404).json({ error: "Order not found." });
    }

    const invoiceNumber =
      order.order_number != null
        ? buildInvoiceNumber(order.order_number, order.created_at)
        : null;

    if (!invoiceNumber) {
      return res.status(404).json({
        error: "This order has no invoice number (older order, before invoicing was added).",
      });
    }

    const pdfBuffer = await generateInvoicePdf({
      invoiceNumber,
      orderNumber: order.order_number,
      paymentIntentId: order.stripe_payment_intent_id,
      createdAt: order.created_at,
      contact: {
        firstName: order.first_name,
        lastName: order.last_name,
        email: order.email,
        phone: order.phone,
      },
      items: order.items || [],
      subtotal: order.subtotal,
      shippingPrice: order.shipping_price,
      total: order.total,
      currency: order.currency || "eur",
      pickupPoint: order.pickup_point,
      fillingAddress: order.filling_address,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Faktura-${invoiceNumber}.pdf"`
    );
    return res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error("Invoice regeneration error:", err);
    return res.status(500).json({ error: "Unable to generate invoice PDF." });
  }
}
