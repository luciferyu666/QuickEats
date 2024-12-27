// updateMockData.js
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

// 定義 mockData.js 的路徑
const mockDataPath = path.join(__dirname, "mockData.js");

// 讀取 mockData.js 文件內容
let mockDataContent = fs.readFileSync(mockDataPath, "utf-8");

// 使用正則表達式提取 transactions 數據
const transactionsMatch = mockDataContent.match(
  /export const transactions = (\[[\s\S]*?\]);/
);
if (!transactionsMatch) {
  console.error(
    '未能找到 transactions 數據。請確保 mockData.js 中存在 "export const transactions = [...]"。'
  );
  process.exit(1);
}

// 提取 transactions 字符串
let transactionsStr = transactionsMatch[1];

// 移除所有註釋（單行註釋和多行註釋）
transactionsStr = transactionsStr.replace(/\/\/.*$/gm, ""); // 移除單行註釋
transactionsStr = transactionsStr.replace(/\/\*[\s\S]*?\*\//g, ""); // 移除多行註釋

// 解析 transactions 數據
let transactions;
try {
  transactions = JSON.parse(transactionsStr);
} catch (error) {
  console.error(
    "解析 transactions 數據時出錯。請檢查 mockData.js 中 transactions 的格式。"
  );
  console.error(error);
  process.exit(1);
}

// 定義配送路線的範例（可以根據需要調整）
const defaultRoute = [
  { lat: 22.64, lng: 120.315 },
  { lat: 22.63, lng: 120.31 },
];

// 更新每筆交易的 deliveryInfo
const updatedTransactions = transactions.map((transaction) => ({
  ...transaction,
  deliveryInfo: {
    ...transaction.deliveryInfo,
    pickupTime:
      transaction.deliveryInfo.pickupTime ||
      dayjs(transaction.timestamp).subtract(25, "minute").toISOString(),
    actualDeliveryTime:
      transaction.deliveryInfo.actualDeliveryTime ||
      dayjs(transaction.timestamp).toISOString(),
    deliveryRoute: transaction.deliveryInfo.deliveryRoute || defaultRoute,
    deliveryRating:
      transaction.deliveryInfo.deliveryRating ||
      parseFloat((Math.random() * 2.5 + 2.5).toFixed(1)), // 隨機評分 2.5 至 5
  },
}));

// 構建新的 mockData.js 內容
const updatedMockDataContent = mockDataContent.replace(
  /export const transactions = (\[[\s\S]*?\]);/,
  `export const transactions = ${JSON.stringify(updatedTransactions, null, 2)};`
);

// 將更新後的數據寫回 mockData.js
fs.writeFileSync(mockDataPath, updatedMockDataContent, "utf-8");

console.log("mockData.js 已成功更新！");
