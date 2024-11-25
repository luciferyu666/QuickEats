// src/routes/index.js

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";

// 懶加載頁面組件
const LandingPage = lazy(() => import("../pages/LandingPage"));
const UserDashboard = lazy(() => import("../pages/UserDashboard"));
const RestaurantDashboard = lazy(() => import("../pages/RestaurantDashboard"));
const DeliveryDashboard = lazy(() => import("../pages/DeliveryDashboard"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage")); // 新增

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/delivery" element={<DeliveryDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* 404 頁面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
