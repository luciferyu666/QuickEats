// src/context/CartContext.js

import React, { createContext, useState } from "react";

// 创建购物车上下文
export const CartContext = createContext();

// 创建购物车提供者
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 添加菜品到购物车
  const addToCart = (menuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === menuItem.id);
      if (existingItem) {
        // 如果菜品已在购物车中，增加数量
        return prevItems.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 如果菜品不在购物车中，添加新项并设置数量为1
        return [...prevItems, { ...menuItem, quantity: 1 }];
      }
    });
  };

  // 从购物车中移除菜品
  const removeFromCart = (menuItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== menuItemId)
    );
  };

  // 清空购物车
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
