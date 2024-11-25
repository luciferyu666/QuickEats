// src/data/mockData.js

import dayjs from "dayjs";

// ==================== 角色模擬數據 ====================
export const roles = [
  {
    id: "user",
    name: "用戶",
    description: "享受點餐和配送服務",
    image: "/assets/images/user.png",
  },
  {
    id: "restaurant",
    name: "餐廳",
    description: "管理菜單和訂單",
    image: "/assets/images/restaurant.png",
  },
  {
    id: "delivery",
    name: "外送員",
    description: "負責配送訂單",
    image: "/assets/images/delivery.png",
  },
  {
    id: "admin",
    name: "管理員",
    description: "管理整個系統",
    image: "/assets/images/admin.png",
  },
  {
    id: "menuManager",
    name: "菜單管理員",
    description: "負責管理菜單和庫存",
    image: "/assets/images/menu-manager.png",
  },
  {
    id: "orderManager",
    name: "訂單管理員",
    description: "負責管理訂單和配送",
    image: "/assets/images/order-manager.png",
  },
  // 更多角色...
];

// ==================== 用戶模擬數據 ====================
export const users = [
  {
    id: "user1",
    name: "張三",
    email: "zhangsan@example.com",
    phone: "0987-654-321",
    roleId: "admin",
    twoFactorAuth: false,
  },
  {
    id: "user2",
    name: "李四",
    email: "lisi@example.com",
    phone: "0912-345-678",
    roleId: "menuManager",
    twoFactorAuth: true,
  },
  {
    id: "user3",
    name: "王五",
    email: "wangwu@example.com",
    phone: "0933-222-111",
    roleId: "orderManager",
    twoFactorAuth: false,
  },
  {
    id: "user4",
    name: "趙六",
    email: "zhaoliu@example.com",
    phone: "0955-333-222",
    roleId: "restaurant",
    twoFactorAuth: true,
  },
  {
    id: "user5",
    name: "孫七",
    email: "sunqi@example.com",
    phone: "0922-444-333",
    roleId: "delivery",
    twoFactorAuth: false,
  },
  // 新增用戶示例
  {
    id: "user6",
    name: "周八",
    email: "zhouba@example.com",
    phone: "0933-555-777",
    roleId: "delivery",
    twoFactorAuth: true,
  },
  {
    id: "user7",
    name: "鄭九",
    email: "zhengjiu@example.com",
    phone: "0955-666-888",
    roleId: "restaurant",
    twoFactorAuth: false,
  },
  // 更多用戶...
];

// ==================== 外送員模擬數據 ====================
export const deliveryPerson = {
  id: "delivery1",
  name: "陳大明",
  phone: "0912-345-678",
  email: "daming.chen@example.com",
  vehicle: "摩托車",
  earnings: {
    today: 500,
    week: 3500,
    month: 15000,
  },
  ratings: {
    average: 4.5,
    totalReviews: 120,
  },
};

// 新增外送員示例（如果需要多個外送員，可以將 `deliveryPerson` 改為陣列）
export const deliveryPersons = [
  deliveryPerson,
  {
    id: "delivery2",
    name: "林小紅",
    phone: "0922-777-999",
    email: "xiaohong.lin@example.com",
    vehicle: "電動滑板車",
    earnings: {
      today: 300,
      week: 2100,
      month: 9000,
    },
    ratings: {
      average: 4.8,
      totalReviews: 95,
    },
  },
  {
    id: "delivery3",
    name: "黃小明",
    phone: "0944-888-000",
    email: "xiaoming.huang@example.com",
    vehicle: "自行車",
    earnings: {
      today: 200,
      week: 1400,
      month: 6000,
    },
    ratings: {
      average: 4.6,
      totalReviews: 80,
    },
  },
  // 更多外送員...
];

// ==================== 待接單模擬數據 ====================
export const pendingOrders = [
  {
    orderId: "ORD123456",
    restaurant: "庒稼村食品行",
    restaurantAddress: "高雄市鳥松區美山路39號",
    restaurantLocation: { lat: 22.6273, lng: 120.3014 }, // 餐廳位置
    user: "林小華",
    userAddress: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
    userLocation: { lat: 22.62, lng: 120.432 }, // 用戶位置
    distance: "5公里",
    estimatedTime: "30分鐘",
    status: "待接單",
    totalAmount: 250,
    timestamp: dayjs("2024-04-05T10:30:00"),
  },
  // 更多待接單訂單...
  {
    orderId: "ORD123466",
    restaurant: "幸福美味",
    restaurantAddress: "高雄市左營區自由路100號",
    restaurantLocation: { lat: 22.63, lng: 120.29 }, // 餐廳位置
    user: "鄭十",
    userAddress: "高雄市左營區青海路90號",
    userLocation: { lat: 22.63, lng: 120.29 }, // 用戶位置（假設同餐廳位置）
    distance: "6公里",
    estimatedTime: "35分鐘",
    status: "待接單",
    totalAmount: 300,
    timestamp: dayjs("2024-04-15T09:20:00"),
  },
];

// ==================== 已完成訂單模擬數據 ====================
export const completedOrders = [
  {
    orderId: "ORD123450",
    restaurant: "天天快餐",
    restaurantAddress: "台北市中正區忠孝東路1段50號",
    restaurantLocation: { lat: 25.0375, lng: 121.5637 }, // 餐廳位置
    user: "張三",
    userAddress: "台北市萬華區成都路200號",
    userLocation: { lat: 25.046, lng: 121.5123 }, // 用戶位置
    distance: "3公里",
    deliveryTime: "25分鐘",
    status: "已完成",
    totalAmount: 200,
    rating: 5,
    feedback: "非常快速，服務態度好！",
    reply: "謝謝您的支持，期待再次為您服務！",
    timestamp: dayjs("2024-04-04T09:15:00"),
  },
  {
    orderId: "ORD123451",
    restaurant: "幸福美味",
    restaurantAddress: "高雄市左營區青海路88號",
    restaurantLocation: { lat: 22.63, lng: 120.29 }, // 餐廳位置
    user: "李四",
    userAddress: "高雄市左營區自由路100號",
    userLocation: { lat: 22.63, lng: 120.29 }, // 用戶位置（假設同餐廳位置）
    distance: "4公里",
    deliveryTime: "30分鐘",
    status: "已完成",
    totalAmount: 350,
    rating: 4,
    feedback: "整體滿意，但配送速度可以再快一些。",
    reply: "感謝您的回饋，我們會努力改進配送速度。",
    timestamp: dayjs("2024-04-04T10:45:00"),
  },
  {
    orderId: "ORD123452",
    restaurant: "味道之家",
    restaurantAddress: "高雄市鼓山區美術東四路50號",
    restaurantLocation: { lat: 22.635, lng: 120.275 }, // 餐廳位置
    user: "王小華",
    userAddress: "高雄市鼓山區瑞光路200號",
    userLocation: { lat: 22.638, lng: 120.28 }, // 用戶位置
    distance: "2公里",
    deliveryTime: "20分鐘",
    status: "已完成",
    totalAmount: 180,
    rating: 5,
    feedback: "服務態度佳，配送迅速！",
    reply: "感謝您的好評，期待您的下次光臨！",
    timestamp: dayjs("2024-04-05T11:30:00"),
  },
  {
    orderId: "ORD123466-COMP",
    restaurant: "庒稼村食品行",
    restaurantAddress: "高雄市鳥松區美山路39號",
    restaurantLocation: { lat: 22.6273, lng: 120.3014 }, // 餐廳位置
    user: "周十二",
    userAddress: "高雄市鳥松區光華路88號",
    userLocation: { lat: 22.6273, lng: 120.3014 }, // 用戶位置（假設同餐廳位置）
    distance: "5公里",
    deliveryTime: "30分鐘",
    status: "已完成",
    totalAmount: 350,
    rating: 4,
    feedback: "菜品美味，配送速度適中。",
    reply: "感謝您的回饋，期待您的下次光臨！",
    timestamp: dayjs("2024-04-17T11:30:00"),
  },
  {
    orderId: "ORD123467",
    restaurant: "享受韓國料理餐酒館",
    restaurantAddress: "高雄市苓雅區光華一路148之76號2樓之1",
    restaurantLocation: { lat: 22.64, lng: 120.32 }, // 餐廳位置
    user: "李十一",
    userAddress: "高雄市新興區中正三路50號",
    userLocation: { lat: 22.63, lng: 120.31 }, // 用戶位置
    distance: "6公里",
    deliveryTime: "35分鐘",
    status: "已完成",
    totalAmount: 280,
    rating: 5,
    feedback: "韓式炸雞非常酥脆，冰紅茶也很清爽。",
    reply: "感謝您的好評，期待您的下次光臨！",
    timestamp: dayjs("2024-04-16T15:45:00"),
  },
  // 更多已完成訂單...
];

// ==================== 菜單項目模擬數據 ====================
export const menuItems = [
  {
    id: "menu1",
    name: "宮保雞丁",
    description: "經典川菜，麻辣口味",
    price: 120,
    image: "/assets/images/dishes/kung-pao-chicken.jpg",
    tags: ["招牌", "辣"],
    stock: 50, // 庫存量
    categoryId: "cat1", // 所屬分類
    restaurantId: "rest1", // 所屬餐廳
  },
  {
    id: "menu2",
    name: "蔥油餅",
    description: "傳統美食，香脆可口",
    price: 80,
    image: "/assets/images/dishes/scallion-pancake.jpg",
    tags: ["素食"],
    stock: 30, // 庫存量
    categoryId: "cat2",
    restaurantId: "rest1",
  },
  {
    id: "menu3",
    name: "韓式炸雞",
    description: "酥脆多汁，口味獨特",
    price: 150,
    image: "/assets/images/dishes/korean-fried-chicken.jpg",
    tags: ["招牌"],
    stock: 40,
    categoryId: "cat1",
    restaurantId: "rest2",
  },
  {
    id: "menu4",
    name: "冰紅茶",
    description: "清涼解渴，天然甜味",
    price: 50,
    image: "/assets/images/dishes/iced-red-tea.jpg",
    tags: ["飲料"],
    stock: 100,
    categoryId: "cat2",
    restaurantId: "rest2",
  },
  {
    id: "menu5",
    name: "巧克力蛋糕",
    description: "濃郁巧克力香，口感鬆軟",
    price: 90,
    image: "/assets/images/dishes/chocolate-cake.jpg",
    tags: ["甜點"],
    stock: 25,
    categoryId: "cat3",
    restaurantId: "rest3",
  },
  // 新增菜單項目示例
  {
    id: "menu6",
    name: "麻婆豆腐",
    description: "香辣麻婆，豆腐嫩滑",
    price: 110,
    image: "/assets/images/dishes/mapo-tofu.jpg",
    tags: ["辣"],
    stock: 40,
    categoryId: "cat1",
    restaurantId: "rest1",
  },
  {
    id: "menu7",
    name: "綠茶拿鐵",
    description: "香濃綠茶，順滑拿鐵",
    price: 70,
    image: "/assets/images/dishes/green-tea-latte.jpg",
    tags: ["飲料", "素食"],
    stock: 60,
    categoryId: "cat2",
    restaurantId: "rest3",
  },
  {
    id: "menu8",
    name: "水果沙拉",
    description: "新鮮水果，健康美味",
    price: 100,
    image: "/assets/images/dishes/fresh-fruit-salad.jpg",
    tags: ["健康", "甜點"],
    stock: 20,
    categoryId: "cat3",
    restaurantId: "rest2",
  },
  {
    id: "menu9",
    name: "炸醬麵",
    description: "濃郁炸醬，配料豐富",
    price: 90,
    image: "/assets/images/dishes/zha-jiang-noodles.jpg",
    tags: ["主菜"],
    stock: 35,
    categoryId: "cat1",
    restaurantId: "rest1",
  },
  // 更多菜單項目...
];

// ==================== 菜單分類模擬數據 ====================
export const menuCategories = [
  {
    id: "cat1",
    name: "主菜",
  },
  {
    id: "cat2",
    name: "飲料",
  },
  {
    id: "cat3",
    name: "甜點",
  },
  {
    id: "cat4",
    name: "小吃",
  },
  // 新增分類示例
  {
    id: "cat5",
    name: "健康",
  },
  {
    id: "cat6",
    name: "素食",
  },
  // 更多分類...
];

// ==================== 餐廳列表模擬數據 ====================
export const restaurants = [
  {
    id: "rest1",
    name: "美味漢堡",
    cuisine: "美式",
    rating: 4.5,
    status: "營業中",
    image: "/assets/images/restaurant1.png",
    description: "提供各種美味漢堡，選擇豐富。",
    address: "台北市中正區忠孝西路一段",
  },
  {
    id: "rest2",
    name: "壽司之神",
    cuisine: "日本料理",
    rating: 4.8,
    status: "營業中",
    image: "/assets/images/restaurant2.png",
    description: "新鮮的海鮮壽司，直達您的餐桌。",
    address: "台北市大安區仁愛路四段1號",
  },
  {
    id: "rest3",
    name: "庒稼村食品行",
    cuisine: "中式",
    rating: 4.2,
    status: "營業中",
    image: "/assets/images/restaurant3.png",
    description: "正宗中式料理，美味可口。",
    address: "高雄市鳥松區美山路39號",
  },
  // 更多餐廳...
];

// ==================== 餐廳訂單模擬數據 ====================
export const restaurantOrders = [
  {
    orderId: "RESTORD123",
    userName: "王小明",
    userAddress: "高雄市新興區中正三路3號",
    orderItems: [
      { name: "宮保雞丁", quantity: 2, price: 120 },
      { name: "蔥油餅", quantity: 1, price: 80 },
    ],
    totalAmount: 320,
    status: "新訂單", // 新訂單、準備中、等待配送、已完成
    timestamp: dayjs("2024-04-05T10:30:00"),
  },
  {
    orderId: "RESTORD124",
    userName: "李四",
    userAddress: "高雄市前金區青年三路5號",
    orderItems: [{ name: "宮保雞丁", quantity: 1, price: 120 }],
    totalAmount: 120,
    status: "準備中",
    timestamp: dayjs("2024-04-05T11:00:00"),
  },
  {
    orderId: "RESTORD125",
    userName: "張三",
    userAddress: "高雄市鼓山區瑞光路200號",
    orderItems: [
      { name: "韓式炸雞", quantity: 3, price: 150 },
      { name: "冰紅茶", quantity: 2, price: 50 },
    ],
    totalAmount: 550,
    status: "等待配送",
    timestamp: dayjs("2024-04-06T12:45:00"),
  },
  {
    orderId: "RESTORD126",
    userName: "王小華",
    userAddress: "高雄市左營區自由路100號",
    orderItems: [
      { name: "巧克力蛋糕", quantity: 1, price: 90 },
      { name: "冰紅茶", quantity: 1, price: 50 },
    ],
    totalAmount: 140,
    status: "已完成",
    timestamp: dayjs("2024-04-07T14:00:00"),
  },
  // 新增餐廳訂單示例
  {
    orderId: "RESTORD127",
    userName: "陳十三",
    userAddress: "高雄市苓雅區自由路120號",
    orderItems: [
      { name: "韓式炸雞", quantity: 1, price: 150 },
      { name: "冰紅茶", quantity: 2, price: 50 },
    ],
    totalAmount: 250,
    status: "新訂單",
    timestamp: dayjs("2024-04-18T16:00:00"),
  },
  {
    orderId: "RESTORD128",
    userName: "林十四",
    userAddress: "高雄市鼓山區瑞光路300號",
    orderItems: [
      { name: "巧克力蛋糕", quantity: 2, price: 90 },
      { name: "蔥油餅", quantity: 2, price: 80 },
    ],
    totalAmount: 340,
    status: "準備中",
    timestamp: dayjs("2024-04-19T12:20:00"),
  },
  // 更多餐廳訂單...
];

// ==================== 工作日誌模擬數據 ====================
export const workLogs = [
  {
    date: "2024-04-01",
    status: "在線",
    deliveries: 5,
    distance: "20公里",
    timeSpent: "5小時",
  },
  {
    date: "2024-04-02",
    status: "休息",
    deliveries: 0,
    distance: "0公里",
    timeSpent: "0小時",
  },
  {
    date: "2024-04-03",
    status: "在線",
    deliveries: 7,
    distance: "35公里",
    timeSpent: "6小時",
  },
  {
    date: "2024-04-04",
    status: "在線",
    deliveries: 4,
    distance: "15公里",
    timeSpent: "4小時",
  },
  {
    date: "2024-04-05",
    status: "休息",
    deliveries: 0,
    distance: "0公里",
    timeSpent: "0小時",
  },
  // 新增工作日誌示例
  {
    date: "2024-04-06",
    status: "在線",
    deliveries: 6,
    distance: "25公里",
    timeSpent: "5.5小時",
  },
  {
    date: "2024-04-07",
    status: "休息",
    deliveries: 0,
    distance: "0公里",
    timeSpent: "0小時",
  },
  {
    date: "2024-04-08",
    status: "在線",
    deliveries: 8,
    distance: "30公里",
    timeSpent: "6小時",
  },
  {
    date: "2024-04-09",
    status: "在線",
    deliveries: 4,
    distance: "15公里",
    timeSpent: "4小時",
  },
  // 更多工作日誌...
];

// ==================== 用戶評價模擬數據 ====================
export const userReviews = [
  {
    orderId: "RESTORD123",
    userName: "王小明",
    rating: 5,
    feedback: "菜品非常美味，送餐迅速！",
    reply: "謝謝您的支持，期待再次為您服務！",
    timestamp: dayjs("2024-04-05T10:35:00"),
  },
  {
    orderId: "RESTORD124",
    userName: "李四",
    rating: 4,
    feedback: "整體滿意，但配送速度可以再快一些。",
    reply: "感謝您的回饋，我們會努力改進配送速度。",
    timestamp: dayjs("2024-04-05T11:05:00"),
  },
  {
    orderId: "RESTORD125",
    userName: "張三",
    rating: 5,
    feedback: "韓式炸雞非常酥脆，冰紅茶也很清爽。",
    reply: "感謝您的好評，期待您的下次光臨！",
    timestamp: dayjs("2024-04-06T12:50:00"),
  },
  {
    orderId: "RESTORD126",
    userName: "王小華",
    rating: 3,
    feedback: "巧克力蛋糕味道一般，冰紅茶稍微甜了些。",
    reply: "感謝您的回饋，我們會調整甜度以提供更好的口感。",
    timestamp: dayjs("2024-04-07T14:05:00"),
  },
  // 新增用戶評價示例
  {
    orderId: "RESTORD127",
    userName: "陳十三",
    rating: 4,
    feedback: "韓式炸雞不錯，冰紅茶稍微有點甜。",
    reply: "感謝您的回饋，我們會調整甜度以提供更好的口感。",
    timestamp: dayjs("2024-04-18T16:10:00"),
  },
  {
    orderId: "RESTORD128",
    userName: "林十四",
    rating: 3,
    feedback: "巧克力蛋糕味道一般，蔥油餅稍微鹹了一點。",
    reply: "感謝您的意見，我們會持續改進菜品口味。",
    timestamp: dayjs("2024-04-19T12:30:00"),
  },
  // 更多評價...
];

// ==================== 系統公告模擬數據 ====================
export const systemAnnouncements = [
  {
    id: 1,
    type: "系統維護",
    title: "系統維護通知",
    content: "我們將於2024年5月1日進行系統維護，維護期間服務將暫停。",
  },
  {
    id: 2,
    type: "促銷活動",
    title: "春季大促銷",
    content: "從2024年5月1日至5月15日，所有菜品享受九折優惠！",
  },
  {
    id: 3,
    type: "新功能",
    title: "新增報表下載功能",
    content: "我們已新增收入報表下載功能，您可以在儀表板中生成並下載報表。",
  },
  // 新增公告示例
  {
    id: 4,
    type: "促銷活動",
    title: "夏季特惠",
    content: "從2024年6月1日至6月15日，所有飲料買一送一！",
  },
  {
    id: 5,
    type: "新功能",
    title: "新增用戶反饋功能",
    content: "我們已新增用戶反饋功能，歡迎您提供寶貴意見。",
  },
  // 更多公告...
];

// ==================== 自動化任務模擬數據 ====================
export const automatedTasks = [
  {
    id: 1,
    type: "生成報表",
    frequency: "每日",
    time: "18:00",
  },
  {
    id: 2,
    type: "發送通知",
    frequency: "每週",
    time: "09:00",
  },
  {
    id: 3,
    type: "備份數據",
    frequency: "每月",
    time: "02:00",
  },
  // 新增自動化任務示例
  {
    id: 4,
    type: "更新菜單",
    frequency: "每月",
    time: "03:00",
  },
  {
    id: 5,
    type: "清理舊數據",
    frequency: "每週",
    time: "04:00",
  },
  // 更多任務...
];

// ==================== 通知模擬數據 ====================
export const notifications = [
  {
    id: 1,
    type: "新訂單",
    message: "收到一筆新訂單 ORD123456。",
    read: false,
  },
  {
    id: 2,
    type: "評價",
    message: "用戶王小明對您的服務給予了5星評價。",
    read: false,
  },
  {
    id: 3,
    type: "系統",
    message: "系統更新已完成。",
    read: true,
  },
  {
    id: 4,
    type: "促銷活動",
    message: "春季大促銷活動即將開始，快來參與吧！",
    read: false,
  },
  // 新增通知示例
  {
    id: 5,
    type: "系統",
    message: "系統維護已完成，服務恢復正常。",
    read: true,
  },
  {
    id: 6,
    type: "促銷活動",
    message: "夏季特惠活動已開始，快來參與吧！",
    read: false,
  },
  {
    id: 7,
    type: "新功能",
    message: "新增用戶反饋功能，您的意見對我們很重要。",
    read: false,
  },
  // 更多通知...
];

// ==================== 營業時間模擬數據 ====================
export const operatingHours = {
  regular: {
    Monday: {
      open: dayjs("09:00", "HH:mm"),
      close: dayjs("21:00", "HH:mm"),
      closed: false,
    },
    Tuesday: {
      open: dayjs("09:00", "HH:mm"),
      close: dayjs("21:00", "HH:mm"),
      closed: false,
    },
    Wednesday: {
      open: dayjs("09:00", "HH:mm"),
      close: dayjs("21:00", "HH:mm"),
      closed: false,
    },
    Thursday: {
      open: dayjs("09:00", "HH:mm"),
      close: dayjs("21:00", "HH:mm"),
      closed: false,
    },
    Friday: {
      open: dayjs("09:00", "HH:mm"),
      close: dayjs("22:00", "HH:mm"),
      closed: false,
    },
    Saturday: {
      open: dayjs("10:00", "HH:mm"),
      close: dayjs("22:00", "HH:mm"),
      closed: false,
    },
    Sunday: {
      open: dayjs("10:00", "HH:mm"),
      close: dayjs("20:00", "HH:mm"),
      closed: false,
    },
  },
  specialDates: [
    {
      key: "2024-05-01",
      date: "2024-05-01",
      status: "休息中",
      open: null,
      close: null,
    },
    {
      key: "2024-06-01",
      date: "2024-06-01",
      status: "營業中",
      open: dayjs("08:00", "HH:mm"),
      close: dayjs("22:00", "HH:mm"),
    },
    {
      key: "2024-12-25",
      date: "2024-12-25",
      status: "休息中",
      open: null,
      close: null,
    },
    // 新增特殊日期示例
    {
      key: "2024-07-04",
      date: "2024-07-04",
      status: "營業中",
      open: dayjs("08:00", "HH:mm"),
      close: dayjs("22:00", "HH:mm"),
    },
    {
      key: "2024-10-10",
      date: "2024-10-10",
      status: "休息中",
      open: null,
      close: null,
    },
    // 更多特殊日期設定...
  ],
};

// ==================== 設定模擬數據 ====================
export const settings = {
  restaurantName: "庒稼村食品行",
  address: "高雄市鳥松區美山路39號",
  phone: "07-1234567",
  email: "restaurant@example.com",
  roles: ["管理員", "菜單管理員", "訂單管理員"],
  operatingHours: operatingHours,
  deliveryRange: "10公里",
  // 新增設定示例
  currency: "NT$",
  language: "繁體中文",
  timezone: "Asia/Taipei",
  // 更多設定...
};

// ==================== 收入模擬數據 ====================

// 每日收入模擬數據
export const dailyRevenue = [
  { date: "2024-04-01", amount: 1500 },
  { date: "2024-04-02", amount: 1800 },
  { date: "2024-04-03", amount: 2000 },
  { date: "2024-04-04", amount: 1700 },
  { date: "2024-04-05", amount: 1600 },
  { date: "2024-04-06", amount: 1900 },
  { date: "2024-04-07", amount: 2100 },
  { date: "2024-04-08", amount: 2200 },
  { date: "2024-04-09", amount: 2400 },
  { date: "2024-04-10", amount: 2300 },
  // 新增每日收入示例
  { date: "2024-04-11", amount: 2100 },
  { date: "2024-04-12", amount: 1800 },
  { date: "2024-04-13", amount: 2200 },
  { date: "2024-04-14", amount: 2500 },
  // 更多每日收入...
];

// 每周收入模擬數據
export const weeklyRevenue = [
  {
    weekStart: "2024-04-01",
    weekEnd: "2024-04-07",
    amount: 12000,
  },
  {
    weekStart: "2024-04-08",
    weekEnd: "2024-04-14",
    amount: 14000,
  },
  {
    weekStart: "2024-04-15",
    weekEnd: "2024-04-21",
    amount: 13000,
  },
  {
    weekStart: "2024-04-22",
    weekEnd: "2024-04-28",
    amount: 15000,
  },
  {
    weekStart: "2024-04-29",
    weekEnd: "2024-05-05",
    amount: 16000,
  },
  // 新增每周收入示例
  {
    weekStart: "2024-05-06",
    weekEnd: "2024-05-12",
    amount: 17000,
  },
  // 更多每周收入...
];

// 每月收入模擬數據
export const monthlyRevenue = [
  { month: "2024-04", amount: 50000 },
  { month: "2024-05", amount: 60000 },
  { month: "2024-06", amount: 55000 },
  { month: "2024-07", amount: 62000 },
  { month: "2024-08", amount: 58000 },
  { month: "2024-09", amount: 63000 },
  { month: "2024-10", amount: 70000 },
  { month: "2024-11", amount: 65000 },
  { month: "2024-12", amount: 72000 },
  // 新增每月收入示例
  { month: "2024-05", amount: 60000 },
  { month: "2024-06", amount: 55000 },
  { month: "2024-07", amount: 62000 },
  // 更多每月收入...
];

// ==================== 查看訂單模擬數據 ====================
export const allOrders = [
  {
    orderId: "ORD123462",
    userName: "李小龍",
    userEmail: "lilong@example.com",
    userPhone: "0912-333-444",
    userAddress: "高雄市新興區中正三路3號",
    restaurant: "美味佳餐廳",
    restaurantAddress: "高雄市鹽埕區海安路100號",
    restaurantLocation: { lat: 22.62, lng: 120.3 }, // 餐廳位置
    userLocation: { lat: 22.625, lng: 120.42 }, // 用戶位置
    orderItems: [
      { name: "宮保雞丁", quantity: 1, price: 120 },
      { name: "蔥油餅", quantity: 1, price: 80 },
    ],
    totalAmount: 200,
    status: "待處理", // 待處理、已處理、已完成、已取消
    timestamp: dayjs("2024-04-11T16:20:00"),
    deliveryInfo: {
      deliveryPerson: "陳大明",
      deliveryStatus: "配送中", // 配送中、已配送、配送失敗
      deliveryTime: "35分鐘",
    },
  },
  {
    orderId: "ORD123463",
    userName: "王大維",
    userEmail: "dave.wang@example.com",
    userPhone: "0922-555-666",
    userAddress: "高雄市鼓山區瑞光路300號",
    restaurant: "幸福美味",
    restaurantAddress: "高雄市左營區自由路100號",
    restaurantLocation: { lat: 22.63, lng: 120.29 }, // 餐廳位置
    userLocation: { lat: 22.63, lng: 120.29 }, // 用戶位置（假設同餐廳位置）
    orderItems: [
      { name: "巧克力蛋糕", quantity: 1, price: 90 },
      { name: "蔥油餅", quantity: 1, price: 80 },
    ],
    totalAmount: 170,
    status: "已完成",
    timestamp: dayjs("2024-04-19T12:20:00"),
    deliveryInfo: {
      deliveryPerson: "黃小明",
      deliveryStatus: "已配送",
      deliveryTime: "25分鐘",
    },
  },
  {
    orderId: "ORD123464",
    userName: "陳曉明",
    userEmail: "xiaoming.chen@example.com",
    userPhone: "0933-777-888",
    userAddress: "高雄市新興區中正三路50號",
    restaurant: "精隨食品行",
    restaurantAddress: "高雄市新興區開封路56號",
    restaurantLocation: { lat: 22.63, lng: 120.29 }, // 餐廳位置
    userLocation: { lat: 22.63, lng: 120.31 }, // 用戶位置
    orderItems: [
      { name: "冰紅茶", quantity: 4, price: 50 },
      { name: "蔥油餅", quantity: 2, price: 80 },
    ],
    totalAmount: 360,
    status: "待處理",
    timestamp: dayjs("2024-04-19T12:20:00"),
    deliveryInfo: {
      deliveryPerson: "張小華",
      deliveryStatus: "配送中",
      deliveryTime: "40分鐘",
    },
  },
  // 更多訂單...
];

// ==================== 最近訂單模擬數據 ====================
export const recentOrders = [
  {
    orderId: "ORD001",
    userName: "張三",
    userAddress: "台北市萬華區成都路200號",
    date: "2024-04-01",
    totalAmount: 45.5,
    orderItems: [
      {
        name: "牛肉麵",
        price: 15.0,
        quantity: 2,
        image: "/assets/images/beef_noodle.png",
      },
      {
        name: "炸醬麵",
        price: 15.5,
        quantity: 1,
        image: "/assets/images/zhajiang_noodle.png",
      },
      {
        name: "小籠包",
        price: 15.0,
        quantity: 2,
        image: "/assets/images/xiaolongbao.png",
      },
    ],
    paymentMethod: "信用卡",
    restaurantAddress: "台北市大安區仁愛路四段1號",
    distance: "5公里",
    estimatedTime: "30分鐘",
    timestamp: dayjs("2024-04-01T10:00:00Z"),
  },
  {
    orderId: "ORD002",
    userName: "李四",
    userAddress: "高雄市左營區青海路90號",
    date: "2024-04-02",
    totalAmount: 30.0,
    orderItems: [
      {
        name: "雞腿飯",
        price: 10.0,
        quantity: 3,
        image: "/assets/images/chicken_rice.png",
      },
    ],
    paymentMethod: "現金",
    restaurantAddress: "高雄市中正區忠孝西路一段100號",
    distance: "3公里",
    estimatedTime: "20分鐘",
    timestamp: dayjs("2024-04-02T12:30:00Z"),
  },
  // 更多訂單...
];

// ==================== 促銷活動模擬數據 ====================
export const promotions = [
  {
    id: "promo1",
    title: "買一送一",
    description: "所有漢堡買一送一，限今日。",
    image: "/assets/images/promo1.jpg",
  },
  {
    id: "promo2",
    title: "壽司套餐特價",
    description: "壽司套餐特價 NT$500，原價 NT$800。",
    image: "/assets/images/promo2.jpg",
  },
  // 更多促銷活動...
];

// ==================== 用戶收藏模擬數據 ====================
export const userFavorites = [
  "rest1",
  "rest2",
  // "rest3",
  // 如果沒有收藏，保持為空數組
];

// ==================== 管理員相關模擬數據 ====================

// 管理員查看訂單模擬數據
export const adminOrders = [
  {
    id: "1",
    orderId: "ORD123456",
    userName: "張三",
    restaurantName: "阿香飯店",
    amount: 250,
    status: "新訂單",
    orderTime: "2024-04-25 10:30",
    deliveryAddress: "台北市信義區松山路123號",
  },
  {
    id: "2",
    orderId: "ORD123457",
    userName: "李四",
    restaurantName: "美味小館",
    amount: 180,
    status: "進行中",
    orderTime: "2024-04-25 11:00",
    deliveryAddress: "新北市板橋區中山路456號",
  },
  {
    id: "3",
    orderId: "ORD123458",
    userName: "王五",
    restaurantName: "好味道餐廳",
    amount: 300,
    status: "已完成",
    orderTime: "2024-04-24 09:15",
    deliveryAddress: "台中市北區光復路789號",
  },
  {
    id: "4",
    orderId: "ORD123459",
    userName: "趙六",
    restaurantName: "香辣鍋",
    amount: 220,
    status: "取消",
    orderTime: "2024-04-23 14:45",
    deliveryAddress: "高雄市左營區自由路101號",
  },
  // 更多订单数据...
];

// 管理員用戶模擬數據
export const adminUsers = [
  {
    id: "u1",
    name: "張三",
    email: "zhangsan@example.com",
    registrationDate: "2024-01-15",
    role: "普通用戶",
    orderCount: 5,
  },
  {
    id: "u2",
    name: "李四",
    email: "lisi@example.com",
    registrationDate: "2024-02-20",
    role: "高級用戶",
    orderCount: 12,
  },
  {
    id: "u3",
    name: "王五",
    email: "wangwu@example.com",
    registrationDate: "2024-03-10",
    role: "餐廳管理員",
    orderCount: 8,
  },
  // 更多用户数据...
];

// 管理員餐廳模擬數據
export const adminRestaurants = [
  {
    id: "r1",
    name: "阿香飯店",
    address: "台北市信義區松山路123號",
    status: "營業中",
    rating: 4.5,
    operatingHours: "週一至週日 10:00 - 22:00",
    revenue: 50000,
  },
  {
    id: "r2",
    name: "美味小館",
    address: "新北市板橋區中山路456號",
    status: "休息中",
    rating: 4.2,
    operatingHours: "週一至週五 11:00 - 21:00",
    revenue: 35000,
  },
  {
    id: "r3",
    name: "好味道餐廳",
    address: "台中市北區光復路789號",
    status: "營業中",
    rating: 4.8,
    operatingHours: "週一至週日 09:00 - 23:00",
    revenue: 75000,
  },
  // 更多餐廳数据...
];

// 系統監控模擬數據
export const systemMonitoring = {
  serviceStatus: [
    { name: "資料庫", status: "正常" },
    { name: "伺服器", status: "正常" },
    { name: "API 服務", status: "正常" },
    { name: "支付網關", status: "正常" },
  ],
  trafficStats: {
    dailyRequests: 1200,
    averageResponseTime: 350, // 毫秒
    peakTrafficPercentage: 75, // 百分比
  },
  errorLogs: [
    "2024-04-25 12:00:00 - 數據庫連接超時。",
    "2024-04-24 16:30:00 - API 服務異常。",
    // 更多错误日志...
  ],
};

// ==================== 其他導出數據 ====================

// 繼續作為獨立的命名導出
// export const roles = [
//   // ... 之前的 roles 數據
// ];

// export const users = [
//   // ... 之前的 users 數據
// ];

// ... 其他數據導出如 deliveryPersons, orders, menuItems 等
