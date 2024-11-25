// src/components/Header.js

import React, { useContext } from "react";
import { Layout, Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Header.css"; // 如果有自定义样式

const { Header: AntHeader } = Layout;

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 计算购物车中菜品的总数量
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const selectedKey = () => {
    switch (location.pathname) {
      case "/":
        return "1";
      case "/dashboard/user":
        return "2";
      case "/dashboard/restaurant":
        return "3";
      case "/dashboard/delivery":
        return "4";
      case "/dashboard/admin":
        return "5";
      case "/cart":
        return "6";
      default:
        return "1";
    }
  };

  return (
    <AntHeader>
      <div className="logo">
        <Link to="/dashboard/user">
          <h1 style={{ color: "#fff" }}>快餐達人</h1>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey()]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          <Link to="/">首頁</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/dashboard/user">用戶</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/dashboard/restaurant">餐廳</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/dashboard/delivery">外送員</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/dashboard/admin">管理員</Link>
        </Menu.Item>
        <Menu.Item key="6" onClick={() => navigate("/cart")}>
          <Badge count={cartItemCount} showZero>
            <ShoppingCartOutlined style={{ fontSize: "20px", color: "#fff" }} />
          </Badge>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
