// src/components/PopularRestaurantCard.js

import React from "react";
import { Card, Button } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  InfoCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./PopularRestaurantCard.css"; // 确保 CSS 文件存在并包含必要样式

const { Meta } = Card;

const PopularRestaurantCard = ({
  restaurant,
  toggleFavorite,
  showRestaurantModal,
  favorites = [], // 为 favorites 提供默认值
  startOrder, // 接收 startOrder prop
}) => {
  const handleStartOrder = () => {
    // 调用传递的 startOrder 函数
    startOrder(restaurant);
  };

  const isFavorited = favorites.includes(restaurant.id);

  return (
    <Card
      hoverable
      className="restaurant-card" // 添加自定义类名
      cover={
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="menuItemImage" // 使用自定义类名
        />
      }
      actions={[
        // 收藏图标
        isFavorited ? (
          <HeartFilled
            className="favorite-button" // 使用自定义类名
            onClick={() => toggleFavorite(restaurant.id)}
            key="favorite"
          />
        ) : (
          <HeartOutlined
            className="favorite-button" // 使用自定义类名
            onClick={() => toggleFavorite(restaurant.id)}
            key="favorite"
          />
        ),
        // 使用自定义类名包裹按钮，防止重叠
        <div className="popular-restaurant-card-actions" key="actions">
          <Button
            type="primary"
            icon={<InfoCircleOutlined />}
            onClick={() => showRestaurantModal(restaurant)}
            className="detail-button"
            size="middle" // 可以根据需要调整
          >
            查看详情
          </Button>
          <Button
            type="default"
            icon={<EnvironmentOutlined />}
            onClick={handleStartOrder}
            className="order-button"
            size="middle" // 可以根据需要调整
          >
            開始下單
          </Button>
        </div>,
      ]}
    >
      <Meta
        title={<div className="restaurant-title">{restaurant.name}</div>} // 使用自定义类名
        description={
          <div>
            <div className="restaurant-description">
              {`料理类型：${restaurant.cuisine} | 评分：${restaurant.rating}/5`}
            </div>
            <div className="restaurant-address">{restaurant.address}</div>
          </div>
        }
      />
    </Card>
  );
};

PopularRestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired, // 确保地址属性存在
    description: PropTypes.string, // 可选描述属性
  }).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  showRestaurantModal: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string),
  startOrder: PropTypes.func.isRequired, // 添加 startOrder prop 类型验证
};

PopularRestaurantCard.defaultProps = {
  favorites: [], // 默认值为空数组
};

export default PopularRestaurantCard;
