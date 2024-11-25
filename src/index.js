// src/index.js

import React from "react";
import ReactDOM from "react-dom/client"; // React 18 的新 API
import "./index.css";
import AppRoutes from "./routes/AppRoutes"; // 引入 AppRoutes
import { BrowserRouter as Router } from "react-router-dom"; // 引入 Router
import { CartProvider } from "./context/CartContext"; // 引入 CartProvider
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  </React.StrictMode>
);

// 如果您想在應用中測量性能，請傳遞一個函數
// 來記錄結果（例如：reportWebVitals(console.log)）
reportWebVitals();
