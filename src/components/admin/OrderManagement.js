// src/components/admin/OrderManagement.js

import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Typography,
  Select,
  Input,
  message,
} from "antd";
import { adminOrders } from "../../data/mockData"; // 使用命名導入
import "./OrderManagement.css";

const { Paragraph } = Typography;
const { Option } = Select;

const OrderManagement = () => {
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleStatusFilter = (value) => {
    setFilteredStatus(value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredOrders = adminOrders.filter((order) => {
    const statusMatch = filteredStatus ? order.status === filteredStatus : true;
    const searchMatch =
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.restaurantName.toLowerCase().includes(searchText.toLowerCase());
    return statusMatch && searchMatch;
  });

  const columns = [
    {
      title: "訂單編號",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
      ellipsis: true, // 添加省略號
    },
    {
      title: "用戶姓名",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      ellipsis: true,
    },
    {
      title: "餐廳名稱",
      dataIndex: "restaurantName",
      key: "restaurantName",
      sorter: (a, b) => a.restaurantName.localeCompare(b.restaurantName),
      ellipsis: true,
    },
    {
      title: "金額",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (text) => `NT$ ${text}`,
      ellipsis: true,
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "新訂單", value: "新訂單" },
        { text: "進行中", value: "進行中" },
        { text: "已完成", value: "已完成" },
        { text: "取消", value: "取消" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "geekblue";
        if (status === "已完成") {
          color = "green";
        } else if (status === "取消") {
          color = "volcano";
        }
        return <Tag color={color}>{status}</Tag>;
      },
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showOrderDetails(record)}>
          查看詳情
        </Button>
      ),
      width: 120, // 設置固定寬度以避免溢出
      align: "center", // 居中對齊
    },
  ];

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = () => {
    // 您可以在此處實現更新訂單狀態的邏輯
    message.info("此功能暫未實現！");
  };

  return (
    <div className="order-management-container">
      <div className="order-management-filters">
        <Select
          placeholder="按狀態篩選"
          style={{ width: 200 }}
          onChange={handleStatusFilter}
          allowClear
        >
          <Option value="新訂單">新訂單</Option>
          <Option value="進行中">進行中</Option>
          <Option value="已完成">已完成</Option>
          <Option value="取消">取消</Option>
        </Select>
        <Input
          placeholder="搜索訂單編號、用戶或餐廳"
          style={{ width: 300 }}
          value={searchText}
          onChange={handleSearch}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }} // 設置橫向滾動，確保固定寬度列不會溢出
      />
      <Modal
        title={`訂單詳情：${selectedOrder?.orderId}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" type="primary" onClick={handleOk}>
            關閉
          </Button>,
          selectedOrder && (
            <Button key="update" type="primary" onClick={handleUpdateStatus}>
              更新狀態
            </Button>
          ),
        ]}
      >
        {selectedOrder && (
          <>
            <Paragraph>
              <strong>訂單編號：</strong> {selectedOrder.orderId}
            </Paragraph>
            <Paragraph>
              <strong>用戶姓名：</strong> {selectedOrder.userName}
            </Paragraph>
            <Paragraph>
              <strong>餐廳名稱：</strong> {selectedOrder.restaurantName}
            </Paragraph>
            <Paragraph>
              <strong>金額：</strong> NT$ {selectedOrder.amount}
            </Paragraph>
            <Paragraph>
              <strong>狀態：</strong> {selectedOrder.status}
            </Paragraph>
            <Paragraph>
              <strong>下單時間：</strong> {selectedOrder.orderTime}
            </Paragraph>
            <Paragraph>
              <strong>配送地址：</strong> {selectedOrder.deliveryAddress}
            </Paragraph>
            <Paragraph>
              <strong>配送員：</strong>{" "}
              {selectedOrder.deliveryInfo?.deliveryPerson ? (
                selectedOrder.deliveryInfo.deliveryPerson
              ) : (
                <Tag color="volcano">未分配</Tag>
              )}
            </Paragraph>
            <Paragraph>
              <strong>配送狀態：</strong>{" "}
              {selectedOrder.deliveryInfo?.deliveryStatus || "未分配"}
            </Paragraph>
            <Paragraph>
              <strong>預計配送時間：</strong>{" "}
              {selectedOrder.deliveryInfo?.deliveryTime || "未分配"}
            </Paragraph>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
