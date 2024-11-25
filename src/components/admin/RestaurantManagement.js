// src/components/admin/RestaurantManagement.js

import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Typography,
  Input,
  Select,
  message,
} from "antd";
import { adminRestaurants } from "../../data/mockData"; // 使用命名導入
import "./RestaurantManagement.css";

const { Paragraph } = Typography;
const { Option } = Select;

const RestaurantManagement = () => {
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 處理狀態篩選
  const handleStatusFilter = (value) => {
    setFilteredStatus(value);
  };

  // 處理搜索輸入變化
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // 過濾餐廳列表，實現大小寫不敏感的搜索
  const filteredRestaurants = adminRestaurants.filter((restaurant) => {
    const statusMatch = filteredStatus
      ? restaurant.status === filteredStatus
      : true;
    const lowerSearchText = searchText.toLowerCase();
    const searchMatch =
      restaurant.name.toLowerCase().includes(lowerSearchText) ||
      restaurant.address.toLowerCase().includes(lowerSearchText) ||
      restaurant.cuisine.toLowerCase().includes(lowerSearchText);
    return statusMatch && searchMatch;
  });

  // 定義表格列
  const columns = [
    {
      title: "餐廳名稱",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // 添加排序功能
      render: (text) => <span>{text}</span>,
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address), // 添加排序功能
      render: (text) => <span>{text}</span>,
    },
    {
      title: "菜系",
      dataIndex: "cuisine",
      key: "cuisine",
      filters: [
        { text: "美式", value: "美式" },
        { text: "日本料理", value: "日本料理" },
        { text: "中式", value: "中式" },
        // 更多菜系...
      ],
      onFilter: (value, record) => record.cuisine === value,
      render: (cuisine) => <Tag color="blue">{cuisine}</Tag>,
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "營業中", value: "營業中" },
        { text: "休息中", value: "休息中" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "green";
        if (status === "休息中") {
          color = "volcano";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "評分",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating, // 添加排序功能
      render: (rating) => <span>{rating} / 5</span>,
    },
    {
      title: "收入",
      dataIndex: "revenue",
      key: "revenue",
      sorter: (a, b) => a.revenue - b.revenue, // 添加排序功能
      render: (revenue) => `NT$ ${revenue}`,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showRestaurantDetails(record)}>
          查看詳情
        </Button>
      ),
    },
  ];

  // 顯示餐廳詳情的函數
  const showRestaurantDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalVisible(true);
  };

  // 處理模態框確認
  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedRestaurant(null);
  };

  // 處理模態框取消
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRestaurant(null);
  };

  // 處理更新餐廳狀態的函數（目前僅顯示提示，可擴展）
  const handleUpdateStatus = () => {
    message.info("此功能暫未實現！");
  };

  return (
    <>
      <div className="restaurant-management-filters">
        <Select
          placeholder="按狀態篩選"
          style={{ width: 200, marginRight: "16px" }}
          onChange={handleStatusFilter}
          allowClear
        >
          <Option value="營業中">營業中</Option>
          <Option value="休息中">休息中</Option>
        </Select>
        <Input
          placeholder="搜索餐廳名稱、地址或菜系"
          style={{ width: 300 }}
          value={searchText}
          onChange={handleSearch}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredRestaurants}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="餐廳詳情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" type="primary" onClick={handleOk}>
            關閉
          </Button>,
          selectedRestaurant && (
            <Button
              key="updateStatus"
              type="primary"
              onClick={handleUpdateStatus}
            >
              更新狀態
            </Button>
          ),
        ]}
      >
        {selectedRestaurant && (
          <>
            <Paragraph>
              <strong>餐廳名稱：</strong> {selectedRestaurant.name}
            </Paragraph>
            <Paragraph>
              <strong>地址：</strong> {selectedRestaurant.address}
            </Paragraph>
            <Paragraph>
              <strong>菜系：</strong> {selectedRestaurant.cuisine}
            </Paragraph>
            <Paragraph>
              <strong>狀態：</strong> {selectedRestaurant.status}
            </Paragraph>
            <Paragraph>
              <strong>評分：</strong> {selectedRestaurant.rating} / 5
            </Paragraph>
            <Paragraph>
              <strong>營業時間：</strong> {selectedRestaurant.operatingHours}
            </Paragraph>
            <Paragraph>
              <strong>收入統計：</strong> NT$ {selectedRestaurant.revenue}
            </Paragraph>
          </>
        )}
      </Modal>
    </>
  );
};

export default RestaurantManagement;
