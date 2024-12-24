// src/components/Favorites.js

import React from "react";
import { Row, Col, Typography } from "antd";
import PropTypes from "prop-types";
import PopularRestaurantCard from "./PopularRestaurantCard";

const { Text } = Typography;

const Favorites = ({
  favorites,
  restaurants,
  toggleFavorite,
  showRestaurantModal,
  startOrder, // 接收 startOrder prop
}) => {
  // 篩選出收藏的餐廳
  const favoriteRestaurants = restaurants.filter((restaurant) =>
    favorites.includes(restaurant.id)
  );

  return (
    <Row gutter={[16, 16]}>
      {favoriteRestaurants.length > 0 ? (
        favoriteRestaurants.map((restaurant) => (
          <Col xs={24} sm={12} md={8} lg={6} key={restaurant.id}>
            <PopularRestaurantCard
              restaurant={restaurant}
              toggleFavorite={toggleFavorite}
              showRestaurantModal={showRestaurantModal}
              favorites={favorites}
              startOrder={startOrder} // 傳遞 startOrder prop
            />
          </Col>
        ))
      ) : (
        <Col span={24}>
          <Text>您尚未收藏任何餐廳。</Text>
        </Col>
      )}
    </Row>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cuisine: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string,
      address: PropTypes.string,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  showRestaurantModal: PropTypes.func.isRequired,
  startOrder: PropTypes.func.isRequired, // 添加 startOrder prop 類型驗證
};

export default Favorites;
