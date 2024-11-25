// src/components/admin/UserManagement.js

import React, { useState } from "react";
import { Table, Tag, Button, Modal, Typography, Input, message } from "antd";
import { adminUsers } from "../../data/mockData"; // 使用命名導入
import "./UserManagement.css";

const { Paragraph } = Typography;

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 處理搜索輸入變化
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // 過濾用戶列表，實現大小寫不敏感的搜索
  const filteredUsers = adminUsers.filter((user) => {
    const lowerSearchText = searchText.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerSearchText) ||
      user.email.toLowerCase().includes(lowerSearchText) ||
      user.role.toLowerCase().includes(lowerSearchText)
    );
  });

  // 定義表格列
  const columns = [
    {
      title: "用戶姓名",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // 添加排序功能
      ellipsis: true, // 添加省略號
    },
    {
      title: "電子郵件",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email), // 添加排序功能
      ellipsis: true, // 添加省略號
    },
    {
      title: "註冊日期",
      dataIndex: "registrationDate",
      key: "registrationDate",
      sorter: (a, b) =>
        new Date(a.registrationDate) - new Date(b.registrationDate), // 添加排序功能
      ellipsis: true, // 添加省略號
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "普通用戶", value: "普通用戶" },
        { text: "高級用戶", value: "高級用戶" },
        { text: "餐廳管理員", value: "餐廳管理員" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color = "blue";
        if (role === "高級用戶") {
          color = "green";
        } else if (role === "餐廳管理員") {
          color = "volcano";
        }
        return <Tag color={color}>{role}</Tag>;
      },
      ellipsis: true, // 添加省略號
    },
    {
      title: "訂單數量",
      dataIndex: "orderCount",
      key: "orderCount",
      sorter: (a, b) => a.orderCount - b.orderCount, // 添加排序功能
      ellipsis: true, // 添加省略號
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showUserDetails(record)}>
          查看詳情
        </Button>
      ),
      width: 120, // 設置固定寬度以避免溢出
      align: "center", // 居中對齊
    },
  ];

  // 顯示用戶詳情的函數
  const showUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // 處理模態框確認
  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // 處理模態框取消
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // 處理封禁用戶的函數（目前僅顯示提示，可擴展）
  const handleBanUser = () => {
    message.info("此功能暫未實現！");
  };

  return (
    <>
      <Input
        placeholder="搜索用戶姓名、電子郵件或角色"
        style={{ marginBottom: "16px", width: "300px" }}
        value={searchText}
        onChange={handleSearch}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }} // 設置橫向滾動，確保固定寬度列不會溢出
      />
      <Modal
        title="用戶詳情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" type="primary" onClick={handleOk}>
            關閉
          </Button>,
          selectedUser && (
            <Button key="ban" type="danger" onClick={handleBanUser}>
              封禁帳戶
            </Button>
          ),
        ]}
      >
        {selectedUser && (
          <>
            <Paragraph>
              <strong>用戶姓名：</strong> {selectedUser.name}
            </Paragraph>
            <Paragraph>
              <strong>電子郵件：</strong> {selectedUser.email}
            </Paragraph>
            <Paragraph>
              <strong>註冊日期：</strong> {selectedUser.registrationDate}
            </Paragraph>
            <Paragraph>
              <strong>角色：</strong> {selectedUser.role}
            </Paragraph>
            <Paragraph>
              <strong>訂單數量：</strong> {selectedUser.orderCount}
            </Paragraph>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserManagement;
