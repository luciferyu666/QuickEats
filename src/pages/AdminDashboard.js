// src/pages/AdminDashboard.js

import React from "react";
import { Layout, Typography, Row, Col, Card } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderManagement from "../components/admin/OrderManagement";
import UserManagement from "../components/admin/UserManagement";
import RestaurantManagement from "../components/admin/RestaurantManagement";
import SystemMonitoring from "../components/admin/SystemMonitoring";
import "./AdminDashboard.css"; // 管理員主頁的樣式

const { Title } = Typography;
const { Content } = Layout;

const AdminDashboard = () => {
  return (
    <Layout>
      <Header />
      <Content
        className="admin-dashboard-content"
        style={{ padding: "20px 50px" }}
      >
        <Title level={2}>管理員主頁</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="訂單管理">
              <OrderManagement />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="用戶管理">
              <UserManagement />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="餐廳管理">
              <RestaurantManagement />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="系統監控">
              <SystemMonitoring />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AdminDashboard;
