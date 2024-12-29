// src/pages/AdminDashboard.js

import React, { useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  List,
  Statistic,
  Divider,
  Modal,
  Button,
} from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderManagement from "../components/admin/OrderManagement";
import UserManagement from "../components/admin/UserManagement";
import SystemMonitoring from "../components/admin/SystemMonitoring";
import { transactions, customers, restaurants } from "../data/mockData"; // 確保路徑正確
import { deliveryData } from "../data/deliveryData"; // 新增導入
import dayjs from "dayjs";

const { Title } = Typography;
const { Content } = Layout;

// 顏色定義，用於餅圖
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

// 顏色定義，用於配送餅圖
const DELIVERY_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

// 新增的兩個餐廳列表
const fallbackRestaurants = [
  {
    name: "金赫家韓食",
    url: "https://www.gco2go.com/portal_c1_cnt.php?owner_num=c1_67388&button_num=c1&folder_id=101742",
  },
  {
    name: "享受韓國料理餐酒館",
    url: "https://www.gco2go.com/portal_c1_cnt.php?owner_num=c1_67388&button_num=c1&folder_id=101201",
  },
];

const AdminDashboard = () => {
  // 狀態管理，用於控制客戶、餐廳和配送員模態框的顯示和選中的項目
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isRestaurantModalVisible, setIsRestaurantModalVisible] =
    useState(false);

  // 新增狀態管理：選中的配送員和其配送記錄
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);
  const [isDeliveryPersonModalVisible, setIsDeliveryPersonModalVisible] =
    useState(false);
  const [
    selectedDeliveryPersonDeliveries,
    setSelectedDeliveryPersonDeliveries,
  ] = useState([]);

  // 使用 useMemo 來優化性能，避免不必要的重新計算
  const {
    totalSales,
    monthlySalesData,
    dishSalesData,
    activeCustomersCount,
    newCustomersCount,
    returningCustomersCount,
    topActiveCustomers,
    orderStatusDistribution,
    orderStatusCounts,
    restaurantSalesData,
    mostPopularRestaurant,
    restaurantOrderCounts,
    totalDeliveries,
    deliveriesPerPerson,
    averageDeliveryTime,
    averageRatingPerPerson,
    deliveryStatusDistribution,
    top10Restaurants, // 新增前10名餐廳
    transactionsWithTimestamps,
  } = useMemo(() => {
    // 總銷售額
    const totalSales = transactions.reduce(
      (sum, txn) => sum + txn.totalAmount,
      0
    );

    // 銷售趨勢（按月）
    const monthlySalesMap = {};
    transactions.forEach((txn) => {
      const month = dayjs(txn.timestamp).format("YYYY-MM");
      if (!monthlySalesMap[month]) {
        monthlySalesMap[month] = 0;
      }
      monthlySalesMap[month] += txn.totalAmount;
    });
    const monthlySalesData = Object.keys(monthlySalesMap)
      .sort()
      .map((month) => ({ month, sales: monthlySalesMap[month] }));

    // 各菜品銷售量
    const dishSalesMap = {};
    transactions.forEach((txn) => {
      txn.orderItems.forEach((item) => {
        if (!dishSalesMap[item.name]) {
          dishSalesMap[item.name] = 0;
        }
        dishSalesMap[item.name] += item.quantity;
      });
    });
    const dishSalesData = Object.keys(dishSalesMap).map((dish) => ({
      name: dish,
      quantity: dishSalesMap[dish],
    }));

    // 活躍客戶數量（唯一用戶數）
    const uniqueUsers = new Set(transactions.map((txn) => txn.userName));
    const activeCustomersCount = uniqueUsers.size;

    // 新客戶 vs 回頭客
    const userFirstOrderMap = {};
    transactions.forEach((txn) => {
      if (
        !userFirstOrderMap[txn.userName] ||
        dayjs(txn.timestamp).isBefore(userFirstOrderMap[txn.userName])
      ) {
        userFirstOrderMap[txn.userName] = txn.timestamp;
      }
    });

    const now = dayjs();
    let newCustomersCount = 0;
    let returningCustomersCount = 0;
    Object.values(userFirstOrderMap).forEach((firstOrderTime) => {
      if (now.diff(firstOrderTime, "month") < 1) {
        newCustomersCount += 1;
      } else {
        returningCustomersCount += 1;
      }
    });

    // 活躍客戶排行榜（按訂單數排序，取前十名）
    const userOrderCountMap = {};
    transactions.forEach((txn) => {
      if (!userOrderCountMap[txn.userName]) {
        userOrderCountMap[txn.userName] = 0;
      }
      userOrderCountMap[txn.userName] += 1;
    });
    const topActiveCustomers = Object.entries(userOrderCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) // 取前 10 名
      .map(([name, count]) => ({ name, count }));

    // 訂單狀態分佈
    const orderStatusMap = {};
    transactions.forEach((txn) => {
      if (!orderStatusMap[txn.status]) {
        orderStatusMap[txn.status] = 0;
      }
      orderStatusMap[txn.status] += 1;
    });
    const orderStatusDistribution = Object.keys(orderStatusMap).map(
      (status) => ({
        name: status,
        value: orderStatusMap[status],
      })
    );
    const orderStatusCounts = orderStatusMap;

    // 餐廳銷售額（排除 '壽司之神'）
    const restaurantSalesMap = {};
    transactions.forEach((txn) => {
      if (txn.restaurant === "壽司之神") return; // 排除 '壽司之神'
      if (!restaurantSalesMap[txn.restaurant]) {
        restaurantSalesMap[txn.restaurant] = 0;
      }
      restaurantSalesMap[txn.restaurant] += txn.totalAmount;
    });
    const restaurantSalesData = Object.keys(restaurantSalesMap).map(
      (restaurant) => ({
        name: restaurant,
        sales: restaurantSalesMap[restaurant],
      })
    );

    // 最受歡迎的餐廳（按銷售額排序，取第一名）
    const mostPopularRestaurant = restaurantSalesData.sort(
      (a, b) => b.sales - a.sales
    )[0];

    // 餐廳訂單數量（排除 '壽司之神'）
    const restaurantOrderCountMap = {};
    transactions.forEach((txn) => {
      if (txn.restaurant === "壽司之神") return; // 排除 '壽司之神'
      if (!restaurantOrderCountMap[txn.restaurant]) {
        restaurantOrderCountMap[txn.restaurant] = 0;
      }
      restaurantOrderCountMap[txn.restaurant] += 1;
    });
    const restaurantOrderCounts = Object.keys(restaurantOrderCountMap).map(
      (restaurant) => ({
        name: restaurant,
        orders: restaurantOrderCountMap[restaurant],
      })
    );

    // ====== 新增部分：配送數據處理 ======

    // 總配送數量
    const totalDeliveries = deliveryData.length;

    // 各配送員的配送次數
    const deliveriesPerPersonMap = {};
    deliveryData.forEach((delivery) => {
      if (!deliveriesPerPersonMap[delivery.deliveryPerson]) {
        deliveriesPerPersonMap[delivery.deliveryPerson] = 0;
      }
      deliveriesPerPersonMap[delivery.deliveryPerson] += 1;
    });
    const deliveriesPerPerson = Object.keys(deliveriesPerPersonMap).map(
      (person) => ({
        name: person,
        count: deliveriesPerPersonMap[person],
      })
    );

    // 平均配送時間（分鐘）
    const totalDeliveryTime = deliveryData.reduce((sum, delivery) => {
      if (delivery.pickUpTime && delivery.deliveryTime) {
        return (
          sum +
          dayjs(delivery.deliveryTime).diff(
            dayjs(delivery.pickUpTime),
            "minute"
          )
        );
      }
      return sum;
    }, 0);
    const averageDeliveryTime =
      deliveryData.length > 0
        ? (totalDeliveryTime / deliveryData.length).toFixed(2)
        : 0;

    // 各配送員的平均評分
    const ratingMap = {};
    const ratingCountMap = {};
    deliveryData.forEach((delivery) => {
      if (delivery.rating !== null && delivery.rating !== undefined) {
        if (!ratingMap[delivery.deliveryPerson]) {
          ratingMap[delivery.deliveryPerson] = 0;
          ratingCountMap[delivery.deliveryPerson] = 0;
        }
        ratingMap[delivery.deliveryPerson] += delivery.rating;
        ratingCountMap[delivery.deliveryPerson] += 1;
      }
    });
    const averageRatingPerPerson = Object.keys(ratingMap).map((person) => ({
      name: person,
      averageRating: (ratingMap[person] / ratingCountMap[person]).toFixed(2),
    }));

    // 配送狀態分佈
    const deliveryStatusMap = {};
    deliveryData.forEach((delivery) => {
      if (!deliveryStatusMap[delivery.status]) {
        deliveryStatusMap[delivery.status] = 0;
      }
      deliveryStatusMap[delivery.status] += 1;
    });
    const deliveryStatusDistribution = Object.keys(deliveryStatusMap).map(
      (status) => ({
        name: status,
        value: deliveryStatusMap[status],
      })
    );

    // 計算前 10 名餐廳（已排除 '壽司之神'）
    const top10Restaurants = restaurantSalesData
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);

    // 將所有交易數據添加時間戳格式化
    const transactionsWithTimestamps = transactions.map((txn) => ({
      ...txn,
      formattedTimestamp: dayjs(txn.timestamp).format("YYYY-MM-DD HH:mm:ss"),
    }));

    return {
      totalSales,
      monthlySalesData,
      dishSalesData,
      activeCustomersCount,
      newCustomersCount,
      returningCustomersCount,
      topActiveCustomers,
      orderStatusDistribution,
      orderStatusCounts,
      restaurantSalesData,
      mostPopularRestaurant,
      restaurantOrderCounts,
      // 新增返回的配送數據
      totalDeliveries,
      deliveriesPerPerson,
      averageDeliveryTime,
      averageRatingPerPerson,
      deliveryStatusDistribution,
      top10Restaurants, // 新增前10名餐廳
      transactionsWithTimestamps,
    };
  }, [transactions, deliveryData]); // 添加 deliveryData 作為依賴

  // 處理客戶點擊事件
  const handleCustomerClick = (customerName) => {
    // 根據客戶名稱在 customers 列表中找到該客戶的詳細信息
    const customer = customers.find((cust) => cust.name === customerName);
    if (customer) {
      setSelectedCustomer(customer);
      setIsCustomerModalVisible(true);
    }
  };

  const handleCustomerModalClose = () => {
    setSelectedCustomer(null);
    setIsCustomerModalVisible(false);
  };

  // 處理餐廳點擊事件
  const handleRestaurantClick = (restaurantName) => {
    // 根據餐廳名稱在 transactions 列表中找到該餐廳的詳細信息
    const txn = transactions.find((txn) => txn.restaurant === restaurantName);
    if (txn) {
      const restaurant = {
        name: txn.restaurant,
        address: txn.restaurantAddress,
        location: txn.restaurantLocation,
        // 可以根據需要添加更多詳細信息
      };
      setSelectedRestaurant(restaurant);
      setIsRestaurantModalVisible(true);
    }
  };

  const handleRestaurantModalClose = () => {
    setSelectedRestaurant(null);
    setIsRestaurantModalVisible(false);
  };

  // 新增：處理配送員點擊事件
  const handleDeliveryPersonClick = (deliveryPersonName) => {
    // 根據配送員名稱在 deliveryData 列表中找到所有相關的配送記錄
    const deliveries = deliveryData.filter(
      (delivery) => delivery.deliveryPerson === deliveryPersonName
    );
    if (deliveries.length > 0) {
      setSelectedDeliveryPerson(deliveryPersonName);
      setSelectedDeliveryPersonDeliveries(deliveries);
      setIsDeliveryPersonModalVisible(true);
    }
  };

  const handleDeliveryPersonModalClose = () => {
    setSelectedDeliveryPerson(null);
    setSelectedDeliveryPersonDeliveries([]);
    setIsDeliveryPersonModalVisible(false);
  };

  // 定義交易數據表格的列（現已不再使用，但保留以防需要）
  const transactionsColumns = [
    {
      title: "訂單 ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "用戶名稱",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "餐廳",
      dataIndex: "restaurant",
      key: "restaurant",
    },
    {
      title: "總金額 (NT$)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => `NT$${value.toFixed(2)}`,
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "時間戳",
      dataIndex: "formattedTimestamp",
      key: "formattedTimestamp",
    },
  ];

  // 查找餐廳的 URL
  const getRestaurantURL = (restaurantName) => {
    const restaurant = restaurants.find((rest) => rest.name === restaurantName);
    return restaurant ? restaurant.url : "#";
  };

  // 根據 orderId 查找餐廳名稱
  const getRestaurantNameByOrderId = (orderId) => {
    const txn = transactions.find((txn) => txn.orderId === orderId);
    return txn ? txn.restaurant : null;
  };

  // 根據 orderId 查找餐廳詳細資訊，若找不到則隨機選擇 '金赫家韓食' 或 '享受韓國料理餐酒館'
  const getRestaurantDetailsByOrderId = (orderId) => {
    const txn = transactions.find((txn) => txn.orderId === orderId);
    if (txn) {
      return {
        name: txn.restaurant,
        url: getRestaurantURL(txn.restaurant),
      };
    } else {
      // 隨機選擇 '金赫家韓食' 或 '享受韓國料理餐酒館'
      const randomIndex = Math.floor(
        Math.random() * fallbackRestaurants.length
      );
      return fallbackRestaurants[randomIndex];
    }
  };

  // 獲取指定客戶的所有訂單
  const getCustomerOrders = (customerName) => {
    return transactions
      .filter((txn) => txn.userName === customerName)
      .map((txn) => ({
        orderId: txn.orderId,
        restaurant: txn.restaurant,
        restaurantURL: getRestaurantURL(txn.restaurant),
        totalAmount: txn.totalAmount,
        status: txn.status,
        timestamp: dayjs(txn.timestamp).format("YYYY-MM-DD HH:mm:ss"),
      }));
  };

  // 獲取指定餐廳的所有訂單（排除 '壽司之神'）
  const getRestaurantOrders = (restaurantName) => {
    return transactions
      .filter(
        (txn) =>
          txn.restaurant === restaurantName && txn.restaurant !== "壽司之神"
      )
      .map((txn) => ({
        orderId: txn.orderId,
        userName: txn.userName,
        totalAmount: txn.totalAmount,
        status: txn.status,
        timestamp: dayjs(txn.timestamp).format("YYYY-MM-DD HH:mm:ss"),
      }));
  };

  return (
    <Layout>
      <Header />
      <Content
        className="admin-dashboard-content"
        style={{ padding: "20px 50px" }}
      >
        <Title level={2}>管理員主頁</Title>

        {/* 銷售數據 */}
        <Card title="銷售數據" style={{ marginBottom: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="總銷售額"
                value={totalSales}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix="NT$"
              />
            </Col>
            <Col xs={24} sm={12} md={18}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySalesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => `月份: ${label}`}
                    formatter={(value) => [`NT$${value.toFixed(2)}`, "銷售額"]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name="銷售額"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Col>
          </Row>
          <Divider />
          <Title level={4}>各菜品銷售量</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dishSalesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value}`, "銷售量"]}
                labelFormatter={(label) => `菜品: ${label}`}
              />
              <Legend />
              <Bar dataKey="quantity" fill="#82ca9d" name="銷售量" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* 客戶活躍度 */}
        <Card title="客戶活躍度" style={{ marginBottom: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8} md={8}>
              <Statistic
                title="活躍客戶數量"
                value={activeCustomersCount}
                valueStyle={{ color: "#1890ff" }}
              />
            </Col>
            <Col xs={24} sm={8} md={8}>
              <Statistic
                title="新客戶"
                value={newCustomersCount}
                valueStyle={{ color: "#faad14" }}
              />
            </Col>
            <Col xs={24} sm={8} md={8}>
              <Statistic
                title="回頭客"
                value={returningCustomersCount}
                valueStyle={{ color: "#f5222d" }}
              />
            </Col>
          </Row>
          <Divider />
          <Title level={4}>活躍客戶排行榜（前 10 名）</Title>
          <Row gutter={[16, 16]}>
            {topActiveCustomers.map((customer, index) => {
              const customerOrders = getCustomerOrders(customer.name);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={customer.name}>
                  <Card
                    title={`${index + 1}. ${customer.name}`}
                    bordered={false}
                    hoverable
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCustomerClick(customer.name)}
                  >
                    <p>訂單數量: {customer.count}</p>
                    <List
                      size="small"
                      bordered
                      dataSource={customerOrders}
                      renderItem={(order) => (
                        <List.Item>
                          <ul style={{ paddingLeft: "20px", margin: 0 }}>
                            <li>
                              <strong>訂單 ID：</strong> {order.orderId}
                            </li>
                            <li>
                              <strong>餐廳：</strong>{" "}
                              <a
                                href={order.restaurantURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {order.restaurant}
                              </a>
                            </li>
                            <li>
                              <strong>總金額：</strong> NT$
                              {order.totalAmount.toFixed(2)}
                            </li>
                            <li>
                              <strong>狀態：</strong> {order.status}
                            </li>
                            <li>
                              <strong>時間：</strong> {order.timestamp}
                            </li>
                          </ul>
                        </List.Item>
                      )}
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>

        {/* 訂單狀態分佈 */}
        <Card title="訂單狀態分佈" style={{ marginBottom: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {orderStatusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <List
                header={<div>各狀態訂單數量</div>}
                bordered
                dataSource={Object.entries(orderStatusCounts)}
                renderItem={([status, count]) => (
                  <List.Item key={status}>
                    <List.Item.Meta
                      title={status}
                      description={`數量: ${count}`}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Card>

        {/* 餐廳表現 */}
        <Card title="餐廳表現" style={{ marginBottom: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8}>
              <Title level={4}>各餐廳銷售額</Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={restaurantSalesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => `餐廳: ${label}`}
                    formatter={(value) => [`NT$${value.toFixed(2)}`, "銷售額"]}
                  />
                  <Legend />
                  <Bar
                    dataKey="sales"
                    fill="#8884d8"
                    name="銷售額"
                    onClick={(data) => handleRestaurantClick(data.name)} // 添加 onClick 事件
                    cursor="pointer" // 更改鼠標樣式為指針，提示用戶可以點擊
                  />
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Title level={4}>最受歡迎的餐廳</Title>
              {mostPopularRestaurant ? (
                <Card>
                  <p>
                    <strong>名稱：</strong> {mostPopularRestaurant.name}
                  </p>
                  <p>
                    <strong>銷售額：</strong> NT$
                    {mostPopularRestaurant.sales.toFixed(2)}
                  </p>
                  {/* 如果需要顯示日期，可以根據交易數據添加 */}
                </Card>
              ) : (
                <p>暫無數據</p>
              )}
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Title level={4}>餐廳訂單數量</Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={restaurantOrderCounts}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => `餐廳: ${label}`}
                    formatter={(value) => [`${value}`, "訂單數量"]}
                  />
                  <Legend />
                  <Bar
                    dataKey="orders"
                    fill="#82ca9d"
                    name="訂單數量"
                    onClick={(data) => handleRestaurantClick(data.name)} // 添加 onClick 事件
                    cursor="pointer" // 更改鼠標樣式為指針，提示用戶可以點擊
                  />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </Card>

        {/* ====== 新增部分：餐廳表現排行榜前10名 ====== */}
        <Card
          title="餐廳表現排行榜（前 10 名）"
          style={{ marginBottom: "20px" }}
        >
          <Row gutter={[16, 16]}>
            {top10Restaurants.map((restaurant, index) => {
              const restaurantOrders = getRestaurantOrders(restaurant.name);
              const restaurantURL = getRestaurantURL(restaurant.name);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={restaurant.name}>
                  <Card
                    title={`${index + 1}. ${restaurant.name}`}
                    bordered={false}
                    hoverable
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRestaurantClick(restaurant.name)}
                  >
                    <p>銷售額: NT${restaurant.sales.toFixed(2)}</p>
                    <List
                      size="small"
                      bordered
                      dataSource={restaurantOrders}
                      renderItem={(order) => (
                        <List.Item>
                          <ul style={{ paddingLeft: "20px", margin: 0 }}>
                            <li>
                              <strong>訂單 ID：</strong> {order.orderId}
                            </li>
                            <li>
                              <strong>用戶名稱：</strong> {order.userName}
                            </li>
                            <li>
                              <strong>總金額：</strong> NT$
                              {order.totalAmount.toFixed(2)}
                            </li>
                            <li>
                              <strong>狀態：</strong> {order.status}
                            </li>
                            <li>
                              <strong>時間：</strong> {order.timestamp}
                            </li>
                            <li>
                              <strong>餐廳：</strong>{" "}
                              <a
                                href={restaurantURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {restaurant.name}
                              </a>
                            </li>
                          </ul>
                        </List.Item>
                      )}
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>
        {/* ====== 餐廳表現排行榜前10名結束 ====== */}

        {/* ====== 新增部分：配送數據展示 ====== */}
        <Card title="配送數據" style={{ marginBottom: "20px" }}>
          <Row gutter={[16, 16]}>
            {/* 總配送數量 */}
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="總配送數量"
                value={totalDeliveries}
                valueStyle={{ color: "#3f8600" }}
              />
            </Col>

            {/* 各配送員的配送次數 */}
            <Col xs={24} sm={12} md={6}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deliveriesPerPerson}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => `配送員: ${label}`}
                    formatter={(value) => [`${value}`, "配送次數"]}
                  />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#82ca9d"
                    name="配送次數"
                    onClick={(data) => handleDeliveryPersonClick(data.name)} // 添加 onClick 事件
                    cursor="pointer" // 更改鼠標樣式為指針，提示用戶可以點擊
                  />
                </BarChart>
              </ResponsiveContainer>
            </Col>

            {/* 平均配送時間 */}
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="平均配送時間 (分鐘)"
                value={averageDeliveryTime}
                valueStyle={{ color: "#1890ff" }}
              />
            </Col>

            {/* 各配送員的平均評分 */}
            <Col xs={24} sm={12} md={6}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={averageRatingPerPerson}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip
                    labelFormatter={(label) => `配送員: ${label}`}
                    formatter={(value) => [`${value}`, "平均評分"]}
                  />
                  <Legend />
                  <Bar dataKey="averageRating" fill="#8884d8" name="平均評分" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            {/* 配送狀態分佈餅圖 */}
            <Col xs={24} sm={12} md={12}>
              <Title level={4}>配送狀態分佈</Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deliveryStatusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {deliveryStatusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={DELIVERY_COLORS[index % DELIVERY_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Col>

            {/* 配送員評分分佈餅圖 */}
            <Col xs={24} sm={12} md={12}>
              <Title level={4}>配送員評分分佈</Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={averageRatingPerPerson}
                    dataKey="averageRating"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {averageRatingPerPerson.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={DELIVERY_COLORS[index % DELIVERY_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Col>
          </Row>
          <Divider />
          {/* 新增：配送記錄卡片列表 */}
          <Title level={4}>所有配送記錄</Title>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={deliveryData}
            renderItem={(delivery) => {
              // 根據 orderId 獲取餐廳名稱和 URL
              const { name: restaurantName, url: restaurantURL } =
                getRestaurantDetailsByOrderId(delivery.orderId);

              return (
                <List.Item key={delivery.deliveryId}>
                  <Card
                    hoverable
                    title={`配送 ID: ${delivery.deliveryId}`}
                    extra={
                      <a
                        href={restaurantURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {restaurantName}
                      </a>
                    }
                  >
                    <p>
                      <strong>訂單 ID：</strong> {delivery.orderId}
                    </p>
                    <p>
                      <strong>餐廳：</strong>{" "}
                      <a
                        href={restaurantURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {restaurantName}
                      </a>
                    </p>
                    <p>
                      <strong>配送員：</strong> {delivery.deliveryPerson}
                    </p>
                    <p>
                      <strong>取貨時間：</strong>{" "}
                      {dayjs(delivery.pickUpTime).format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                    <p>
                      <strong>配送時間：</strong>{" "}
                      {dayjs(delivery.deliveryTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </p>
                    <p>
                      <strong>配送狀態：</strong> {delivery.status}
                    </p>
                    <p>
                      <strong>評分：</strong>{" "}
                      {delivery.rating ? delivery.rating : "無評分"}
                    </p>
                    <p>
                      <strong>配送路線：</strong>
                    </p>
                    <List
                      dataSource={delivery.route}
                      renderItem={(routePoint, index) => (
                        <List.Item key={index}>
                          {index === 0 ? "餐廳位置：" : "用戶位置："} Lat:{" "}
                          {routePoint.lat}, Lng: {routePoint.lng}
                        </List.Item>
                      )}
                      size="small"
                      bordered
                    />
                  </Card>
                </List.Item>
              );
            }}
          />
        </Card>
        {/* ====== 配送數據展示結束 ====== */}

        {/* ====== 新增部分：所有交易記錄卡片式展示 ====== */}
        <Card title="所有交易記錄" style={{ marginBottom: "20px" }}>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={transactionsWithTimestamps}
            renderItem={(txn) => (
              <List.Item key={txn.orderId}>
                <Card
                  hoverable
                  title={`訂單 ID: ${txn.orderId}`}
                  extra={
                    <a
                      href={getRestaurantURL(txn.restaurant)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {txn.restaurant}
                    </a>
                  }
                >
                  <p>
                    <strong>用戶名稱：</strong> {txn.userName}
                  </p>
                  <p>
                    <strong>餐廳：</strong>{" "}
                    <a
                      href={getRestaurantURL(txn.restaurant)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {txn.restaurant}
                    </a>
                  </p>
                  <p>
                    <strong>總金額：</strong> NT${txn.totalAmount.toFixed(2)}
                  </p>
                  <p>
                    <strong>狀態：</strong> {txn.status}
                  </p>
                  <p>
                    <strong>時間：</strong> {txn.formattedTimestamp}
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </Card>
        {/* ====== 所有交易記錄卡片式展示結束 ====== */}

        {/* 其他管理員功能 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="訂單管理">
              <OrderManagement />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="用戶管理">
              <List
                itemLayout="horizontal"
                dataSource={transactions.map((txn) => ({
                  id: txn.orderId,
                  name: txn.userName,
                  email: txn.userEmail,
                }))}
                renderItem={(user) => (
                  <List.Item key={user.id}>
                    <List.Item.Meta
                      title={user.name}
                      description={user.email}
                    />
                  </List.Item>
                )}
                style={{ maxHeight: "300px", overflowY: "auto" }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="餐廳管理">
              <List
                itemLayout="vertical"
                size="large"
                dataSource={restaurantSalesData}
                renderItem={(restaurant) => (
                  <List.Item key={restaurant.name}>
                    <List.Item.Meta
                      title={`${restaurant.name}`}
                      description={`銷售額: NT$${restaurant.sales.toFixed(2)}`}
                    />
                  </List.Item>
                )}
                style={{ maxHeight: "300px", overflowY: "auto" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="系統監控">
              <SystemMonitoring />
            </Card>
          </Col>
        </Row>

        {/* 客戶詳細資訊模態框 */}
        <Modal
          title="客戶詳細資訊"
          visible={isCustomerModalVisible}
          onCancel={handleCustomerModalClose}
          footer={[
            <Button key="close" onClick={handleCustomerModalClose}>
              關閉
            </Button>,
          ]}
        >
          {selectedCustomer ? (
            <div>
              <p>
                <strong>ID：</strong> {selectedCustomer.id}
              </p>
              <p>
                <strong>名稱：</strong> {selectedCustomer.name}
              </p>
              <p>
                <strong>電子郵件：</strong> {selectedCustomer.email}
              </p>
              <p>
                <strong>電話：</strong> {selectedCustomer.phone}
              </p>
              <p>
                <strong>地址：</strong> {selectedCustomer.address}
              </p>
            </div>
          ) : (
            <p>暫無數據</p>
          )}
        </Modal>

        {/* 餐廳詳細資訊模態框 */}
        <Modal
          title="餐廳詳細資訊"
          visible={isRestaurantModalVisible}
          onCancel={handleRestaurantModalClose}
          footer={[
            <Button key="close" onClick={handleRestaurantModalClose}>
              關閉
            </Button>,
          ]}
        >
          {selectedRestaurant ? (
            <div>
              <p>
                <strong>名稱：</strong> {selectedRestaurant.name}
              </p>
              <p>
                <strong>地址：</strong> {selectedRestaurant.address}
              </p>
              <p>
                <strong>地點：</strong> Lat: {selectedRestaurant.location.lat},
                Lng: {selectedRestaurant.location.lng}
              </p>
              {/* 根據需要添加更多詳細信息 */}
            </div>
          ) : (
            <p>暫無數據</p>
          )}
        </Modal>

        {/* ====== 新增部分：配送員詳細資訊模態框 ====== */}
        <Modal
          title={`配送員詳細資訊 - ${selectedDeliveryPerson}`}
          visible={isDeliveryPersonModalVisible}
          onCancel={handleDeliveryPersonModalClose}
          footer={[
            <Button key="close" onClick={handleDeliveryPersonModalClose}>
              關閉
            </Button>,
          ]}
          width={800}
        >
          {selectedDeliveryPersonDeliveries.length > 0 ? (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={selectedDeliveryPersonDeliveries}
              renderItem={(delivery) => {
                const { name: restaurantName, url: restaurantURL } =
                  getRestaurantDetailsByOrderId(delivery.orderId);
                return (
                  <List.Item key={delivery.deliveryId}>
                    <List.Item.Meta
                      title={`訂單ID: ${delivery.orderId}`}
                      description={
                        <div>
                          <p>
                            <strong>配送員：</strong> {delivery.deliveryPerson}
                          </p>
                          <p>
                            <strong>取貨時間：</strong>{" "}
                            {dayjs(delivery.pickUpTime).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </p>
                          <p>
                            <strong>配送時間：</strong>{" "}
                            {dayjs(delivery.deliveryTime).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </p>
                          <p>
                            <strong>配送狀態：</strong> {delivery.status}
                          </p>
                          <p>
                            <strong>評分：</strong>{" "}
                            {delivery.rating ? delivery.rating : "無評分"}
                          </p>
                          <p>
                            <strong>餐廳：</strong>{" "}
                            <a
                              href={restaurantURL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {restaurantName}
                            </a>
                          </p>
                          <p>
                            <strong>配送路線：</strong>
                          </p>
                          <List
                            dataSource={delivery.route}
                            renderItem={(routePoint, index) => (
                              <List.Item key={index}>
                                {index === 0 ? "餐廳位置：" : "用戶位置："} Lat:{" "}
                                {routePoint.lat}, Lng: {routePoint.lng}
                              </List.Item>
                            )}
                            size="small"
                            bordered
                          />
                        </div>
                      }
                    />
                  </List.Item>
                );
              }}
              style={{ maxHeight: "600px", overflowY: "auto" }}
            />
          ) : (
            <p>暫無配送記錄</p>
          )}
        </Modal>
        {/* ====== 配送員詳細資訊模態框結束 ====== */}
      </Content>
      <Footer />
    </Layout>
  );
};

export default AdminDashboard;
