// Vercel Serverless Function — placeholder, mirrors the same stub that
// used to live in server/index.js. Packeta shipment/label creation needs
// a real business contract with Packeta (not just the free widget API key
// used for the pickup-point picker) — this just reports clearly that it
// isn't wired up yet instead of 404ing silently.
//
// Once real Packeta API credentials exist, set these in Vercel:
//   PACKETA_API_PASSWORD
//   PACKETA_SENDER_LABEL
// and replace the body below with the real API call.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const PACKETA_API_PASSWORD = process.env.PACKETA_API_PASSWORD;
  const PACKETA_SENDER_LABEL = process.env.PACKETA_SENDER_LABEL;

  if (!PACKETA_API_PASSWORD || !PACKETA_SENDER_LABEL) {
    return res.status(501).json({
      error:
        "Packeta is not configured. Add PACKETA_API_PASSWORD and PACKETA_SENDER_LABEL in Vercel's Environment Variables.",
    });
  }

  return res.status(501).json({
    error: "Packeta shipment creation is not implemented yet.",
  });
}
