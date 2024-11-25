// src/pages/UserDashboard.js

import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Modal,
  Avatar,
  message,
  Button, // 确保导入 Button 组件
} from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecentOrders from "../components/RecentOrders";
import Promotions from "../components/Promotions";
import Favorites from "../components/Favorites";
import SearchBar from "../components/SearchBar";
import PopularRestaurantCard from "../components/PopularRestaurantCard";
import OrderDetails from "../components/OrderDetails"; // 确保路径正确
import {
  restaurants as mockRestaurants,
  recentOrders as mockRecentOrders,
  promotions as mockPromotions,
  userFavorites as mockUserFavorites,
} from "../data/mockData";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const UserDashboard = () => {
  // ==================== 搜索功能状态 ====================
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(mockRestaurants);

  // ==================== 收藏夹状态 ====================
  const [favorites, setFavorites] = useState(mockUserFavorites || []);

  // ==================== 餐厅详情模态框状态 ====================
  const [isRestaurantModalVisible, setIsRestaurantModalVisible] =
    useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // ==================== 订单详情模态框状态 ====================
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  // ==================== 搜索功能相关函数 ====================
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRestaurants(mockRestaurants);
    } else {
      const filtered = mockRestaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (restaurant.description &&
            restaurant.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery]);

  // ==================== 收藏夹相关函数 ====================
  const toggleFavorite = (restaurantId) => {
    if (favorites.includes(restaurantId)) {
      setFavorites(favorites.filter((id) => id !== restaurantId));
      message.success("已从收藏夹移除！");
    } else {
      setFavorites([...favorites, restaurantId]);
      message.success("已加入收藏夹！");
    }
  };

  // ==================== 餐厅详情模态框相关函数 ====================
  const showRestaurantModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsRestaurantModalVisible(true);
  };

  const handleRestaurantModalOk = () => {
    setIsRestaurantModalVisible(false);
    setSelectedRestaurant(null);
  };

  const handleRestaurantModalCancel = () => {
    setIsRestaurantModalVisible(false);
    setSelectedRestaurant(null);
  };

  // ==================== 订单详情模态框相关函数 ====================
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderModalVisible(true);
  };

  const handleOrderModalClose = () => {
    setIsOrderModalVisible(false);
    setSelectedOrder(null);
  };

  // ==================== 开始下单函数 ====================
  const startOrder = (restaurant) => {
    // 导航到餐厅的菜单页面
    navigate(`/restaurant/${restaurant.id}/menu`);
  };

  // ==================== 筛选热门餐厅 ====================
  const popularRestaurants = mockRestaurants.filter(
    (rest) => rest.rating >= 4.0
  );

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "20px 50px" }}>
        <Typography>
          <Title level={2}>歡迎來到快餐達人！</Title>
          <Paragraph>
            浏览附近的餐厅，享受美味的餐点，并随时查看您的订单状态。
          </Paragraph>
        </Typography>

        {/* 搜索功能区域 */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="搜索餐厅、菜品或关键词"
        />

        {/* 快速访问区域 */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* 热门餐厅推荐 */}
          <Col xs={24} sm={24} md={18} lg={18} key="popular-restaurants">
            <Card title="熱門餐廳推薦">
              <Row gutter={[16, 16]}>
                {popularRestaurants.map((restaurant) => (
                  <Col xs={24} sm={12} md={8} lg={8} key={restaurant.id}>
                    <PopularRestaurantCard
                      restaurant={restaurant}
                      toggleFavorite={toggleFavorite}
                      showRestaurantModal={showRestaurantModal}
                      favorites={favorites} // 传递 favorites prop
                      startOrder={startOrder} // 传递 startOrder prop
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* 最近订单 */}
          <Col xs={24} sm={24} md={6} lg={6}>
            <Card title="最近订单">
              <RecentOrders
                orders={mockRecentOrders}
                onViewDetails={handleViewDetails} // 传递查看详情的处理函数
              />
            </Card>
          </Col>
        </Row>

        {/* 特别优惠区域 */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24}>
            <Card title="特別優惠">
              <Promotions promotions={mockPromotions} />
            </Card>
          </Col>
        </Row>

        {/* 收藏夹区域 */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24}>
            <Card title="我的收藏夹">
              <Favorites
                favorites={favorites}
                restaurants={mockRestaurants}
                toggleFavorite={toggleFavorite}
                showRestaurantModal={showRestaurantModal}
                startOrder={startOrder} // 传递 startOrder prop
              />
            </Card>
          </Col>
        </Row>

        {/* 餐厅详情模态框 */}
        <Modal
          title={selectedRestaurant ? selectedRestaurant.name : "餐厅详情"}
          visible={isRestaurantModalVisible}
          onOk={handleRestaurantModalOk}
          onCancel={handleRestaurantModalCancel}
          footer={[
            <Button
              key="close"
              type="primary"
              onClick={handleRestaurantModalOk}
            >
              关闭
            </Button>,
            selectedRestaurant && (
              <Button
                key="order"
                type="primary"
                onClick={() => {
                  handleRestaurantModalOk();
                  startOrder(selectedRestaurant); // 使用 startOrder 函数
                }}
              >
                开始下单
              </Button>
            ),
          ]}
        >
          {selectedRestaurant && (
            <>
              <Avatar
                src={selectedRestaurant.image}
                size={64}
                style={{ marginBottom: "20px" }}
              />
              <Title level={4}>{selectedRestaurant.name}</Title>
              <Paragraph>{selectedRestaurant.description}</Paragraph>
              <Paragraph>
                <strong>料理类型：</strong> {selectedRestaurant.cuisine}
              </Paragraph>
              <Paragraph>
                <strong>评分：</strong> {selectedRestaurant.rating} / 5
              </Paragraph>
              <Paragraph>
                <strong>地址：</strong> {selectedRestaurant.address}
              </Paragraph>
            </>
          )}
        </Modal>

        {/* 订单详情模态框 */}
        <OrderDetails
          visible={isOrderModalVisible}
          onClose={handleOrderModalClose}
          order={selectedOrder}
        />
      </Content>
      <Footer />
    </Layout>
  );
};

export default UserDashboard;
