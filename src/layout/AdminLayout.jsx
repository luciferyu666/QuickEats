// src/layout/AdminLayout.jsx

import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  SettingOutlined, // 使用合適的圖示
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
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
          <Menu.Item key="1" icon={<SettingOutlined />}>
            <Link to="restaurants">餐廳管理</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            <Link to="users">用戶管理</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link to="orders">訂單管理</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to="menu-items">菜單管理</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            <Link to="delivery">配送管理</Link>
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

export default AdminLayout;
