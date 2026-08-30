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
// Shared HTML shell — mirrors the site's look (all white, black text, thin
// borders, uppercase tracked wordmark), no separate "card on a grey page"
// framing, so it feels like an extension of the site itself.
//
// Gmail (and some other clients) auto-invert emails into a dark theme when
// they don't see an explicit light-mode signal, which is why an
// all-white/black design can otherwise show up with a black background and
// white text on a phone. The <meta> tags plus the forced light-mode CSS
// block below (including the `[data-ogsc]` selector Gmail's own dark-mode
// engine adds) tell every major client to leave the colors alone.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

// Reference images the person attached — rendered as clickable thumbnails
// (each links to the full-size image in Supabase Storage, since Gmail etc.
// scale inline images down anyway).
function imagesBlock(image_urls = []) {
  if (!Array.isArray(image_urls) || image_urls.length === 0) return "";

  const thumbs = image_urls
    .map(
      (url) => `
        <td style="padding:0 8px 8px 0;">
          <a href="${escapeHtml(url)}">
            <img src="${escapeHtml(url)}" width="96" height="96" alt="Referenčný obrázok" style="display:block;width:96px;height:96px;object-fit:cover;border:1px solid #e5e5e5;" />
          </a>
        </td>
      `
    )
    .join("");

  return `
    ${label("Referenčné obrázky")}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 16px;">
      <tr>${thumbs}</tr>
    </table>
  `;
}

function contactNotificationHtml({ name, email, phone, message, image_urls }) {
  return emailShell(`
    ${label("Nová správa z kontaktného formulára")}
    <p class="lf-heading" style="margin:0 0 24px;font-size:16px;font-weight:bold;color:#000000;">${escapeHtml(name)}</p>
    ${label("E-mail")}
    ${paragraph(escapeHtml(email))}
    ${phone ? `${label("Telefón")}${paragraph(escapeHtml(phone))}` : ""}
    ${label("Správa")}
    ${paragraph(escapeHtml(message).replace(/\n/g, "<br/>"))}
    ${imagesBlock(image_urls)}
  `);
}

function contactConfirmationHtml({ name }) {
  return emailShell(`
    ${label("Ďakujeme")}
    <p class="lf-heading" style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#000000;">Dobrý deň${name ? `, ${escapeHtml(name)}` : ""}.</p>
    ${paragraph("Vaša správa bola úspešne prijatá. Ozveme sa vám čo najskôr.")}
  `);
}

function signupNotificationHtml({ email }) {
  return emailShell(`
    ${label("Nová registrácia na newsletter")}
    <p class="lf-heading" style="margin:0;font-size:16px;font-weight:bold;color:#000000;">${escapeHtml(email)}</p>
  `);
}

function signupConfirmationHtml() {
  return emailShell(`
    ${label("Potvrdenie")}
    <p class="lf-heading" style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#000000;">Registrácia prijatá.</p>
    ${paragraph("Váš e-mail sme si zaznamenali. Ozveme sa, keď bude niečo nové.")}
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
      const { name, email, phone, message, image_urls } = data;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      await Promise.all([
        sendEmail({
          to: OWNER_EMAIL,
          subject: `Nová správa od ${name}`,
          html: contactNotificationHtml({ name, email, phone, message, image_urls }),
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
