import { useContext } from "react";
import { CartContext } from "../services/CartContext.jsx";

// Small convenience hook so components can do `const { items, addItem } = useCart()`
// instead of importing useContext + CartContext everywhere.
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
