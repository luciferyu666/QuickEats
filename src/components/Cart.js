// src/components/Cart.js

import React, { useContext } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  message,
} from "antd";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // 如果有自定义样式

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 计算总金额
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.info("购物车为空，请先添加菜品！");
      return;
    }
    // 这里可以添加结算逻辑，例如导航到结算页面
    message.success("结算功能待实现！");
    navigate("/checkout"); // 假设有一个结算页面
  };

  return (
    <Layout>
      <Content style={{ padding: "20px 50px" }}>
        <Title level={2}>購物車</Title>
        {cartItems.length > 0 ? (
          <>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      danger
                      onClick={() => removeFromCart(item.id)}
                    >
                      移除
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                    description={`价格: NT$${item.price} × ${item.quantity}`}
                  />
                  <div>NT$ {item.price * item.quantity}</div>
                </List.Item>
              )}
            />
            <Row justify="end" style={{ marginTop: "20px" }}>
              <Col>
                <Title level={4}>总金额: NT$ {totalAmount}</Title>
                <Button type="primary" onClick={handleCheckout}>
                  结算
                </Button>
                <Button
                  type="default"
                  danger
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    clearCart();
                    message.success("购物车已清空！");
                  }}
                >
                  清空购物车
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Paragraph>您的购物车为空。</Paragraph>
        )}
      </Content>
    </Layout>
  );
};

export default Cart;
