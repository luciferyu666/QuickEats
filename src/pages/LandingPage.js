// src/pages/LandingPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Layout } from "antd";
import { roles } from "../data/mockData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LandingPage.css"; // 如果需要自定義樣式

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleClick = (roleId) => {
    navigate(`/dashboard/${roleId}`); // 更新導航路徑
  };

  return (
    <Layout className="landing-page">
      <Header />
      <Content style={{ padding: "50px" }}>
        <Typography>
          <Title level={2} style={{ textAlign: "center" }}>
            歡迎來到快餐達人（QuickEats）
          </Title>
          <Paragraph style={{ textAlign: "center" }}>
            請選擇您的角色以繼續
          </Paragraph>
        </Typography>
        <Row gutter={[16, 16]} justify="center">
          {roles.map((role) => (
            <Col xs={24} sm={12} md={6} key={role.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={role.name}
                    src={role.image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                }
                onClick={() => handleRoleClick(role.id)}
                className="role-card"
              >
                <Card.Meta title={role.name} description={role.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default LandingPage;
