// Generates a Slovak-law-compliant PDF invoice ("faktúra") for a single
// order. Pure JS (pdf-lib + @pdf-lib/fontkit) — no native dependencies, so
// it works fine inside a Vercel serverless function.
//
// Seller details are hardcoded here from the public business register
// (živnostenský register, cross-checked via transparex.sk). Update these
// if the registered details ever change (e.g. if VAT registration status
// changes, or the registered address changes).
//
// Legal basis: as a sole trader who is NOT a VAT payer (IČ DPH: nemá),
// this is not a VAT invoice under the VAT Act, but it is the accounting
// document ("účtovný doklad") required under § 10 of the Accounting Act
// (zákon č. 431/2002 Z. z.) — it carries: identification of the document,
// the parties, the amount, the date of issue, and the date the economic
// event occurred. It also includes the customary commercial-invoice
// fields (invoice number, itemized goods, seller/buyer identification)
// that are standard practice for e-commerce receipts in Slovakia.

import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGULAR_FONT_PATH = path.join(__dirname, "fonts", "Roboto-Regular.ttf");
const BOLD_FONT_PATH = path.join(__dirname, "fonts", "Roboto-Bold.ttf");

// Registered business details — source: Živnostenský register / transparex.sk
// (Okresný úrad Kežmarok, č. živ. registra: 730-23517), checked 2026-09-13.
export const SELLER = {
  name: "Leo Fudaly",
  addressLine1: "Krátka 91/8A",
  addressLine2: "059 01 Spišská Belá",
  ico: "57726256",
  dic: "1131312732",
  vatNote: "Nie je platcom DPH.",
  registration:
    "Živnostník zapísaný v Živnostenskom registri — Okresný úrad Kežmarok, č. živnostenského registra: 730-23517.",
  email: "hello@leofudaly.com",
  web: "www.leofudaly.com",
};

function formatMoney(amount, currency = "eur") {
  const n = Number(amount ?? 0);
  const symbol = String(currency).toUpperCase() === "EUR" ? "€" : String(currency).toUpperCase();
  return `${n.toFixed(2)} ${symbol}`;
}

function itemName(item) {
  return item?.name?.sk || item?.name?.en || item?.name || item?.code || "Položka";
}

function formatDate(d) {
  const date = d ? new Date(d) : new Date();
  return date.toLocaleDateString("sk-SK", { year: "numeric", month: "2-digit", day: "2-digit" });
}

// Human-facing invoice number: YEAR + zero-padded sequential order number
// (the sequential number itself comes from a bigserial column in Supabase
// — see api/confirm-order.js — so it is a real, gapless, ever-increasing
// counter, not something computed client-side).
export function buildInvoiceNumber(orderNumber, createdAt) {
  const year = (createdAt ? new Date(createdAt) : new Date()).getFullYear();
  return `${year}${String(orderNumber).padStart(4, "0")}`;
}

export async function generateInvoicePdf({
  invoiceNumber,
  orderNumber,
  paymentIntentId,
  createdAt,
  contact = {},
  items = [],
  subtotal,
  shippingPrice,
  total,
  currency = "eur",
  pickupPoint,
  fillingAddress,
}) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const regularBytes = fs.readFileSync(REGULAR_FONT_PATH);
  const boldBytes = fs.readFileSync(BOLD_FONT_PATH);
  const font = await pdfDoc.embedFont(regularBytes, { subset: true });
  const fontBold = await pdfDoc.embedFont(boldBytes, { subset: true });

  const PAGE_SIZE = [595.28, 841.89]; // A4 in points
  const margin = 50;

  let page = pdfDoc.addPage(PAGE_SIZE);
  let y = page.getSize().height - margin;

  const black = rgb(0, 0, 0);
  const gray = rgb(0.5, 0.5, 0.5);
  const lightGray = rgb(0.85, 0.85, 0.85);

  const draw = (text, x, yy, opts = {}) => {
    page.drawText(String(text ?? ""), {
      x,
      y: yy,
      size: opts.size ?? 10,
      font: opts.bold ? fontBold : font,
      color: opts.color ?? black,
    });
  };

  const newPage = () => {
    page = pdfDoc.addPage(PAGE_SIZE);
    y = page.getSize().height - margin;
  };

  const width = page.getSize().width;

  // ---- Header ----
  draw("LEO FUDALY", margin, y, { size: 16, bold: true });
  draw("FAKTÚRA", width - margin - 130, y, { size: 16, bold: true });
  draw(`č. ${invoiceNumber}`, width - margin - 130, y - 18, { size: 10, color: gray });
  y -= 46;

  // ---- Seller / buyer two columns ----
  const colGap = 24;
  const colWidth = (width - margin * 2 - colGap) / 2;
  const leftX = margin;
  const rightX = margin + colWidth + colGap;
  let leftY = y;
  let rightY = y;

  draw("Dodávateľ", leftX, leftY, { size: 9, color: gray });
  leftY -= 15;
  draw(SELLER.name, leftX, leftY, { size: 11, bold: true });
  leftY -= 14;
  draw(SELLER.addressLine1, leftX, leftY, { size: 10 });
  leftY -= 13;
  draw(SELLER.addressLine2, leftX, leftY, { size: 10 });
  leftY -= 13;
  draw(`IČO: ${SELLER.ico}`, leftX, leftY, { size: 10 });
  leftY -= 13;
  draw(`DIČ: ${SELLER.dic}`, leftX, leftY, { size: 10 });
  leftY -= 13;
  draw(SELLER.vatNote, leftX, leftY, { size: 9, color: gray });
  leftY -= 13;
  draw(SELLER.email, leftX, leftY, { size: 10 });
  leftY -= 13;

  const buyerName = `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim() || "-";
  const addressSource =
    fillingAddress || (pickupPoint ? { street: pickupPoint.address, city: pickupPoint.city } : null);

  draw("Odberateľ", rightX, rightY, { size: 9, color: gray });
  rightY -= 15;
  draw(buyerName, rightX, rightY, { size: 11, bold: true });
  rightY -= 14;
  if (addressSource?.street) {
    draw(addressSource.street, rightX, rightY, { size: 10 });
    rightY -= 13;
  }
  if (addressSource?.city || addressSource?.postalCode) {
    draw(`${addressSource.postalCode ?? ""} ${addressSource.city ?? ""}`.trim(), rightX, rightY, { size: 10 });
    rightY -= 13;
  }
  if (contact.email) {
    draw(contact.email, rightX, rightY, { size: 10 });
    rightY -= 13;
  }
  if (contact.phone) {
    draw(contact.phone, rightX, rightY, { size: 10 });
    rightY -= 13;
  }

  y = Math.min(leftY, rightY) - 20;

  // ---- Invoice meta row ----
  draw(`Dátum vystavenia: ${formatDate(createdAt)}`, leftX, y, { size: 9, color: gray });
  draw(`Dátum dodania: ${formatDate(createdAt)}`, leftX + 200, y, { size: 9, color: gray });
  y -= 14;
  draw(`Číslo objednávky: ${orderNumber}`, leftX, y, { size: 9, color: gray });
  draw(`Forma úhrady: platobná karta (online)`, leftX + 200, y, { size: 9, color: gray });
  y -= 14;
  if (paymentIntentId) {
    draw(`Stripe platba: ${paymentIntentId}`, leftX, y, { size: 8, color: gray });
    y -= 14;
  }
  y -= 16;

  // ---- Items table ----
  const col1 = leftX;
  const col2 = leftX + 270;
  const col3 = leftX + 345;
  const col4 = width - margin - 65;

  const drawTableHeader = () => {
    draw("Položka", col1, y, { size: 9, bold: true, color: gray });
    draw("Množ.", col2, y, { size: 9, bold: true, color: gray });
    draw("Cena/ks", col3, y, { size: 9, bold: true, color: gray });
    draw("Spolu", col4, y, { size: 9, bold: true, color: gray });
    y -= 8;
    page.drawLine({ start: { x: leftX, y }, end: { x: width - margin, y }, thickness: 1, color: lightGray });
    y -= 18;
  };

  drawTableHeader();

  for (const item of items) {
    if (y < 140) {
      newPage();
      drawTableHeader();
    }

    const qty = item.quantity ?? 1;
    const unitPrice = item.unitPrice ?? item.price ?? 0;
    const lineTotal = item.lineTotal ?? unitPrice * qty;
    const variantBits = [item.size, item.color].filter(Boolean).join(" · ");

    draw(itemName(item), col1, y, { size: 10 });
    draw(String(qty), col2, y, { size: 10 });
    draw(formatMoney(unitPrice, currency), col3, y, { size: 10 });
    draw(formatMoney(lineTotal, currency), col4, y, { size: 10 });
    y -= 13;
    if (variantBits) {
      draw(variantBits, col1, y, { size: 8, color: gray });
    }
    y -= 19;
  }

  if (y < 150) newPage();

  y -= 4;
  page.drawLine({ start: { x: leftX, y: y + 12 }, end: { x: width - margin, y: y + 12 }, thickness: 1, color: lightGray });

  draw("Medzisúčet", col3, y, { size: 10, color: gray });
  draw(formatMoney(subtotal, currency), col4, y, { size: 10, color: gray });
  y -= 16;
  draw("Doprava", col3, y, { size: 10, color: gray });
  draw(formatMoney(shippingPrice, currency), col4, y, { size: 10, color: gray });
  y -= 22;
  draw("Spolu k úhrade", col3, y, { size: 12, bold: true });
  draw(formatMoney(total, currency), col4, y, { size: 12, bold: true });

  // ---- Footer (fixed near bottom of whatever the current page is) ----
  const footerY = 70;
  draw(SELLER.registration, leftX, footerY, { size: 8, color: gray });
  draw(
    "Faktúra bola vygenerovaná automaticky a je platná aj bez podpisu a pečiatky.",
    leftX,
    footerY - 14,
    { size: 8, color: gray }
  );
  draw(SELLER.web, leftX, footerY - 28, { size: 8, color: gray });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
