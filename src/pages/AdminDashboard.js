import React from "react";
import { Layout, Typography, Row, Col, Card, List } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderManagement from "../components/admin/OrderManagement";
import UserManagement from "../components/admin/UserManagement";
import SystemMonitoring from "../components/admin/SystemMonitoring";
import UserActivityChart from "../components/admin/UserActivityChart";

const { Title } = Typography;
const { Content } = Layout;

// 模擬用戶活躍度數據
const userActivityData = {
  labels: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04"],
  datasets: [
    {
      label: "活躍用戶數",
      data: [12, 19, 3, 5],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// 模擬用戶活躍度排行數據
const topUsers = [
  { id: "u1", name: "張三", activity: 150 },
  { id: "u2", name: "李四", activity: 120 },
  { id: "u3", name: "王五", activity: 100 },
];

// 隨機生成 40 個 3 個字的用戶姓名
const generateChineseName = () => {
  const firstNames = [
    "張",
    "李",
    "王",
    "趙",
    "劉",
    "陳",
    "楊",
    "黃",
    "吳",
    "周",
  ];
  const lastNames = [
    "偉",
    "敏",
    "軍",
    "傑",
    "婷",
    "強",
    "平",
    "輝",
    "霞",
    "龍",
  ];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]}${lastNames[Math.floor(Math.random() * lastNames.length)]}${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

const randomUsers = Array.from({ length: 40 }, (_, index) => ({
  id: `user${index + 1}`,
  name: generateChineseName(),
}));

// 餐廳數據硬編碼
const restaurantData = [
  {
    name: "美味漢堡",
    cuisine: "美式",
    rating: 4.5,
    status: "營業中",
    address: "高雄市鼓山區文信路198號",
  },
  {
    name: "壽司之神",
    cuisine: "日本料理",
    rating: 4.8,
    status: "營業中",
    address: "高雄市鼓山區民利街5號",
  },
  {
    name: "庒稼村食品行",
    cuisine: "中式",
    rating: 4.2,
    status: "營業中",
    address: "高雄市鳥松區美山路39號",
  },
  {
    name: "幸福美味",
    cuisine: "台式",
    rating: 4.7,
    status: "營業中",
    address: "高雄市左營區自由路100號",
  },
  {
    name: "天天快餐",
    cuisine: "中式",
    rating: 4.1,
    status: "營業中",
    address: "台北市中正區忠孝東路1段50號",
  },
  {
    name: "味道之家",
    cuisine: "中式",
    rating: 4.3,
    status: "休息中",
    address: "高雄市鼓山區美術東四路50號",
  },
  {
    name: "享受韓國料理",
    cuisine: "韓式",
    rating: 4.9,
    status: "營業中",
    address: "高雄市苓雅區光華一路148之76號2樓之1",
  },
  {
    name: "阿香飯店",
    cuisine: "台式",
    rating: 4.5,
    status: "營業中",
    address: "高雄市岡山區河華路111號",
  },
  {
    name: "美味小館",
    cuisine: "中式",
    rating: 4.2,
    status: "休息中",
    address: "高雄市鹽埕區五福四路258號",
  },
  {
    name: "好味道餐廳",
    cuisine: "中式",
    rating: 4.8,
    status: "營業中",
    address: "高雄市新興區七賢二路16號",
  },
  {
    name: "正宗川菜館",
    cuisine: "川菜",
    rating: 4.6,
    status: "營業中",
    address: "高雄市左營區自由路88號",
  },
  {
    name: "海鮮大排檔",
    cuisine: "海鮮",
    rating: 4.7,
    status: "營業中",
    address: "高雄市鳳山區海鮮街200號",
  },
  {
    name: "意大利風味餐廳",
    cuisine: "意大利菜",
    rating: 4.8,
    status: "營業中",
    address: "高雄市鼓山區文龍街66號",
  },
  {
    name: "法式料理",
    cuisine: "法國菜",
    rating: 4.9,
    status: "營業中",
    address: "高雄市苓雅區文華路188號",
  },
  {
    name: "健康輕食",
    cuisine: "健康餐",
    rating: 4.4,
    status: "營業中",
    address: "高雄市鳥松區健康街88號",
  },
  {
    name: "中東風味餐廳",
    cuisine: "中東菜",
    rating: 4.3,
    status: "休息中",
    address: "高雄市三民區民族街22號",
  },
  {
    name: "燒烤天堂",
    cuisine: "燒烤",
    rating: 4.5,
    status: "營業中",
    address: "高雄市前鎮區燒烤路123號",
  },
  {
    name: "素食之家",
    cuisine: "素食",
    rating: 4.2,
    status: "營業中",
    address: "高雄市左營區素食路45號",
  },
  {
    name: "泰式風味餐廳",
    cuisine: "泰國菜",
    rating: 4.7,
    status: "營業中",
    address: "高雄市鼓山區民族大道89號",
  },
  {
    name: "墨西哥風味館",
    cuisine: "墨西哥菜",
    rating: 4.6,
    status: "營業中",
    address: "高雄市前鎮區自由路300號",
  },
  {
    name: "韓國炸雞",
    cuisine: "韓式",
    rating: 4.5,
    status: "營業中",
    address: "高雄市左營區香雞路8號",
  },
];

const AdminDashboard = () => {
  return (
    <Layout>
      <Header />
      <Content
        className="admin-dashboard-content"
        style={{ padding: "20px 50px" }}
      >
        <Title level={2}>管理員主頁</Title>
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
                dataSource={randomUsers}
                renderItem={(user) => (
                  <List.Item key={user.id}>
                    <List.Item.Meta
                      title={user.name}
                      description={`用戶 ID: ${user.id}`}
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
                dataSource={restaurantData}
                renderItem={(restaurant) => (
                  <List.Item key={restaurant.name}>
                    <List.Item.Meta
                      title={`${restaurant.name} (${restaurant.cuisine})`}
                      description={`評分: ${restaurant.rating} | 狀態: ${restaurant.status}`}
                    />
                    地址: {restaurant.address}
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
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title="用戶活躍度">
              <UserActivityChart data={userActivityData} />
              <List
                header={<div>活躍用戶排行（前 3 名）</div>}
                bordered
                dataSource={topUsers}
                renderItem={(user) => (
                  <List.Item>
                    {user.name} - 活躍度: {user.activity}
                  </List.Item>
                )}
                style={{ marginTop: "20px" }}
              />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AdminDashboard;
