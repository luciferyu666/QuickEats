// src/pages/DeliveryPage.jsx

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

const DeliveryPage = () => {
  // 初始外送員資料
  const initialDelivery = [
    {
      id: "D001",
      name: "張三",
      phone: "0912345678",
      vehicle: "機車",
      status: "可用",
      joinedDate: "2024-12-01",
    },
    {
      id: "D002",
      name: "李四",
      phone: "0987654321",
      vehicle: "汽車",
      status: "不可用",
      joinedDate: "2024-11-15",
    },
    {
      id: "D003",
      name: "王五",
      phone: "0922334455",
      vehicle: "腳踏車",
      status: "可用",
      joinedDate: "2024-10-20",
    },
    // 更多外送員資料...
  ];

  const [deliveryList, setDeliveryList] = useState(initialDelivery);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);

  const [form] = Form.useForm();

  // 打開新增外送員的對話框
  const showAddModal = () => {
    setEditingDelivery(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 打開編輯外送員的對話框
  const showEditModal = (delivery) => {
    setEditingDelivery(delivery);
    form.setFieldsValue(delivery);
    setIsModalVisible(true);
  };

  // 處理對話框的提交
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingDelivery) {
          // 編輯模式
          const updatedDelivery = deliveryList.map((item) =>
            item.id === editingDelivery.id ? { ...item, ...values } : item
          );
          setDeliveryList(updatedDelivery);
          message.success("外送員資料已更新");
        } else {
          // 新增模式
          // 自動生成外送員 ID
          const newId = `D${String(deliveryList.length + 1).padStart(3, "0")}`;
          // 檢查外送員名稱是否已存在（可選）
          const exists = deliveryList.some((item) => item.name === values.name);
          if (exists) {
            message.error("外送員名稱已存在，請使用其他名稱");
            return;
          }

          const newDelivery = {
            id: newId,
            name: values.name,
            phone: values.phone,
            vehicle: values.vehicle,
            status: "可用",
            joinedDate: new Date().toISOString().split("T")[0],
          };
          setDeliveryList([...deliveryList, newDelivery]);
          message.success("外送員已新增");
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

  // 處理刪除外送員
  const handleDelete = (id) => {
    const filteredDelivery = deliveryList.filter((item) => item.id !== id);
    setDeliveryList(filteredDelivery);
    message.success("外送員已刪除");
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
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "電話",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "交通工具",
      dataIndex: "vehicle",
      key: "vehicle",
      width: "15%",
      sorter: (a, b) => a.vehicle.localeCompare(b.vehicle),
      filters: [
        { text: "腳踏車", value: "腳踏車" },
        { text: "機車", value: "機車" },
        { text: "汽車", value: "汽車" },
      ],
      onFilter: (value, record) => record.vehicle === value,
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      width: "10%",
      filters: [
        { text: "可用", value: "可用" },
        { text: "不可用", value: "不可用" },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        let color = status === "可用" ? "green" : "volcano";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "加入日期",
      dataIndex: "joinedDate",
      key: "joinedDate",
      width: "15%",
      sorter: (a, b) => new Date(a.joinedDate) - new Date(b.joinedDate),
      render: (text) => new Date(text).toLocaleDateString(),
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
            title="確定要刪除這個外送員嗎？"
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
      <h2>外送員資訊管理</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        新增外送員
      </Button>
      <Table
        dataSource={deliveryList}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingDelivery ? "編輯外送員" : "新增外送員"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="儲存"
      >
        <Form
          form={form}
          layout="vertical"
          name="deliveryForm"
          initialValues={{
            name: "",
            phone: "",
            vehicle: "",
            status: "可用",
          }}
        >
          {/* 移除 ID 欄位，因為 ID 是自動生成的 */}

          <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: "請輸入姓名",
              },
            ]}
          >
            <Input placeholder="輸入姓名" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="電話"
            rules={[
              {
                required: true,
                message: "請輸入電話",
              },
              {
                pattern: /^09\d{8}$/,
                message: "電話格式應為09開頭的10位數字",
              },
            ]}
          >
            <Input placeholder="輸入電話" />
          </Form.Item>

          <Form.Item
            name="vehicle"
            label="交通工具"
            rules={[
              {
                required: true,
                message: "請選擇交通工具",
              },
            ]}
          >
            <Select placeholder="選擇交通工具">
              <Option value="機車">機車</Option>
              <Option value="汽車">汽車</Option>
              <Option value="腳踏車">腳踏車</Option>
              {/* 更多選項 */}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="狀態"
            rules={[
              {
                required: true,
                message: "請選擇狀態",
              },
            ]}
          >
            <Select disabled>
              <Option value="可用">可用</Option>
              <Option value="不可用">不可用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeliveryPage;
