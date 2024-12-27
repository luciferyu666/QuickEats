// scripts/generateOrders.js

const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const {
  customers,
  restaurants,
  deliveryPersons,
  menuItems,
} = require("../src/data/mockData.js"); // 確保路徑正確，並使用 .js 擴展名

// 工具函數
const generateOrderId = (index) => `ORD124${String(index).padStart(3, "0")}`;

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

// 生成不在週末的隨機日期
const generateRandomDate = (start, end) => {
  let date = dayjs(start);
  const endDate = dayjs(end);
  const totalDays = endDate.diff(start, "day");

  while (true) {
    const randomDay = Math.floor(Math.random() * totalDays);
    let randomDate = date.add(randomDay, "day");
    const dayOfWeek = randomDate.day(); // 0 (Sunday) - 6 (Saturday)

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // 排除週六與週日
      const hour = Math.floor(Math.random() * 12) + 8; // 8 AM 至 8 PM
      const minute = Math.floor(Math.random() * 60);
      return randomDate.hour(hour).minute(minute).second(0);
    }
  }
};

// 生成訂單項目
const generateOrderItems = () => {
  const numberOfItems = Math.floor(Math.random() * 3) + 1; // 1 至 3 個菜品
  const items = [];

  for (let i = 0; i < numberOfItems; i++) {
    const item = getRandomElement(menuItems);
    const quantity = Math.floor(Math.random() * 3) + 1; // 1 至 3 個
    items.push({ name: item.name, quantity, price: item.price });
  }

  return items;
};

// 生成訂單狀態
const statuses = ["已完成", "待處理", "配送中", "已取消"];

// 生成訂單
const generateOrders = (count, startIndex) => {
  const orders = [];

  for (let i = 1; i <= count; i++) {
    const orderId = generateOrderId(startIndex + i);
    const user = getRandomElement(customers);
    const restaurant = getRandomElement(restaurants);
    const orderItems = generateOrderItems();
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const status = getRandomElement(statuses);
    const timestamp = generateRandomDate("2024-09-16", "2024-12-26");
    const deliveryPerson = getRandomElement(deliveryPersons);

    // 根據訂單狀態設定配送狀態
    let deliveryStatus = "待配送";
    if (status === "已完成") {
      deliveryStatus = "已配送";
    } else if (status === "配送中") {
      deliveryStatus = "配送中";
    } else if (status === "已取消") {
      deliveryStatus = "已取消";
    }

    // 隨機設定配送時間
    const deliveryTime = `${Math.floor(Math.random() * 16) + 25}分鐘`; // 25 至 40 分鐘

    // 用戶電子郵件和電話
    const userEmail = user.email || `${user.username}@example.com`;
    const userPhone = user.phone || "0912-345-678"; // 如果沒有電話，設置預設值

    // 用戶位置
    const userLocation = user.userLocation || { lat: 22.63, lng: 120.31 }; // 預設值

    // 餐廳位置
    const restaurantLocation = restaurant.restaurantLocation || {
      lat: 22.63,
      lng: 120.29,
    };

    orders.push({
      orderId,
      userName: user.name,
      userEmail,
      userPhone,
      userAddress: user.address,
      restaurant: restaurant.name,
      restaurantAddress: restaurant.address,
      restaurantLocation,
      userLocation,
      orderItems,
      totalAmount,
      status,
      timestamp: timestamp.toISOString(), // 保存為 ISO 字符串
      deliveryInfo: {
        deliveryPerson: deliveryPerson.name,
        deliveryStatus,
        deliveryTime,
      },
    });
  }

  return orders;
};

// 生成 200 筆訂單
const totalNewOrders = 200;
const startIndex = 0; // 如果已有部分訂單，調整以避免 orderId 重複
const newOrders = generateOrders(totalNewOrders, startIndex);

// 確定生成的 JSON 文件路徑
const outputPath = path.join(__dirname, "generatedOrders.json");

// 將新訂單保存為 JSON 文件
fs.writeFileSync(outputPath, JSON.stringify(newOrders, null, 2), "utf-8");

console.log(`已生成 ${totalNewOrders} 筆訂單並保存至 ${outputPath}`);
