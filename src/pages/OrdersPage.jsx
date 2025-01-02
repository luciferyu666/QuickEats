// src/pages/OrdersPage.jsx

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
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const OrdersPage = () => {
  // 初始訂單資料
  const initialOrders = [
    {
      orderId: "ORD001",
      userName: "John Doe",
      status: "Pending",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      timestamp: "2025-01-01 10:00",
    },
    {
      orderId: "ORD002",
      userName: "Jane Smith",
      status: "Processing",
      address: "高雄市鳳山區經武路34巷1號",
      timestamp: "2025-01-02 14:30",
    },
    {
      orderId: "ORD003",
      userName: "Alice Johnson",
      status: "Completed",
      address: "高雄市政府消防局第三大隊鳳山分隊 830高雄市鳳山區經武路36號",
      timestamp: "2025-01-03 09:15",
    },
    // 更多訂單資料...
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [form] = Form.useForm();

  // 打開新增訂單的對話框
  const showAddModal = () => {
    setEditingOrder(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 打開編輯訂單的對話框
  const showEditModal = (order) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setIsModalVisible(true);
  };

  // 處理對話框的提交
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingOrder) {
          // 編輯模式
          const updatedOrders = orders.map((order) =>
            order.orderId === editingOrder.orderId
              ? { ...order, ...values }
              : order
          );
          setOrders(updatedOrders);
          message.success("訂單資料已更新");
        } else {
          // 新增模式
          // 自動生成訂單 ID
          const newId = `ORD${String(orders.length + 1).padStart(3, "0")}`;
          // 檢查用戶名稱是否已存在（可選）
          const exists = orders.some(
            (order) => order.userName === values.userName
          );
          if (exists) {
            message.error("用戶名稱已存在，請使用其他名稱");
            return;
          }

          const newOrder = {
            orderId: newId,
            userName: values.userName,
            status: values.status,
            address: values.address,
            timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
          };
          setOrders([...orders, newOrder]);
          message.success("訂單已新增");
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

  // 處理刪除訂單
  const handleDelete = (orderId) => {
    const filteredOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(filteredOrders);
    message.success("訂單已刪除");
  };

  // 定義表格的欄位
  const columns = [
    {
      title: "訂單 ID",
      dataIndex: "orderId",
      key: "orderId",
      width: "15%",
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "用戶名稱",
      dataIndex: "userName",
      key: "userName",
      width: "20%",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      width: "15%",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Completed", value: "Completed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        let color = "geekblue";
        if (status === "Completed") {
          color = "green";
        } else if (status === "Cancelled") {
          color = "volcano";
        } else if (status === "Pending") {
          color = "gold";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      width: "30%",
      sorter: (a, b) => a.address.localeCompare(b.address),
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "時間戳記",
      dataIndex: "timestamp",
      key: "timestamp",
      width: "15%",
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "操作",
      key: "actions",
      width: "15%",
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
            title="確定要刪除這個訂單嗎？"
            onConfirm={() => handleDelete(record.orderId)}
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
      <h2>訂單資料管理</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        新增訂單
      </Button>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="orderId"
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingOrder ? "編輯訂單" : "新增訂單"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="儲存"
      >
        <Form
          form={form}
          layout="vertical"
          name="orderForm"
          initialValues={{
            userName: "",
            status: "Pending",
            address: "",
          }}
        >
          {/* 移除 orderId 欄位，因為 ID 是自動生成的 */}

          <Form.Item
            name="userName"
            label="用戶名稱"
            rules={[
              {
                required: true,
                message: "請輸入用戶名稱",
              },
            ]}
          >
            <Input placeholder="輸入用戶名稱" />
          </Form.Item>

          <Form.Item
            name="status"
            label="狀態"
            rules={[
              {
                required: true,
                message: "請選擇訂單狀態",
              },
            ]}
          >
            <Select placeholder="選擇狀態">
              <Option value="Pending">Pending</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            label="地址"
            rules={[
              {
                required: false,
                message: "請輸入地址",
              },
            ]}
          >
            <Input.TextArea
              placeholder="輸入地址"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrdersPage;
