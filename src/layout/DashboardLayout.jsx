// src/layout/DashboardLayout.jsx

import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  CarOutlined,
  SettingOutlined, // 使用 SettingOutlined 取代 AdminOutlined
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div
          className="logo"
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.3)",
          }}
        />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="user">用戶管理</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />}>
            <Link to="restaurant">餐廳管理</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CarOutlined />}>
            <Link to="delivery">外送員管理</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to="admin">管理員</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
