// src/pages/RestaurantMenu.js

import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, Row, Col, Card, Button, message } from "antd";
import { CartContext } from "../context/CartContext"; // 引入 CartContext
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  restaurants as mockRestaurants,
  menuItems as mockMenuItems,
} from "../data/mockData";
import "./RestaurantMenu.css"; // 如果有自定义样式

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const RestaurantMenu = () => {
  const { id } = useParams(); // 获取餐厅 ID
  const { addToCart } = useContext(CartContext); // 使用购物车上下文

  // 找到对应的餐厅
  const restaurant = mockRestaurants.find((rest) => rest.id === id);

  if (!restaurant) {
    return (
      <Layout>
        <Header />
        <Content style={{ padding: "20px 50px" }}>
          <Title level={2}>餐厅未找到</Title>
          <Paragraph>抱歉，您请求的餐厅不存在。</Paragraph>
        </Content>
        <Footer />
      </Layout>
    );
  }

  // 获取该餐厅的菜单项
  const restaurantMenu = mockMenuItems.filter(
    (item) => item.restaurantId === restaurant.id
  );

  // 添加到购物车的处理函数
  const handleAddToCart = (menuItem) => {
    addToCart(menuItem);
    message.success(`${menuItem.name} 已加入购物车！`);
  };

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "20px 50px" }}>
        <Title level={2}>{restaurant.name} 的菜单</Title>
        <Paragraph>{restaurant.description}</Paragraph>

        <Row gutter={[16, 16]}>
          {restaurantMenu.map((menuItem) => (
            <Col xs={24} sm={12} md={8} lg={6} key={menuItem.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={menuItem.name}
                    src={menuItem.image}
                    className="menuItemImage"
                  />
                }
              >
                <Card.Meta
                  title={menuItem.name}
                  description={`價格: NT$${menuItem.price}`}
                />
                <Paragraph>{menuItem.description}</Paragraph>
                <Button
                  type="primary"
                  onClick={() => handleAddToCart(menuItem)}
                >
                  加入購物車
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default RestaurantMenu;
