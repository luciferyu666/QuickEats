// src/routes.js

import React from "react";
import { Routes, Route } from "react-router-dom";

// 頁面組件
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RestaurantsPage from "./pages/RestaurantsPage";
import UsersPage from "./pages/UsersPage";
import OrdersPage from "./pages/OrdersPage";
import MenuItemsPage from "./pages/MenuItemsPage";
import DeliveryPage from "./pages/DeliveryPage"; // 確保正確引入

// 佈局組件
import SimpleLayout from "./layout/SimpleLayout";
import AdminLayout from "./layout/AdminLayout";

const AppRoutes = () => (
  <Routes>
    {/* 根路由 */}
    <Route path="/" element={<LandingPage />} />

    {/* 用戶和外送員儀表板路由，使用 SimpleLayout */}
    <Route element={<SimpleLayout />}>
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/dashboard/delivery" element={<DeliveryDashboard />} />
      <Route path="/dashboard/restaurant" element={<RestaurantDashboard />} />
      {/* 如果有其他不需要側邊欄的儀表板路由，可以在此添加 */}
    </Route>

    {/* 管理員後台路由，使用 AdminLayout */}
    <Route path="/admin" element={<AdminLayout />}>
      {/* 管理員首頁 */}
      <Route index element={<AdminDashboard />} />

      {/* 管理員子頁面 */}
      <Route path="restaurants" element={<RestaurantsPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="menu-items" element={<MenuItemsPage />} />
      <Route path="delivery" element={<DeliveryPage />} />
      {/* 已移除 settings 路由 */}
    </Route>

    {/* 404 路由 */}
    <Route
      path="*"
      element={
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          404 - 抱歉，您訪問的頁面不存在。
        </h2>
      }
    />
  </Routes>
);

export default AppRoutes;
