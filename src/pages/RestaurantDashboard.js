// src/pages/RestaurantDashboard.js

import React, { useState, useRef } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Space,
  Popconfirm,
  message,
} from "antd";
import {
  DownloadOutlined,
  FilePdfOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RevenueReports from "../components/RevenueReports"; // 引入 RevenueReports 組件
import UserReviews from "../components/UserReviews"; // 引入 UserReviews 組件
import Settings from "../components/Settings"; // 引入 Settings 組件
import OrderDetails from "../components/OrderDetails"; // 引入 OrderDetails 組件
import OperatingHours from "../components/OperatingHours"; // 引入 OperatingHours 組件
import {
  menuItems as mockMenuItems,
  restaurantOrders as mockRestaurantOrders,
  completedOrders as mockCompletedOrders, // 引入已完成訂單模擬數據
  menuCategories as mockMenuCategories,
  userReviews as mockUserReviews,
  operatingHours as mockOperatingHours,
} from "../data/mockData";

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { Option } = Select;

const RestaurantDashboard = () => {
  // ==================== 菜單管理狀態 ====================
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [menuCategories, setMenuCategories] = useState(mockMenuCategories);
  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
  const [isEditMenu, setIsEditMenu] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuForm] = Form.useForm();

  // ==================== 訂單管理狀態 ====================
  const [orders, setOrders] = useState(mockRestaurantOrders);
  const [orderFilter, setOrderFilter] = useState("All");

  // ==================== 已完成訂單狀態 ====================
  const [completedOrders, setCompletedOrders] = useState(mockCompletedOrders);

  // ==================== 訂單詳情狀態 ====================
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ==================== 用戶評價管理狀態 ====================
  const [userReviews, setUserReviews] = useState(mockUserReviews);

  // ==================== 營業時間管理狀態 ====================
  const [regularHours, setRegularHours] = useState(mockOperatingHours.regular);
  const [specialDates, setSpecialDates] = useState(
    mockOperatingHours.specialDates
  );

  // ==================== 參考區域 ====================
  const orderManagementRef = useRef(null);
  const updateOrderStatusRef = useRef(null);

  // ==================== 菜單管理相關函數 ====================

  // 顯示新增菜品模態框
  const showAddMenuModal = () => {
    setIsEditMenu(false);
    menuForm.resetFields();
    setIsMenuModalVisible(true);
  };

  // 顯示編輯菜品模態框
  const showEditMenuModal = (record) => {
    setIsEditMenu(true);
    setEditingMenuItem(record);
    menuForm.setFieldsValue({
      name: record.name,
      description: record.description,
      price: record.price,
      image: record.image,
      tags: record.tags,
      categoryId: record.categoryId,
    });
    setIsMenuModalVisible(true);
  };

  // 處理菜品模態框提交
  const handleMenuModalOk = () => {
    menuForm
      .validateFields()
      .then((values) => {
        if (isEditMenu) {
          // 編輯菜品
          setMenuItems((prev) =>
            prev.map((item) =>
              item.id === editingMenuItem.id ? { ...item, ...values } : item
            )
          );
          message.success("菜品已更新！");
        } else {
          // 新增菜品
          const newMenuItem = {
            id: `menu${menuItems.length + 1}`,
            ...values,
          };
          setMenuItems((prev) => [...prev, newMenuItem]);
          message.success("菜品已新增！");
        }
        setIsMenuModalVisible(false);
        menuForm.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 處理菜品模態框取消
  const handleMenuModalCancel = () => {
    setIsMenuModalVisible(false);
    menuForm.resetFields();
  };

  // 刪除菜品
  const handleDeleteMenu = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    message.success("菜品已刪除！");
  };

  // ==================== 訂單管理相關函數 ====================

  // 更新訂單狀態
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );

    // 如果訂單被標記為已完成，將其移動到 completedOrders
    if (newStatus === "已完成") {
      const completedOrder = orders.find((order) => order.orderId === orderId);
      if (completedOrder) {
        setCompletedOrders((prev) => [...prev, completedOrder]);
        setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
      }
    }

    message.success(`訂單狀態已更新為 ${newStatus}！`);
  };

  // 顯示訂單詳情模態框
  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsVisible(true);
  };

  // 關閉訂單詳情模態框
  const handleOrderDetailsClose = () => {
    setIsOrderDetailsVisible(false);
    setSelectedOrder(null);
  };

  // 定義菜單表格列
  const menuColumns = [
    {
      title: "菜品名稱",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "價格",
      dataIndex: "price",
      key: "price",
      render: (price) => `NT$ ${price}`,
    },
    {
      title: "標籤",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "分類",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => {
        const category = menuCategories.find((cat) => cat.id === categoryId);
        return category ? category.name : "未分類";
      },
    },
    {
      title: "圖片",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="菜品" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "操作",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showEditMenuModal(record)}>
            編輯
          </Button>
          <Popconfirm
            title="確定要刪除這個菜品嗎？"
            onConfirm={() => handleDeleteMenu(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger>
              刪除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 定義訂單表格列
  const orderColumns = [
    {
      title: "訂單編號",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "用戶姓名",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "用戶地址",
      dataIndex: "userAddress",
      key: "userAddress",
    },
    {
      title: "訂單項目",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) => (
        <>
          {orderItems.map((item, index) => (
            <div key={index}>
              {item.name} x {item.quantity} (NT$ {item.price * item.quantity})
            </div>
          ))}
        </>
      ),
    },
    {
      title: "總金額",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `NT$ ${amount}`,
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "新訂單", value: "新訂單" },
        { text: "準備中", value: "準備中" },
        { text: "等待配送", value: "等待配送" },
        { text: "已完成", value: "已完成" },
        { text: "已取消", value: "已取消" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "default";
        if (status === "新訂單") color = "red";
        if (status === "準備中") color = "orange";
        if (status === "等待配送") color = "blue";
        if (status === "已完成") color = "green";
        if (status === "已取消") color = "volcano";
        return <Tag color={color}>{status}</Tag>;
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "操作",
      key: "actions",
      render: (_, record) => {
        let actions = [];
        if (record.status === "新訂單") {
          actions.push(
            <Button
              type="link"
              onClick={() => updateOrderStatus(record.orderId, "準備中")}
              key="prepare"
            >
              準備中
            </Button>
          );
          actions.push(
            <Button
              type="link"
              danger
              onClick={() => updateOrderStatus(record.orderId, "已取消")}
              key="cancel"
            >
              取消
            </Button>
          );
        } else if (record.status === "準備中") {
          actions.push(
            <Button
              type="link"
              onClick={() => updateOrderStatus(record.orderId, "等待配送")}
              key="dispatch"
            >
              等待配送
            </Button>
          );
        } else if (record.status === "等待配送") {
          actions.push(
            <Button
              type="link"
              onClick={() => updateOrderStatus(record.orderId, "已完成")}
              key="complete"
            >
              已完成
            </Button>
          );
        }
        actions.push(
          <Button
            type="link"
            onClick={() => showOrderDetails(record)}
            key="details"
          >
            查看詳情
          </Button>
        );
        return <Space size="middle">{actions}</Space>;
      },
    },
  ];

  // ==================== 操作卡片點擊處理 ====================
  const handleCardClick = (role) => {
    if (role === "查看訂單") {
      orderManagementRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (role === "更新訂單狀態") {
      updateOrderStatusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "50px" }}>
        <Typography>
          <Title level={2}>餐廳儀表板</Title>
          <Paragraph>
            歡迎，餐廳管理員！您可以在此處管理菜單、查看訂單、管理評價及設定系統。
          </Paragraph>
        </Typography>

        {/* 操作卡片區域 */}
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              title="管理菜單"
              extra={
                <Button type="link" onClick={showAddMenuModal}>
                  新增
                </Button>
              }
              style={{ height: "auto" }}
            >
              添加、編輯或刪除您的餐廳菜品。
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              title="查看訂單"
              style={{ height: "auto" }}
              onClick={() => handleCardClick("查看訂單")}
            >
              查看所有來自用戶的訂單，並進行處理。
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              title="更新訂單狀態"
              style={{ height: "auto" }}
              onClick={() => handleCardClick("更新訂單狀態")}
            >
              更新訂單的製作和配送狀態，通知用戶。
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              title="設定與權限管理"
              extra={
                <Button
                  type="link"
                  onClick={() => window.scrollTo(0, document.body.scrollHeight)}
                >
                  管理
                </Button>
              }
              style={{ height: "auto" }}
            >
              管理餐廳基本資訊、帳戶安全和管理員權限。
            </Card>
          </Col>
        </Row>

        {/* 收入報表區域 */}
        <RevenueReports orders={completedOrders} />

        {/* 用戶評價管理區域 */}
        <UserReviews reviews={userReviews} setReviews={setUserReviews} />

        {/* 設定與權限管理區域 */}
        <Settings />

        {/* 菜單管理區域 */}
        <Card title="菜單管理" style={{ marginBottom: "20px" }}>
          <Button
            type="primary"
            onClick={showAddMenuModal}
            style={{ marginBottom: "16px" }}
          >
            新增菜品
          </Button>
          <Table
            dataSource={menuItems}
            columns={menuColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>

        {/* 訂單管理區域，設置ref以供滾動 */}
        <div ref={orderManagementRef}>
          <Card title="訂單管理" style={{ marginBottom: "20px" }}>
            <Space style={{ marginBottom: 16 }}>
              <Select
                value={orderFilter}
                onChange={(value) => setOrderFilter(value)}
                style={{ width: 200 }}
                placeholder="篩選訂單狀態"
              >
                <Option value="All">所有訂單</Option>
                <Option value="新訂單">新訂單</Option>
                <Option value="準備中">準備中</Option>
                <Option value="等待配送">等待配送</Option>
                <Option value="已完成">已完成</Option>
                <Option value="已取消">已取消</Option>
              </Select>
            </Space>
            <Table
              dataSource={
                orderFilter === "All"
                  ? orders
                  : orders.filter((order) => order.status === orderFilter)
              }
              columns={orderColumns}
              rowKey="orderId"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>

        {/* 更新訂單狀態區域，設置ref以供滾動 */}
        <div ref={updateOrderStatusRef}>
          <Card title="更新訂單狀態" style={{ marginBottom: "20px" }}>
            <Space style={{ marginBottom: 16 }}>
              <Select
                placeholder="選擇新的訂單狀態"
                onChange={(value) => {
                  // 假設您有選中的訂單，這裡需要根據具體需求實現
                  // 例如，批量更新
                  message.info(`選擇的訂單狀態將更新為 ${value}`);
                }}
                style={{ width: 200 }}
              >
                <Option value="已處理">已處理</Option>
                <Option value="已完成">已完成</Option>
                <Option value="已取消">已取消</Option>
              </Select>
              <Button
                type="primary"
                onClick={() => {
                  // 實現批量更新邏輯
                  message.info("批量更新訂單狀態功能尚未實現");
                }}
              >
                更新
              </Button>
            </Space>
            {/* 這裡可以添加更多的內容，例如選擇訂單等 */}
          </Card>
        </div>

        {/* 營業時間設置區域 */}
        <OperatingHours
          regularHours={regularHours}
          setRegularHours={setRegularHours}
          specialDates={specialDates}
          setSpecialDates={setSpecialDates}
        />

        {/* 訂單詳情模態框 */}
        <OrderDetails
          visible={isOrderDetailsVisible}
          onClose={handleOrderDetailsClose}
          order={selectedOrder}
          onUpdateStatus={updateOrderStatus}
        />

        {/* 菜單模態框 */}
        <Modal
          title={isEditMenu ? "編輯菜品" : "新增菜品"}
          visible={isMenuModalVisible}
          onOk={handleMenuModalOk}
          onCancel={handleMenuModalCancel}
          okText={isEditMenu ? "更新" : "新增"}
        >
          <Form
            form={menuForm}
            layout="vertical"
            name="menuForm"
            initialValues={{
              name: "",
              description: "",
              price: "",
              image: "",
              tags: [],
              categoryId: "",
            }}
          >
            <Form.Item
              name="name"
              label="菜品名稱"
              rules={[
                {
                  required: true,
                  message: "請輸入菜品名稱！",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="描述"
              rules={[
                {
                  required: true,
                  message: "請輸入描述！",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="price"
              label="價格"
              rules={[
                {
                  required: true,
                  message: "請輸入價格！",
                },
                {
                  pattern: /^\d+$/,
                  message: "價格必須是數字！",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="圖片URL"
              rules={[
                {
                  required: true,
                  message: "請輸入圖片URL！",
                },
                {
                  type: "url",
                  message: "請輸入有效的URL！",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tags"
              label="標籤"
              rules={[
                {
                  required: true,
                  message: "請選擇至少一個標籤！",
                },
              ]}
            >
              <Select mode="multiple" placeholder="選擇標籤">
                <Option value="招牌">招牌</Option>
                <Option value="新品">新品</Option>
                <Option value="辣">辣</Option>
                <Option value="素食">素食</Option>
                {/* 添加更多標籤選項 */}
              </Select>
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="分類"
              rules={[
                {
                  required: true,
                  message: "請選擇分類！",
                },
              ]}
            >
              <Select placeholder="選擇分類">
                {menuCategories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer />
    </Layout>
  );
};

export default RestaurantDashboard;
