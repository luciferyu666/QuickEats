// src/components/RecentOrders.js

import React from "react";
import { List, Tag, Button } from "antd";

// 定義狀態的顏色
const getStatusColor = (status) => {
  switch (status) {
    case "待處理":
      return "orange";
    case "已處理":
      return "blue";
    case "已完成":
      return "green";
    case "已取消":
      return "volcano";
    default:
      return "default";
  }
};

const RecentOrders = ({ orders, onViewDetails }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={orders}
      locale={{ emptyText: "目前沒有最近的訂單。" }}
      renderItem={(order) => (
        <List.Item
          key={order.orderId}
          actions={[
            <Tag color={getStatusColor(order.status)} key="status">
              {order.status}
            </Tag>,
            <Button
              type="link"
              onClick={() => onViewDetails(order)}
              key="details"
            >
              查看詳情
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={`訂單編號：${order.orderId}`}
            description={`訂單日期：${order.date} | 總金額：NT$${order.totalAmount}`}
          />
          {/* 顯示訂單項目詳情 */}
          {order.orderItems && order.orderItems.length > 0 ? (
            <List
              dataSource={order.orderItems}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    }
                    title={`${item.name} x ${item.quantity}`}
                    description={`小計：NT$${(item.price * item.quantity).toFixed(2)}`}
                  />
                </List.Item>
              )}
              size="small"
              bordered
              style={{ marginTop: 10 }}
            />
          ) : (
            <p>無訂單項目。</p>
          )}
        </List.Item>
      )}
    />
  );
};

export default RecentOrders;
