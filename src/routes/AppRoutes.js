// src/routes/AppRoutes.js

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";

// 懶加載頁面組件
const LandingPage = lazy(() => import("../pages/LandingPage"));
const UserDashboard = lazy(() => import("../pages/UserDashboard"));
const RestaurantDashboard = lazy(() => import("../pages/RestaurantDashboard"));
const DeliveryDashboard = lazy(() => import("../pages/DeliveryDashboard"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const RestaurantMenu = lazy(() => import("../pages/RestaurantMenu"));
const Cart = lazy(() => import("../components/Cart"));
const ViewOrders = lazy(() => import("../components/ViewOrders"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      }
    >
      <Routes>
        {/* 入口首頁 */}
        <Route path="/" element={<LandingPage />} />

        {/* 管理員查看訂單路由 */}
        <Route path="/view-orders" element={<ViewOrders />} />

        {/* 用戶儀表板路由 */}
        <Route path="/dashboard/user" element={<UserDashboard />} />

        {/* 餐廳儀表板路由 */}
        <Route path="/dashboard/restaurant" element={<RestaurantDashboard />} />

        {/* 外送員儀表板路由 */}
        <Route path="/dashboard/delivery" element={<DeliveryDashboard />} />

        {/* 管理員儀表板路由 */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* 餐廳菜單頁面 */}
        <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />

        {/* 购物车页面 */}
        <Route path="/cart" element={<Cart />} />

        {/* 404 未找到頁面路由 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
