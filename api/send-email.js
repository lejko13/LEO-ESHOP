// Vercel Serverless Function — deploys automatically alongside the frontend,
// no separate hosting needed. Runs on Vercel's server, so RESEND_API_KEY
// stays secret (never shipped to the browser, unlike VITE_-prefixed vars).
//
// Called by the frontend (ContactForm.jsx, GateOverlay.jsx) as a
// best-effort side effect AFTER the Supabase insert already succeeded —
// if this fails, the form submission itself has still worked; the person
// just doesn't get an email.
//
// Required env var (set in Vercel: Project -> Settings -> Environment
// Variables, Production scope — NOT prefixed with VITE_):
//   RESEND_API_KEY

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Sending address on the verified leofudaly.com domain. Doesn't need to be
// a real inbox — reply_to below points real replies at the owner's actual
// email instead.
const FROM = "LEO FUDALY <hello@leofudaly.com>";
const OWNER_EMAIL = "leo.fudaly@gmail.com";

// ---------------------------------------------------------------------------
// Shared HTML shell — mirrors the site's look (white, black text, thin
// borders, uppercase tracked wordmark) so the emails feel like they came
// from the same brand, not a generic transactional-email template.
// ---------------------------------------------------------------------------
const emailShell = (bodyHtml) => `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;max-width:480px;width:100%;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #000000;text-align:center;">
                <span style="font-size:13px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#000000;">LEO FUDALY</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #e5e5e5;text-align:center;">
                <a href="https://www.leofudaly.com" style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#999999;text-decoration:none;">leofudaly.com</a>
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
  `<p style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#000000;">${text}</p>`;

const label = (text) =>
  `<p style="margin:0 0 4px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#999999;">${text}</p>`;

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

function contactNotificationHtml({ name, email, phone, message }) {
  return emailShell(`
    ${label("Nová správa z kontaktného formulára")}
    <p style="margin:0 0 24px;font-size:16px;font-weight:bold;color:#000000;">${escapeHtml(name)}</p>
    ${label("E-mail")}
    ${paragraph(escapeHtml(email))}
    ${phone ? `${label("Telefón")}${paragraph(escapeHtml(phone))}` : ""}
    ${label("Správa")}
    ${paragraph(escapeHtml(message).replace(/\n/g, "<br/>"))}
  `);
}

function contactConfirmationHtml({ name }) {
  return emailShell(`
    ${label("Ďakujeme")}
    <p style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#000000;">Dobrý deň${name ? `, ${escapeHtml(name)}` : ""}.</p>
    ${paragraph("Vaša správa bola úspešne prijatá. Ozveme sa vám čo najskôr.")}
  `);
}

function signupNotificationHtml({ email }) {
  return emailShell(`
    ${label("Nová registrácia na newsletter")}
    <p style="margin:0;font-size:16px;font-weight:bold;color:#000000;">${escapeHtml(email)}</p>
  `);
}

function signupConfirmationHtml() {
  return emailShell(`
    ${label("Vitajte")}
    <p style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#000000;">Ďakujeme za registráciu.</p>
    ${paragraph("Budete medzi prvými, ktorí sa dozvedia o nových kolekciách a exkluzívnych ponukách.")}
  `);
}

// ---------------------------------------------------------------------------
// Resend
// ---------------------------------------------------------------------------

async function sendEmail({ to, subject, html, replyTo }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
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

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!RESEND_API_KEY) {
    return res
      .status(501)
      .json({ error: "RESEND_API_KEY is not configured on the server." });
  }

  const { type, ...data } = req.body || {};

  try {
    if (type === "contact") {
      const { name, email, phone, message } = data;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      await Promise.all([
        sendEmail({
          to: OWNER_EMAIL,
          subject: `Nová správa od ${name}`,
          html: contactNotificationHtml({ name, email, phone, message }),
          replyTo: email,
        }),
        sendEmail({
          to: email,
          subject: "Ďakujeme za vašu správu — LEO FUDALY",
          html: contactConfirmationHtml({ name }),
          replyTo: OWNER_EMAIL,
        }),
      ]);

      return res.status(200).json({ ok: true });
    }

    if (type === "signup") {
      const { email } = data;
      if (!email) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      await Promise.all([
        sendEmail({
          to: OWNER_EMAIL,
          subject: `Nová registrácia: ${email}`,
          html: signupNotificationHtml({ email }),
        }),
        sendEmail({
          to: email,
          subject: "Vitajte v LEO FUDALY",
          html: signupConfirmationHtml(),
          replyTo: OWNER_EMAIL,
        }),
      ]);

      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Unknown type." });
  } catch (error) {
    console.error("send-email error:", error);
    return res.status(500).json({ error: error.message || "Send failed." });
  }
}
