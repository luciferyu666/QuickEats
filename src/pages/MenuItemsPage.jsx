// src/pages/MenuItemsPage.jsx

import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Tag,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MenuItemsPage = () => {
  // 初始菜單項目資料
  const initialMenuItems = [
    {
      id: "M001",
      name: "炸雞漢堡",
      price: 120,
      stock: 50,
      description: "香脆炸雞搭配新鮮蔬菜",
      image: "/assets/images/fried-chicken-burger.png",
    },
    {
      id: "M002",
      name: "薯條",
      price: 50,
      stock: 100,
      description: "金黃酥脆的薯條",
      image: "/assets/images/fries.png",
    },
    {
      id: "M003",
      name: "可樂",
      price: 30,
      stock: 200,
      description: "冰涼爽口的可樂",
      image: "/assets/images/coke.png",
    },
    // 更多菜單項目...
  ];

  const [items, setItems] = useState(initialMenuItems);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form] = Form.useForm();

  // 打開新增項目的對話框
  const showAddModal = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 打開編輯項目的對話框
  const showEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  // 處理對話框的提交
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingItem) {
          // 編輯模式
          const updatedItems = items.map((item) =>
            item.id === editingItem.id ? { ...item, ...values } : item
          );
          setItems(updatedItems);
          message.success("菜單項目已更新");
        } else {
          // 新增模式
          // 自動生成菜單項目 ID
          const newId = `M${String(items.length + 1).padStart(3, "0")}`;
          // 檢查菜單名稱是否已存在（可選）
          const exists = items.some((item) => item.name === values.name);
          if (exists) {
            message.error("菜單名稱已存在，請使用其他名稱");
            return;
          }

          const newItem = {
            id: newId,
            name: values.name,
            price: Number(values.price),
            stock: Number(values.stock),
            description: values.description,
            image: values.image,
          };
          setItems([...items, newItem]);
          message.success("菜單項目已新增");
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 處理取消操作
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // 處理刪除項目
  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    message.success("菜單項目已刪除");
  };

  // 定義表格的欄位
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "菜名",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "價格 (元)",
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a, b) => a.price - b.price,
      render: (price) => <span>{price}</span>,
    },
    {
      title: "庫存",
      dataIndex: "stock",
      key: "stock",
      width: "10%",
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => <span>{stock}</span>,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      width: "25%",
      ellipsis: true,
    },
    {
      title: "圖片",
      dataIndex: "image",
      key: "image",
      width: "15%",
      render: (image) => (
        <img
          src={image}
          alt="菜單項目"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "操作",
      key: "actions",
      width: "10%",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => showEditModal(record)}
          >
            編輯
          </Button>
          <Popconfirm
            title="確定要刪除這個菜單項目嗎？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              刪除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>菜單項目管理</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        新增項目
      </Button>
      <Table
        dataSource={items}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingItem ? "編輯項目" : "新增項目"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="儲存"
      >
        <Form
          form={form}
          layout="vertical"
          name="menuItemForm"
          initialValues={{
            name: "",
            price: 0,
            stock: 0,
            description: "",
            image: "",
          }}
        >
          {/* 移除 ID 欄位，因為 ID 是自動生成的 */}

          <Form.Item
            name="name"
            label="菜名"
            rules={[
              {
                required: true,
                message: "請輸入菜名",
              },
            ]}
          >
            <Input placeholder="輸入菜名" />
          </Form.Item>

          <Form.Item
            name="price"
            label="價格 (元)"
            rules={[
              {
                required: true,
                message: "請輸入價格",
              },
              {
                type: "number",
                min: 0,
                message: "價格不能為負數",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input type="number" placeholder="輸入價格" />
          </Form.Item>

          <Form.Item
            name="stock"
            label="庫存"
            rules={[
              {
                required: true,
                message: "請輸入庫存",
              },
              {
                type: "number",
                min: 0,
                message: "庫存不能為負數",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input type="number" placeholder="輸入庫存" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[
              {
                required: false,
                message: "請輸入描述",
              },
            ]}
          >
            <Input.TextArea
              placeholder="輸入描述"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="圖片路徑"
            rules={[
              {
                required: false,
                message: "請輸入圖片路徑",
              },
              {
                type: "url",
                message: "請輸入有效的URL地址",
              },
            ]}
          >
            <Input placeholder="輸入圖片路徑 (例如：/assets/images/menu1.png)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuItemsPage;
