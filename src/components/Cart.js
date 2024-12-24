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
import "./Cart.css"; // 如果有自定義樣式

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 計算總金額
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.info("購物車為空，請先添加菜品！");
      return;
    }
    // 這裡可以添加結算邏輯，例如導航到結算頁面
    message.success("結算功能待實現！");
    navigate("/checkout"); // 假設有一個結算頁面
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
                    description={`價格: NT$${item.price} × ${item.quantity}`}
                  />
                  <div>NT$ {item.price * item.quantity}</div>
                </List.Item>
              )}
            />
            <Row justify="end" style={{ marginTop: "20px" }}>
              <Col>
                <Title level={4}>總金額: NT$ {totalAmount}</Title>
                <Button type="primary" onClick={handleCheckout}>
                  結算
                </Button>
                <Button
                  type="default"
                  danger
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    clearCart();
                    message.success("購物車已清空！");
                  }}
                >
                  清空購物車
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Paragraph>您的購物車為空。</Paragraph>
        )}
      </Content>
    </Layout>
  );
};

export default Cart;
