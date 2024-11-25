// src/components/MenuItemCard.js

import React from "react";
import { Card, Button } from "antd";
import "./MenuItemCard.css";

const { Meta } = Card;

const MenuItemCard = ({ menuItem, addToCart }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={menuItem.name}
          src={menuItem.image}
          className="menuItemImage"
        />
      }
      actions={[
        <Button type="primary" onClick={() => addToCart(menuItem)}>
          加入購物車
        </Button>,
      ]}
    >
      <Meta title={menuItem.name} description={`價格：NT$${menuItem.price}`} />
    </Card>
  );
};

export default MenuItemCard;
