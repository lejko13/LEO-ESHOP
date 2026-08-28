import { getProductById } from "../data/products/index.js";
import { getMaterialById } from "../data/materials/index.js";

// A cart line item can reference either a clothing product (piece-based,
// size/color) or a fabric/material (sold by the meter, no size/color) — see
// CartContext.jsx's addItem `kind` param. Everywhere that used to call
// getProductById(item.productId) directly (Cart, CartToast, Checkout,
// OrderSummary) now goes through this instead, so none of them need to
// know which catalog a given line item came from.
export const resolveCartItem = (item) => {
  if (item.kind === "material") {
    const material = getMaterialById(item.productId);
    if (!material) return null;
    return {
      kind: "material",
      id: material.id,
      code: material.code,
      name: material.name,
      image: material.images?.front,
      currency: material.currency,
      unitPrice: material.pricePerMeter,
      quantity: item.quantity,
      lineTotal: material.pricePerMeter * item.quantity,
      size: null,
      color: item.color,
      big: null,
    };
  }

  const product = getProductById(item.productId);
  if (!product) return null;
  return {
    kind: "product",
    id: product.id,
    code: product.code,
    name: product.name,
    // Show the photo matching the color that was actually added to the
    // cart, when this product has per-color photos (see e.g.
    // data/products/hoodie/product.js) — falls back to the default photo
    // otherwise.
    image: product.imagesByColor?.[item.color]?.front ?? product.images?.front,
    currency: product.currency,
    unitPrice: product.price,
    quantity: item.quantity,
    lineTotal: product.price * item.quantity,
    size: item.size,
    color: item.color,
    big: product.big,
  };
};
