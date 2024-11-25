// src/routes.js

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import AdminDashboard from "./pages/AdminDashboard";
// 如果有其他頁面，請在此處引入

const AppRoutes = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/restaurant" element={<RestaurantDashboard />} />
      <Route path="/delivery" element={<DeliveryDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      {/* 根據需要添加更多路由 */}
    </Routes>
  </Router>
);

export default AppRoutes;
