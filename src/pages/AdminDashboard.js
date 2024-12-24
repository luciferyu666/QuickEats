import React from "react";
import { Layout, Typography, Row, Col, Card, List } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderManagement from "../components/admin/OrderManagement";
import UserManagement from "../components/admin/UserManagement";
import RestaurantManagement from "../components/admin/RestaurantManagement";
import SystemMonitoring from "../components/admin/SystemMonitoring";
import UserActivityChart from "../components/admin/UserActivityChart"; // 新增组件

const { Title } = Typography;
const { Content } = Layout;

// 模拟用户活躍度数据
const userActivityData = {
  labels: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04"],
  datasets: [
    {
      label: "活跃用户数",
      data: [12, 19, 3, 5],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// 模拟用户活躍度排行数据
const topUsers = [
  { id: "u1", name: "张三", activity: 150 },
  { id: "u2", name: "李四", activity: 120 },
  { id: "u3", name: "王五", activity: 100 },
];

const AdminDashboard = () => {
  return (
    <Layout>
      <Header />
      <Content
        className="admin-dashboard-content"
        style={{ padding: "20px 50px" }}
      >
        <Title level={2}>管理员主页</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="订单管理">
              <OrderManagement />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="用户管理">
              <UserManagement />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="餐厅管理">
              <RestaurantManagement />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="系统监控">
              <SystemMonitoring />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title="用户活躍度">
              {/* 图表组件 */}
              <UserActivityChart data={userActivityData} />

              {/* 活跃用户排行 */}
              <List
                header={<div>活跃用户排行（前 3 名）</div>}
                bordered
                dataSource={topUsers}
                renderItem={(user) => (
                  <List.Item>
                    {user.name} - 活躍度: {user.activity}
                  </List.Item>
                )}
                style={{ marginTop: "20px" }}
              />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AdminDashboard;
