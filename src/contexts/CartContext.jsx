import { message } from "antd";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((p) => p.product_id === product.product_id);

      if (exist) {
        return prev.map((p) =>
          p.product_id === product.product_id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p,
        );
      }

      return [...prev, product];
    });
  };
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((p) => (p.product_id === id ? { ...p, quantity } : p)),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.product_id !== id));
    message.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  const clearCart = () => setCartItems([]);

  /* ================= NEW ================= */

  // 👉 Tổng số lượng sản phẩm
  const totalQuantity = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  // 👉 Tổng tiền
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalQuantity, // 👈 thêm
        totalPrice, // 👈 thêm
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
