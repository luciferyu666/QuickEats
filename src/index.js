// C:\Tasker\QuickEats\quickeats-frontend\src\index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// 正確引入 Ant Design 的樣式（針對 v5）
import "antd/dist/reset.css";

// Router
import { BrowserRouter as Router } from "react-router-dom";

// Context / Provider
import { CartProvider } from "./context/CartContext";

// 路由定義檔 (AppRoutes) - 內部只包含 <Routes> + <Route>，不再包裹 <Router>
import AppRoutes from "./routes"; // 確認路徑與檔名是否正確

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 在最外層包 <CartProvider> 與 <Router> */}
    <CartProvider>
      <Router>
        {/* 只含 <Routes> / <Route> 的 AppRoutes */}
        <AppRoutes />
      </Router>
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
