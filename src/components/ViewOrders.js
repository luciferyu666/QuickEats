// src/components/ViewOrders.js

import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Typography,
  Input,
  Dropdown,
  Menu,
  message,
} from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { allOrders } from "../data/mockData"; // 模擬數據
import dayjs from "dayjs";

const { Text } = Typography;

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setOrders(allOrders);
    setFilteredOrders(allOrders);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    if (value === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.userName.toLowerCase().includes(value) ||
          order.orderId.toLowerCase().includes(value)
      );
      setFilteredOrders(filtered);
    }
  };

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

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    const updatedFilteredOrders = filteredOrders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setFilteredOrders(updatedFilteredOrders);

    message.success(`訂單 ${orderId} 狀態已更新為 ${newStatus}`);
  };

  const handleBatchUpdateStatus = (newStatus) => {
    if (selectedRowKeys.length === 0) {
      message.error("請先選擇訂單！");
      return;
    }

    const updatedOrders = orders.map((order) =>
      selectedRowKeys.includes(order.orderId)
        ? { ...order, status: newStatus }
        : order
    );
    setOrders(updatedOrders);

    const updatedFilteredOrders = filteredOrders.map((order) =>
      selectedRowKeys.includes(order.orderId)
        ? { ...order, status: newStatus }
        : order
    );
    setFilteredOrders(updatedFilteredOrders);

    setSelectedRowKeys([]);
    message.success(`選擇的訂單狀態已更新為 ${newStatus}`);
  };

  const columns = [
    {
      title: "訂單編號",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
    },
    {
      title: "客戶名稱",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      title: "訂單總額 (NT$)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount) => <Text>{amount}</Text>,
    },
    {
      title: "訂單狀態",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "待處理", value: "待處理" },
        { text: "已處理", value: "已處理" },
        { text: "已完成", value: "已完成" },
        { text: "已取消", value: "已取消" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "geekblue";
        if (status === "已完成") {
          color = "green";
        } else if (status === "已取消") {
          color = "volcano";
        } else if (status === "待處理") {
          color = "orange";
        } else if (status === "已處理") {
          color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "訂單時間",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a, b) => dayjs(a.timestamp).unix() - dayjs(b.timestamp).unix(),
      render: (timestamp) => dayjs(timestamp).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showOrderDetails(record)}>
            查看詳情
          </Button>
          <Dropdown
            overlay={
              <Menu
                onClick={(e) => handleUpdateStatus(record.orderId, e.key)}
                items={[
                  { label: "設為已處理", key: "已處理" },
                  { label: "設為已完成", key: "已完成" },
                  { label: "設為已取消", key: "已取消" },
                ]}
              />
            }
          >
            <Button>
              更新狀態 <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const menu = (
    <Menu
      onClick={(e) => handleBatchUpdateStatus(e.key)}
      items={[
        { label: "設為已處理", key: "已處理" },
        { label: "設為已完成", key: "已完成" },
        { label: "設為已取消", key: "已取消" },
      ]}
    />
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 搜索欄 */}
      <Input
        placeholder="搜尋訂單編號或客戶名稱"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px" }}
        allowClear
      />

      {/* 批量更新按鈕 */}
      <Space style={{ marginBottom: 16 }}>
        <Dropdown overlay={menu}>
          <Button>
            批量更新狀態 <DownOutlined />
          </Button>
        </Dropdown>
      </Space>

      {/* 訂單表格 */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredOrders}
        rowKey="orderId"
        pagination={{ pageSize: 10 }}
      />

      {/* 訂單詳情模態框 */}
      <Modal
        title={`訂單詳情 - ${selectedOrder?.orderId}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            確定
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <Text strong>客戶名稱:</Text> {selectedOrder.userName}
            <br />
            <Text strong>客戶郵箱:</Text> {selectedOrder.userEmail}
            <br />
            <Text strong>客戶電話:</Text> {selectedOrder.userPhone}
            <br />
            <Text strong>餐廳名稱:</Text> {selectedOrder.restaurant}
            <br />
            <Text strong>餐廳地址:</Text> {selectedOrder.restaurantAddress}
            <br />
            <Text strong>訂單項目:</Text>
            <ul>
              {selectedOrder.orderItems.map((item, index) => (
                <li key={index}>
                  {item.name} - 數量: {item.quantity} - 價格: {item.price} NT$
                </li>
              ))}
            </ul>
            <Text strong>訂單總額:</Text> {selectedOrder.totalAmount} NT$
            <br />
            <Text strong>訂單狀態:</Text> {selectedOrder.status}
            <br />
            <Text strong>訂單時間:</Text>{" "}
            {dayjs(selectedOrder.timestamp).format("YYYY-MM-DD HH:mm")}
            <br />
            <Text strong>配送員:</Text>{" "}
            {selectedOrder.deliveryInfo.deliveryPerson || "尚未分配"}
            <br />
            <Text strong>配送狀態:</Text>{" "}
            {selectedOrder.deliveryInfo.deliveryStatus}
            <br />
            <Text strong>預計配送時間:</Text>{" "}
            {selectedOrder.deliveryInfo.deliveryTime || "N/A"}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewOrders;
