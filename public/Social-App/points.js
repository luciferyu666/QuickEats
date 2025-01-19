// points.js

// ============================================
// 點數系統（含快速充值、自訂充值、查看充值紀錄）
// ============================================
const userPointsElement = document.getElementById("userPoints");
let userPoints = 1000;

// 模擬可充值的金額列表
const simulatedTopUps = [100, 200, 300];
let topUpIndex = 0;

// 充值紀錄
const rechargeHistory = []; // 每次成功充值都會記錄 { amount, time }

// 綁定「（原）模擬充值」按鈕
document.getElementById("addPoints").addEventListener("click", () => {
  const topUpAmount = simulatedTopUps[topUpIndex];
  antd.Modal.confirm({
    title: "確認充值",
    content: `是否確定要充值 ${topUpAmount} 點？`,
    onOk: () => {
      userPoints += topUpAmount;
      userPointsElement.textContent = userPoints;
      addRechargeRecord(topUpAmount);

      antd.notification.success({
        message: "充值成功",
        description: `充值點數：${topUpAmount}，當前點數：${userPoints}`,
      });

      // 循環模擬下次充值金額
      topUpIndex = (topUpIndex + 1) % simulatedTopUps.length;
    },
    onCancel: () => {
      antd.notification.info({
        message: "充值取消",
        description: "您已取消本次充值操作。",
      });
    },
  });
});

// 快速充值（50,100,200）
function quickRecharge(amount) {
  antd.Modal.confirm({
    title: "快速充值",
    content: `是否確定要充值 ${amount} 點？`,
    onOk: () => {
      userPoints += amount;
      userPointsElement.textContent = userPoints;
      addRechargeRecord(amount);

      antd.notification.success({
        message: "充值成功",
        description: `充值點數：${amount}，當前點數：${userPoints}`,
      });
    },
  });
}

// 自定義充值
document
  .getElementById("customRechargeBtn")
  .addEventListener("click", showCustomRechargeModal);

function showCustomRechargeModal() {
  antd.Modal.confirm({
    title: "自定義充值",
    icon: null,
    content: `
      <div>
        <p>請輸入充值金額：</p>
        <input type="number" id="customRechargeInput" class="ant-input" style="width:100%" />
      </div>
    `,
    onOk: () => {
      const value = document.getElementById("customRechargeInput").value;
      const amount = parseInt(value, 10);

      if (!amount || amount <= 0) {
        antd.notification.error({
          message: "充值失敗",
          description: "請輸入正確的金額（必須大於 0）。",
        });
        // return Promise.reject() 以阻止 modal 關閉
        return Promise.reject();
      }

      userPoints += amount;
      userPointsElement.textContent = userPoints;
      addRechargeRecord(amount);

      antd.notification.success({
        message: "充值成功",
        description: `充值點數：${amount}，當前點數：${userPoints}`,
      });
    },
  });
}

// 查看充值紀錄
document
  .getElementById("viewHistoryBtn")
  .addEventListener("click", showRechargeHistory);

function showRechargeHistory() {
  if (rechargeHistory.length === 0) {
    antd.Modal.info({
      title: "充值紀錄",
      content: "目前尚無任何充值紀錄。",
    });
    return;
  }
  const listHtml = rechargeHistory
    .map(
      (record, index) =>
        `<li>(${index + 1}) 充值 <strong>${record.amount}</strong> 點 - 時間：${record.time}</li>`
    )
    .join("");

  antd.Modal.info({
    title: "充值紀錄",
    width: 500,
    content: `<ul style="list-style: none; padding-left: 0;">${listHtml}</ul>`,
  });
}

// 寫入歷史紀錄
function addRechargeRecord(amount) {
  rechargeHistory.push({
    amount,
    time: new Date().toLocaleString(),
  });
}
