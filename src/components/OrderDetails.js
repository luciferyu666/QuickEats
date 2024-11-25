// src/components/OrderDetails.js

import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Descriptions,
  Table,
  Tag,
  Select,
  Button,
  Space,
  message,
} from "antd";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const OrderDetails = ({ visible, onClose, order, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(order ? order.status : "");
  const [operationLogs, setOperationLogs] = useState([]);

  // 定義狀態的顏色
  const getStatusColor = (status) => {
    switch (status) {
      case "新訂單":
        return "red";
      case "準備中":
        return "orange";
      case "等待配送":
        return "blue";
      case "已完成":
        return "green";
      case "已取消":
        return "volcano";
      default:
        return "default";
    }
  };

  // 初始化操作記錄
  useEffect(() => {
    if (order) {
      // 假設訂單創建時有一條操作記錄
      setOperationLogs([
        {
          key: 1,
          time: new Date(order.timestamp).toLocaleString(),
          operator: "系統",
          action: "創建訂單",
          status: order.status,
        },
      ]);
      setCurrentStatus(order.status);
    }
  }, [order]);

  // 處理狀態變更
  const handleStatusChange = (value) => {
    if (value === currentStatus) {
      message.warning("訂單狀態未發生變化！");
      return;
    }

    // 更新當前狀態
    setCurrentStatus(value);

    // 調用父組件的狀態更新函數
    onUpdateStatus(order.orderId, value);

    // 添加操作記錄
    const newLog = {
      key: operationLogs.length + 1,
      time: new Date().toLocaleString(),
      operator: "管理員",
      action: `將狀態從 "${currentStatus}" 更新為 "${value}"`,
      status: value,
    };
    setOperationLogs([newLog, ...operationLogs]);

    message.success(`訂單狀態已更新為 "${value}"！`);
  };

  // 定義操作記錄表格列
  const logColumns = [
    {
      title: "時間",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "操作人員",
      dataIndex: "operator",
      key: "operator",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
  ];

  if (!order) return null;

  return (
    <Modal
      visible={visible}
      title={`訂單詳情 - ${order.orderId}`}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          關閉
        </Button>,
      ]}
      width={800}
    >
      <Typography>
        <Title level={4}>用戶信息</Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="用戶姓名">
            {order.userName}
          </Descriptions.Item>
          <Descriptions.Item label="用戶地址">
            {order.userAddress}
          </Descriptions.Item>
          {/* 假設有聯絡方式字段，如果有的話 */}
          {/* <Descriptions.Item label="聯絡電話">{order.userPhone}</Descriptions.Item> */}
        </Descriptions>

        <Title level={4} style={{ marginTop: "20px" }}>
          訂單項目
        </Title>
        <Table
          dataSource={order.orderItems}
          columns={[
            {
              title: "菜品名稱",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "數量",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "單價",
              dataIndex: "price",
              key: "price",
              render: (price) => `NT$ ${price}`,
            },
            {
              title: "小計",
              key: "subtotal",
              render: (_, record) => `NT$ ${record.price * record.quantity}`,
            },
          ]}
          pagination={false}
          rowKey="name"
        />
        <Paragraph style={{ textAlign: "right", marginTop: "10px" }}>
          <strong>總金額：</strong> NT$ {order.totalAmount}
        </Paragraph>

        <Title level={4} style={{ marginTop: "20px" }}>
          支付方式
        </Title>
        <Paragraph>{order.paymentMethod || "現金"}</Paragraph>

        <Title level={4} style={{ marginTop: "20px" }}>
          配送信息
        </Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="配送地址">
            {order.restaurantAddress}
          </Descriptions.Item>
          <Descriptions.Item label="配送距離">
            {order.distance}
          </Descriptions.Item>
          <Descriptions.Item label="預計配送時間">
            {order.estimatedTime}
          </Descriptions.Item>
        </Descriptions>

        <Title level={4} style={{ marginTop: "20px" }}>
          狀態更新
        </Title>
        <Select
          value={currentStatus}
          onChange={handleStatusChange}
          style={{ width: 200 }}
        >
          {getNextStatuses(currentStatus).map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>

        <Title level={4} style={{ marginTop: "20px" }}>
          操作記錄
        </Title>
        <Table
          dataSource={operationLogs}
          columns={logColumns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </Typography>
    </Modal>
  );
};

// 定義可以轉換到的下一個狀態
const getNextStatuses = (currentStatus) => {
  switch (currentStatus) {
    case "新訂單":
      return ["準備中", "已取消"];
    case "準備中":
      return ["等待配送", "已取消"];
    case "等待配送":
      return ["已完成"];
    case "已完成":
      return [];
    case "已取消":
      return [];
    default:
      return [];
  }
};

export default OrderDetails;
