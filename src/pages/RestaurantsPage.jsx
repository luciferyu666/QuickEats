// src/pages/RestaurantsPage.jsx

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
  Rate,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid

const { Option } = Select;

const RestaurantsPage = () => {
  // 初始餐廳資料，包含指定的餐廳商家資訊
  const initialRestaurants = [
    {
      id: "rest1",
      name: "享受韓國料理餐酒館",
      cuisine: "韓國料理",
      rating: 4.5,
      status: "營業中",
      image: "/assets/images/restaurant1.png",
      url: "https://www.example.com/restaurant1",
    },
    {
      id: "rest2",
      name: "庒稼村食品行",
      cuisine: "日本料理",
      rating: 4.8,
      status: "營業中",
      image: "/assets/images/restaurant2.png",
      url: "https://www.example.com/restaurant2",
    },
    {
      id: "rest3",
      name: "灃海餐廳有限公司",
      cuisine: "海鮮料理",
      rating: 4.6,
      status: "營業中",
      image: "/assets/images/restaurant3.png",
      url: "https://www.example.com/restaurant3",
    },
    {
      id: "rest4",
      name: "金赫家韓食",
      cuisine: "韓國料理",
      rating: 4.7,
      status: "營業中",
      image: "/assets/images/restaurant4.png",
      url: "https://www.example.com/restaurant4",
    },
    {
      id: "rest5",
      name: "精隨食品行",
      cuisine: "中式料理",
      rating: 4.4,
      status: "營業中",
      image: "/assets/images/restaurant5.png",
      url: "https://www.example.com/restaurant5",
    },
    {
      id: "rest6",
      name: "穎香企業",
      cuisine: "中式料理",
      rating: 4.3,
      status: "營業中",
      image: "/assets/images/restaurant6.png",
      url: "https://www.example.com/restaurant6",
    },
    // 更多餐廳數據...
  ];

  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const [form] = Form.useForm();

  // 打開新增餐廳的對話框
  const showAddModal = () => {
    setEditingRestaurant(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 打開編輯餐廳的對話框
  const showEditModal = (restaurant) => {
    setEditingRestaurant(restaurant);
    form.setFieldsValue({
      ...restaurant,
      rating: restaurant.rating,
    });
    setIsModalVisible(true);
  };

  // 處理對話框的提交
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values); // 調試日誌
        if (editingRestaurant) {
          // 編輯模式
          const updatedRestaurants = restaurants.map((rest) =>
            rest.id === editingRestaurant.id ? { ...rest, ...values } : rest
          );
          setRestaurants(updatedRestaurants);
          message.success("餐廳資料已更新");
        } else {
          // 新增模式
          // 自動生成餐廳 ID 使用 uuid
          const newId = uuidv4();
          console.log("New Restaurant ID:", newId); // 調試日誌

          // 檢查餐廳名稱是否已存在（可選）
          const exists = restaurants.some((rest) => rest.name === values.name);
          if (exists) {
            message.error("餐廳名稱已存在，請使用其他名稱");
            return;
          }

          const newRestaurant = {
            id: newId,
            name: values.name,
            cuisine: values.cuisine,
            rating: values.rating,
            status: values.status,
            image: values.image,
            url: values.url, // 添加網址
          };
          console.log("New Restaurant:", newRestaurant); // 調試日誌

          setRestaurants([...restaurants, newRestaurant]);
          message.success("餐廳已新增");
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

  // 處理刪除餐廳
  const handleDelete = (id) => {
    const filteredRestaurants = restaurants.filter((rest) => rest.id !== id);
    setRestaurants(filteredRestaurants);
    message.success("餐廳已刪除");
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
      title: "名稱",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <a
          href={`https://www.gco2go.com/portal_c1_cnt.php?owner_num=c1_67388&button_num=c1&folder_id=${getFolderId(
            record.name
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "料理類型",
      dataIndex: "cuisine",
      key: "cuisine",
      width: "15%",
      filters: [
        { text: "韓國料理", value: "韓國料理" },
        { text: "日本料理", value: "日本料理" },
        { text: "中式", value: "中式" },
        { text: "義大利料理", value: "義大利料理" },
        { text: "美式料理", value: "美式料理" },
        // 更多篩選選項...
      ],
      onFilter: (value, record) => record.cuisine === value,
      sorter: (a, b) => a.cuisine.localeCompare(b.cuisine),
    },
    {
      title: "評分",
      dataIndex: "rating",
      key: "rating",
      width: "15%",
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => <Rate disabled allowHalf value={rating} />, // 修改為使用 `value` 而非 `defaultValue`
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      width: "10%",
      filters: [
        { text: "營業中", value: "營業中" },
        { text: "休息中", value: "休息中" },
        // 更多篩選選項...
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        let color = "green";
        if (status === "休息中") {
          color = "volcano";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "圖片",
      dataIndex: "image",
      key: "image",
      width: "15%",
      render: (image) => (
        <img
          src={image}
          alt="餐廳"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "網址", // 新增網址欄位
      dataIndex: "url",
      key: "url",
      width: "20%",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : (
          <Tag color="orange">未提供</Tag>
        ),
    },
    {
      title: "操作",
      key: "actions",
      width: "25%",
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
            title="確定要刪除這個餐廳嗎？"
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

  // 根據餐廳名稱返回對應的 folder_id
  const getFolderId = (name) => {
    const mapping = {
      庒稼村食品行: "101748",
      灃海餐廳有限公司: "101208",
      享受韓國料理餐酒館: "101201",
      金赫家韓食: "101742",
      精隨食品行: "101743",
      穎香企業: "101747",
      // 添加更多映射
    };
    return mapping[name] || "101000"; // 默認 folder_id
  };

  // 調試日誌：確認餐廳列表
  console.log("Restaurants List:", restaurants);

  return (
    <div style={{ padding: "24px" }}>
      <h2>餐廳資料管理</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        新增餐廳
      </Button>
      <Table
        dataSource={restaurants}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingRestaurant ? "編輯餐廳" : "新增餐廳"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="儲存"
      >
        <Form
          form={form}
          layout="vertical"
          name="restaurantForm"
          initialValues={{
            name: "",
            cuisine: "",
            rating: 0,
            status: "營業中",
            image: "",
            url: "", // 新增初始值
          }}
        >
          {/* 移除 ID 欄位，因為 ID 是自動生成的 */}

          <Form.Item
            name="name"
            label="名稱"
            rules={[
              {
                required: true,
                message: "請輸入餐廳名稱",
              },
            ]}
          >
            <Input placeholder="輸入餐廳名稱" />
          </Form.Item>

          <Form.Item
            name="cuisine"
            label="料理類型"
            rules={[
              {
                required: true,
                message: "請選擇料理類型",
              },
            ]}
          >
            <Select placeholder="選擇料理類型">
              <Option value="韓國料理">韓國料理</Option>
              <Option value="日本料理">日本料理</Option>
              <Option value="中式">中式</Option>
              <Option value="義大利料理">義大利料理</Option>
              <Option value="美式料理">美式料理</Option>
              {/* 更多選項 */}
            </Select>
          </Form.Item>

          <Form.Item
            name="rating"
            label="評分"
            rules={[
              {
                required: true,
                message: "請輸入評分",
              },
              {
                type: "number",
                min: 0,
                max: 5,
                message: "評分範圍為 0 到 5",
              },
            ]}
          >
            <Rate allowHalf />
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
            <Select placeholder="選擇狀態">
              <Option value="營業中">營業中</Option>
              <Option value="休息中">休息中</Option>
              {/* 更多選項 */}
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="圖片路徑"
            rules={[
              {
                required: true,
                message: "請輸入圖片路徑",
              },
              // 使用自定義驗證規則
              {
                validator: (_, value) => {
                  if (
                    !value ||
                    /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(value) ||
                    /^\/assets\/images\/.+\.(jpg|jpeg|png|gif)$/.test(value)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject("請輸入有效的 URL 地址或相對路徑");
                },
              },
            ]}
          >
            <Input placeholder="輸入圖片路徑 (例如：https://www.example.com/restaurant1.png 或 /assets/images/restaurant1.png)" />
          </Form.Item>

          {/* 新增餐廳網址欄位 */}
          <Form.Item
            name="url"
            label="餐廳網址"
            rules={[
              {
                required: true,
                message: "請輸入餐廳網址",
              },
              {
                type: "url",
                message: "請輸入有效的 URL 地址",
              },
            ]}
          >
            <Input placeholder="輸入餐廳網址 (例如：https://www.example.com)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RestaurantsPage;
