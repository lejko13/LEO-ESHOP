import { createContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // { productId, size, color, quantity, kind }
  // Transient "just added" event — CartToast watches this and shows a popup.
  // A fresh object (with its own id) is set on every addItem call, even for
  // the same product twice in a row, so the toast re-triggers each time.
  const [notification, setNotification] = useState(null);

  // `kind` defaults to "product" (clothing, piece-based, size/color) so
  // every existing call site keeps working unchanged. Materials (sold by
  // the meter — see MaterialProduct.jsx) pass kind="material", quantity in
  // meters, and no size/color. See utils/cartItem.js for how a line item
  // gets resolved back to its catalog entry + price regardless of kind.
  const addItem = (productId, size, color = null, quantity = 1, kind = "product") => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === productId &&
          i.size === size &&
          i.color === color &&
          i.kind === kind
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, size, color, quantity, kind }];
    });
    setNotification({
      id: `${Date.now()}-${Math.random()}`,
      productId,
      size,
      color,
      kind,
    });
  };

  const removeItem = (productId, size, color = null, kind = "product") => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.productId === productId &&
            i.size === size &&
            i.color === color &&
            i.kind === kind
          )
      )
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, notification }),
    [items, notification]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
