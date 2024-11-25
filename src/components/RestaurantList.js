// src/components/RestaurantList.js

import React from "react";
import { List, Button, Avatar, Tag, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const RestaurantList = ({
  restaurants,
  favorites,
  toggleFavorite,
  showRestaurantModal,
}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={restaurants}
      renderItem={(restaurant) => (
        <List.Item
          actions={[
            favorites.includes(restaurant.id) ? (
              <HeartFilled
                key="favorite"
                style={{ color: "red" }}
                onClick={() => toggleFavorite(restaurant.id)}
              />
            ) : (
              <HeartOutlined
                key="favorite"
                onClick={() => toggleFavorite(restaurant.id)}
              />
            ),
            <Button type="link" onClick={() => showRestaurantModal(restaurant)}>
              查看詳情
            </Button>,
            <Button
              type="primary"
              onClick={() => message.info("開始下單功能待實現")}
            >
              開始下單
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={restaurant.image} size={64} />}
            title={restaurant.name}
            description={
              <>
                <Tag color="blue">{restaurant.cuisine}</Tag>
                <Tag color="green">評分：{restaurant.rating} / 5</Tag>
                <Tag color="volcano">{restaurant.status}</Tag>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default RestaurantList;
