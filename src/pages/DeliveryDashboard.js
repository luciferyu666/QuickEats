// src/pages/DeliveryDashboard.js

import React, { useState, useEffect } from "react";
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
  Statistic,
  List,
  Rate,
  Table,
  Tag,
  Space,
  message,
  Dropdown,
  Menu,
} from "antd";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import {
  deliveryPerson as mockDeliveryPerson,
  pendingOrders,
  completedOrders,
  workLogs,
  notifications,
} from "../data/mockData";
import MapComponent from "../components/MapComponent";
import NotificationHandler from "../components/NotificationHandler";
import SupportChat from "../components/SupportChat";

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { Option } = Select;

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState(pendingOrders);
  const [completed, setCompleted] = useState(completedOrders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form] = Form.useForm();
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("離線");
  const [logs, setLogs] = useState(workLogs);
  const [notificationsList, setNotificationsList] = useState(notifications);

  // 設定外送員的狀態
  const [deliveryPersonState, setDeliveryPersonState] =
    useState(mockDeliveryPerson);

  // 處理訂單狀態更新並推送通知
  const handleUpdateStatus = (order, newStatus) => {
    if (newStatus === "已完成") {
      // 移動訂單到已完成列表
      setOrders((prev) => prev.filter((o) => o.orderId !== order.orderId));
      setCompleted((prev) => [
        ...prev,
        {
          ...order,
          deliveryTime: order.estimatedTime,
          status: "已完成",
          rating: 0,
          feedback: "",
        },
      ]);
      message.success(`訂單 ${order.orderId} 已標記為已完成！`);
      pushNotification(order, newStatus);
    } else if (["已接單", "取餐中", "已取餐", "配送中"].includes(newStatus)) {
      // 更新訂單狀態
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === order.orderId ? { ...o, status: newStatus } : o
        )
      );
      message.success(`訂單 ${order.orderId} 狀態已更新為 ${newStatus}！`);
      pushNotification(order, newStatus);
    } else if (newStatus === "拒單") {
      // 移除訂單
      setOrders((prev) => prev.filter((o) => o.orderId !== order.orderId));
      message.warning(`訂單 ${order.orderId} 已被拒單！`);
      pushNotification(order, newStatus);
    }
  };

  // 推送通知函數（模擬）
  const pushNotification = (order, status) => {
    const notification = {
      key: Date.now(),
      orderId: order.orderId,
      status: status,
      timestamp: new Date().toLocaleString(),
    };
    setNotificationsList((prev) => [notification, ...prev]);
  };

  // 顯示訂單詳情模態框
  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // 顯示地圖模態框
  const showMapModal = (order) => {
    setSelectedOrder(order);
    setIsMapModalVisible(true);
  };

  // 處理模態框確認
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 更新訂單狀態
        handleUpdateStatus(selectedOrder, values.status);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 處理模態框取消
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // 處理評價
  const handleRating = (orderId, rating, feedback) => {
    setCompleted((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, rating, feedback } : o))
    );
    message.success(`已為訂單 ${orderId} 提交評價！`);
  };

  // 處理出勤狀態變更
  const handleAttendance = (status) => {
    setCurrentStatus(status);
    const today = new Date().toISOString().split("T")[0];
    const existingLog = logs.find((log) => log.date === today);

    if (existingLog) {
      // 更新現有的工作日誌
      setLogs((prev) =>
        prev.map((log) =>
          log.date === today ? { ...log, status: status } : log
        )
      );
    } else {
      // 添加新的工作日誌
      setLogs((prev) => [
        ...prev,
        {
          date: today,
          status: status,
          deliveries: 0,
          distance: "0公里",
          timeSpent: "0小時",
        },
      ]);
    }
    message.success(`出勤狀態已更新為 ${status}！`);
  };

  // 定義工作日誌表格列
  const columns = [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "線上") color = "green";
        if (status === "休息") color = "red";
        if (status === "離線") color = "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "接單數量",
      dataIndex: "deliveries",
      key: "deliveries",
    },
    {
      title: "配送距離",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "花費時間",
      dataIndex: "timeSpent",
      key: "timeSpent",
    },
  ];

  // 定義狀態更新的菜單
  const getStatusMenu = (order) => (
    <Menu>
      {order.status === "待接單" && (
        <>
          <Menu.Item onClick={() => handleUpdateStatus(order, "已接單")}>
            已接單
          </Menu.Item>
          <Menu.Item onClick={() => handleUpdateStatus(order, "拒單")}>
            拒單
          </Menu.Item>
        </>
      )}
      {order.status === "已接單" && (
        <Menu.Item onClick={() => handleUpdateStatus(order, "取餐中")}>
          取餐中
        </Menu.Item>
      )}
      {order.status === "取餐中" && (
        <Menu.Item onClick={() => handleUpdateStatus(order, "已取餐")}>
          已取餐
        </Menu.Item>
      )}
      {order.status === "已取餐" && (
        <Menu.Item onClick={() => handleUpdateStatus(order, "配送中")}>
          配送中
        </Menu.Item>
      )}
      {order.status === "配送中" && (
        <Menu.Item onClick={() => handleUpdateStatus(order, "已送達")}>
          已送達
        </Menu.Item>
      )}
    </Menu>
  );

  // 模擬外送員位置移動
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryPersonState((prev) => {
        // 獲取正在配送中的訂單
        const targetOrder = orders.find((order) => order.status === "配送中");

        if (targetOrder) {
          const { dropoff } = targetOrder;
          const { lat, lng } = prev.currentLocation;
          const step = 0.0001; // 移動步長

          let newLat = lat;
          let newLng = lng;

          // 簡單地向送達地點移動
          if (lat < dropoff.lat) newLat += step;
          if (lat > dropoff.lat) newLat -= step;
          if (lng < dropoff.lng) newLng += step;
          if (lng > dropoff.lng) newLng -= step;

          // 檢查是否到達目標
          if (
            Math.abs(newLat - dropoff.lat) < step &&
            Math.abs(newLng - dropoff.lng) < step
          ) {
            // 到達送達地點，更新訂單狀態
            handleUpdateStatus(targetOrder, "已送達");
            return {
              ...prev,
              currentLocation: { lat: dropoff.lat, lng: dropoff.lng },
            };
          }

          return {
            ...prev,
            currentLocation: { lat: newLat, lng: newLng },
          };
        }

        return prev;
      });
    }, 1000); // 每秒更新一次位置

    return () => clearInterval(interval);
  }, [orders]);

  // 調試：打印 selectedOrder 和 deliveryPersonState.currentLocation
  useEffect(() => {
    console.log("Selected Order:", selectedOrder);
    console.log(
      "Delivery Person Location:",
      deliveryPersonState.currentLocation
    );
  }, [selectedOrder, deliveryPersonState]);

  return (
    <Layout>
      <AppHeader />
      <NotificationHandler notifications={notificationsList} />
      <Content style={{ padding: "50px" }}>
        <Typography>
          <Title level={2}>外送員儀表板</Title>
          <Paragraph>
            歡迎，{deliveryPersonState.name}！
            您可以在此處查看待配送訂單、更新配送狀態和管理個人資訊。
          </Paragraph>
        </Typography>

        {/* 出勤管理 */}
        <Card title="出勤管理" style={{ marginBottom: "20px" }}>
          <Space>
            <Button
              type={currentStatus === "線上" ? "primary" : "default"}
              onClick={() => handleAttendance("線上")}
            >
              線上
            </Button>
            <Button
              type={currentStatus === "休息" ? "primary" : "default"}
              onClick={() => handleAttendance("休息")}
            >
              休息
            </Button>
            <Button
              type={currentStatus === "離線" ? "primary" : "default"}
              onClick={() => handleAttendance("離線")}
            >
              離線
            </Button>
          </Space>
          <Paragraph style={{ marginTop: "10px" }}>
            當前狀態：
            <Tag
              color={
                currentStatus === "線上"
                  ? "green"
                  : currentStatus === "休息"
                    ? "red"
                    : "default"
              }
            >
              {currentStatus}
            </Tag>
          </Paragraph>
        </Card>

        {/* 工作日誌 */}
        <Card title="工作日誌" style={{ marginBottom: "20px" }}>
          <Table dataSource={logs} columns={columns} rowKey="date" />
        </Card>

        {/* 收入統計 */}
        <Card title="收入統計">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title="今日收入"
                value={`NT$ ${deliveryPersonState.earnings.today}`}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title="本週收入"
                value={`NT$ ${deliveryPersonState.earnings.week}`}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title="本月收入"
                value={`NT$ ${deliveryPersonState.earnings.month}`}
              />
            </Col>
          </Row>
        </Card>

        {/* 待配送訂單 */}
        <Title level={3} style={{ marginTop: "40px" }}>
          待配送訂單
        </Title>
        <Row gutter={[16, 16]}>
          {orders.map((order) => (
            <Col xs={24} sm={12} md={8} key={order.orderId}>
              <Card
                title={`訂單編號：${order.orderId}`}
                extra={
                  <Button type="link" onClick={() => showOrderDetails(order)}>
                    詳細
                  </Button>
                }
                hoverable
                actions={[
                  <Dropdown overlay={getStatusMenu(order)} key="status">
                    <Button>操作</Button>
                  </Dropdown>,
                  <Button
                    type="link"
                    onClick={() => showMapModal(order)}
                    key="navigate"
                  >
                    導航
                  </Button>,
                ]}
              >
                <Paragraph>
                  <strong>餐廳：</strong>
                  {order.restaurant}
                </Paragraph>
                <Paragraph>
                  <strong>取餐地點：</strong>
                  {order.restaurantAddress}
                </Paragraph>
                <Paragraph>
                  <strong>送達地點：</strong>
                  {order.userAddress}
                </Paragraph>
                <Paragraph>
                  <strong>距離：</strong>
                  {order.distance}
                </Paragraph>
                <Paragraph>
                  <strong>預計配送時間：</strong>
                  {order.estimatedTime}
                </Paragraph>
                <Paragraph>
                  <strong>訂單金額：</strong>NT$ {order.totalAmount}
                </Paragraph>
                <Paragraph>
                  <strong>狀態：</strong>
                  {order.status}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 訂單詳情模態框 */}
        <Modal
          title={`訂單編號：${selectedOrder?.orderId}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="更新狀態"
        >
          {selectedOrder && (
            <Form form={form} layout="vertical" name="statusForm">
              <Form.Item
                name="status"
                label="訂單狀態"
                rules={[{ required: true, message: "請選擇訂單狀態！" }]}
              >
                <Select placeholder="選擇新的訂單狀態">
                  {selectedOrder.status !== "已完成" && (
                    <>
                      {selectedOrder.status === "待接單" && (
                        <>
                          <Option value="已接單">已接單</Option>
                          <Option value="拒單">拒單</Option>
                        </>
                      )}
                      {selectedOrder.status === "已接單" && (
                        <Option value="取餐中">取餐中</Option>
                      )}
                      {selectedOrder.status === "取餐中" && (
                        <Option value="已取餐">已取餐</Option>
                      )}
                      {selectedOrder.status === "已取餐" && (
                        <Option value="配送中">配送中</Option>
                      )}
                      {selectedOrder.status === "配送中" && (
                        <Option value="已送達">已送達</Option>
                      )}
                    </>
                  )}
                </Select>
              </Form.Item>
            </Form>
          )}
        </Modal>

        {/* 地圖模態框 */}
        <Modal
          title={`導航 - 訂單編號：${selectedOrder?.orderId}`}
          visible={isMapModalVisible}
          onCancel={() => setIsMapModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedOrder && selectedOrder.pickup && selectedOrder.dropoff && (
            <MapComponent
              pickup={{
                lat: selectedOrder.pickup.lat,
                lng: selectedOrder.pickup.lng,
              }}
              dropoff={{
                lat: selectedOrder.dropoff.lat,
                lng: selectedOrder.dropoff.lng,
              }}
              deliveryPerson={deliveryPersonState.currentLocation}
            />
          )}
        </Modal>

        {/* 已完成訂單 */}
        <Title level={3} style={{ marginTop: "40px" }}>
          已完成訂單
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={completed}
          renderItem={(order) => (
            <List.Item
              actions={[
                order.rating === 0 ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      Modal.info({
                        title: "用戶評價",
                        content: (
                          <Form
                            layout="vertical"
                            name="ratingForm"
                            initialValues={{
                              rating: order.rating,
                              feedback: order.feedback,
                            }}
                            onFinish={(values) => {
                              handleRating(
                                order.orderId,
                                values.rating,
                                values.feedback
                              );
                              Modal.destroyAll();
                            }}
                          >
                            <Form.Item
                              name="rating"
                              label="評分"
                              rules={[
                                {
                                  required: true,
                                  message: "請選擇評分！",
                                },
                              ]}
                            >
                              <Rate />
                            </Form.Item>
                            <Form.Item
                              name="feedback"
                              label="回饋"
                              rules={[
                                {
                                  required: true,
                                  message: "請輸入回饋！",
                                },
                              ]}
                            >
                              <Input.TextArea rows={4} />
                            </Form.Item>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                提交
                              </Button>
                            </Form.Item>
                          </Form>
                        ),
                        onOk() {},
                      });
                    }}
                  >
                    給予評價
                  </Button>
                ) : null,
              ]}
            >
              <List.Item.Meta
                title={`訂單編號：${order.orderId}`}
                description={
                  <>
                    <Paragraph>
                      <strong>餐廳：</strong>
                      {order.restaurant}
                    </Paragraph>
                    <Paragraph>
                      <strong>送達地點：</strong>
                      {order.userAddress}
                    </Paragraph>
                    <Paragraph>
                      <strong>配送時間：</strong>
                      {order.deliveryTime}
                    </Paragraph>
                    <Paragraph>
                      <strong>訂單金額：</strong>NT$ {order.totalAmount}
                    </Paragraph>
                    {order.rating > 0 && (
                      <>
                        <Paragraph>
                          <strong>評分：</strong>
                          <Rate disabled defaultValue={order.rating} />
                        </Paragraph>
                        <Paragraph>
                          <strong>回饋：</strong>
                          {order.feedback}
                        </Paragraph>
                      </>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />

        {/* 個人資訊 */}
        <Title level={3} style={{ marginTop: "40px" }}>
          個人資訊
        </Title>
        <Card title="個人資料" style={{ marginBottom: "20px" }}>
          <Paragraph>
            <strong>姓名：</strong>
            {deliveryPersonState.name}
          </Paragraph>
          <Paragraph>
            <strong>聯絡電話：</strong>
            {deliveryPersonState.phone}
          </Paragraph>
          <Paragraph>
            <strong>電子郵件：</strong>
            {deliveryPersonState.email}
          </Paragraph>
          <Paragraph>
            <strong>交通工具：</strong>
            {deliveryPersonState.vehicle}
          </Paragraph>
          <Button
            type="primary"
            onClick={() => {
              Modal.info({
                title: "編輯個人資訊",
                content: (
                  <Form
                    layout="vertical"
                    name="personalInfo"
                    initialValues={{
                      name: deliveryPersonState.name,
                      phone: deliveryPersonState.phone,
                      email: deliveryPersonState.email,
                      vehicle: deliveryPersonState.vehicle,
                    }}
                    onFinish={(values) => {
                      // 更新個人資訊（此處僅模擬，未持久化）
                      setDeliveryPersonState((prev) => ({
                        ...prev,
                        name: values.name,
                        phone: values.phone,
                        email: values.email,
                        vehicle: values.vehicle,
                      }));
                      message.success("個人資訊已更新！");
                      Modal.destroyAll();
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="姓名"
                      rules={[
                        {
                          required: true,
                          message: "請輸入姓名！",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="聯絡電話"
                      rules={[
                        {
                          required: true,
                          message: "請輸入聯絡電話！",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="電子郵件"
                      rules={[
                        {
                          required: true,
                          message: "請輸入電子郵件！",
                          type: "email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="vehicle"
                      label="交通工具"
                      rules={[
                        {
                          required: true,
                          message: "請選擇交通工具！",
                        },
                      ]}
                    >
                      <Select>
                        <Option value="摩托車">摩托車</Option>
                        <Option value="自行車">自行車</Option>
                        <Option value="汽車">汽車</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        提交
                      </Button>
                    </Form.Item>
                  </Form>
                ),
                onOk() {},
              });
            }}
          >
            編輯個人資訊
          </Button>
        </Card>
      </Content>
      <AppFooter />
      <SupportChat />
    </Layout>
  );
};

export default DeliveryDashboard;
