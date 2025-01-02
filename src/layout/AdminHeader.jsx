// src/layout/AdminHeader.jsx

import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import "./AdminHeader.css"; // 確保已創建此文件

const { Header } = Layout;

const AdminHeader = () => {
  return (
    <Header className="admin-header">
      <div className="admin-header-title">
        <h1>QuickEats - Mock Data Admin</h1>
      </div>
      <nav>
        <Link to="/">
          <Button type="primary" icon={<HomeOutlined />}>
            返回前台首頁
          </Button>
        </Link>
      </nav>
    </Header>
  );
};

export default AdminHeader;
