// src/layout/SimpleLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const SimpleLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header style={{ background: "#fff", padding: 0 }}>
      {/* 全局頭部內容，例如標題或導航 */}
      <div style={{ padding: "0 24px" }}>
        <h1>QuickEats</h1>
      </div>
    </Header>
    <Content style={{ margin: "16px" }}>
      <Outlet />
    </Content>
    <Footer style={{ textAlign: "center" }}>
      QuickEats ©2023 Created by Your Name
    </Footer>
  </Layout>
);

export default SimpleLayout;
