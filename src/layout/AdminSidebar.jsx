// src/layout/AdminSidebar.jsx

import React from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const AdminSidebar = () => {
  const location = useLocation();

  // 根據當前路徑設定選中的菜單項
  const selectedKey = location.pathname.split("/")[2] || "restaurants";

  // 管理員側邊欄菜單項目
  const menuItems = [
    {
      key: "restaurants",
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/restaurants">編輯餐廳資料</Link>,
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">編輯用戶資料</Link>,
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">編輯訂單資料</Link>,
    },
    {
      key: "menu-items",
      icon: <EditOutlined />,
      label: <Link to="/admin/menu-items">編輯菜單項目</Link>,
    },
    {
      key: "delivery",
      icon: <TruckOutlined />,
      label: <Link to="/admin/delivery">編輯配送員資訊</Link>,
    },
  ];

  return (
    <Sider
      width={250}
      className="admin-sidebar"
      style={{
        background: "#fff",
        boxShadow: "2px 0 6px rgba(0, 21, 41, 0.35)",
      }}
    >
      <div className="logo">Admin</div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        className="admin-menu"
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default AdminSidebar;
