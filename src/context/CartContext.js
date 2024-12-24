// src/context/CartContext.js

import React, { createContext, useState } from "react";

// 創建購物車上下文
export const CartContext = createContext();

// 創建購物車提供者
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 添加菜品到購物車
  const addToCart = (menuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === menuItem.id);
      if (existingItem) {
        // 如果菜品已在購物車中，增加數量
        return prevItems.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 如果菜品不在購物車中，添加新項並設置數量為1
        return [...prevItems, { ...menuItem, quantity: 1 }];
      }
    });
  };

  // 從購物車中移除菜品
  const removeFromCart = (menuItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== menuItemId)
    );
  };

  // 清空購物車
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
