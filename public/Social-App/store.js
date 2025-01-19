// store.js

// ============================================
// 擴展後的「兌換功能」(商城) - 全由前端模擬資料構成 (React 版本)
// ============================================
// 大量新增商品資料來取代實際後端/DB
// type: "虛擬" 或 "實體"；stock: 庫存數量
let storeItems = [
  {
    id: 1,
    name: "虛擬貼圖",
    type: "虛擬",
    price: 200,
    stock: 10,
    desc: "可愛表情貼圖",
  },
  {
    id: 2,
    name: "禮品卡",
    type: "實體",
    price: 500,
    stock: 5,
    desc: "可在指定商店消費使用的禮品卡",
  },
  {
    id: 3,
    name: "超萌角色造型",
    type: "虛擬",
    price: 350,
    stock: 8,
    desc: "解鎖聊天時的專屬角色造型",
  },
  {
    id: 4,
    name: "咖啡兌換券",
    type: "實體",
    price: 300,
    stock: 2,
    desc: "可至合作咖啡店兌換 1 杯中杯飲品",
  },
  {
    id: 5,
    name: "期間限定豪華禮包",
    type: "虛擬",
    price: 800,
    stock: 1,
    desc: "內含多項虛寶與特別優惠券，僅限活動期間兌換",
  },
  {
    id: 6,
    name: "VIP 聊天背景主題",
    type: "虛擬",
    price: 450,
    stock: 10,
    desc: "讓您的聊天介面擁有與眾不同的炫麗主題",
  },
  {
    id: 7,
    name: "週年慶獨家勳章",
    type: "虛擬",
    price: 250,
    stock: 3,
    desc: "顯示在您的個人檔案上，限時兌換",
  },
  {
    id: 8,
    name: "書店購物金",
    type: "實體",
    price: 600,
    stock: 4,
    desc: "可於合作書店抵用等值金額",
  },
  {
    id: 9,
    name: "異國美食優惠券",
    type: "實體",
    price: 400,
    stock: 5,
    desc: "到指定餐廳用餐可折抵部分消費金額",
  },
  {
    id: 10,
    name: "主播特別語音包",
    type: "虛擬",
    price: 1000,
    stock: 1,
    desc: "可於通話時自訂鈴聲與特別語音反饋（限量）",
  },
];

// 兌換紀錄
const redeemHistory = []; // { itemName, cost, time }

// 綁定「查看商城」按鈕
document
  .getElementById("openStoreBtn")
  .addEventListener("click", showStoreModal);

// 綁定「查看兌換紀錄」按鈕
document
  .getElementById("redeemHistoryBtn")
  .addEventListener("click", showRedeemHistory);

// 綁定「管理商品」按鈕
document
  .getElementById("manageItemsBtn")
  .addEventListener("click", showManageItemModal);

// ============================================================
// 使用 React.createElement + dangerouslySetInnerHTML 來避免 error #31
// ============================================================
function showStoreModal() {
  let storeHtml = storeItems
    .map(
      (item) => `
          <div class="border rounded p-2 mb-2">
            <h4 class="font-bold">${item.name} (${item.type})</h4>
            <p>價格：<span class="text-green-500">${item.price} 點</span></p>
            <p>庫存：${item.stock}</p>
            <p>描述：${item.desc}</p>
            <button class="ant-btn ant-btn-primary ant-btn-sm mt-2"
              onclick="redeemItem(${item.id})"
              ${item.stock <= 0 ? "disabled" : ""}
            >
              兌換
            </button>
          </div>
        `
    )
    .join("");

  if (!storeHtml) {
    storeHtml = "<p>目前尚無可供兌換的商品。</p>";
  }

  // 建立 React element
  const container = React.createElement("div", {
    dangerouslySetInnerHTML: { __html: storeHtml },
  });

  antd.Modal.info({
    title: "商城商品列表",
    width: 600,
    okText: "關閉",
    content: container, // 傳入 React element
  });
}

// 兌換商品 (可保持原狀)
function redeemItem(itemId) {
  const item = storeItems.find((i) => i.id === itemId);
  if (!item) {
    antd.notification.error({
      message: "兌換失敗",
      description: "商品不存在或已下架。",
    });
    return;
  }

  antd.Modal.confirm({
    title: "確認兌換",
    content: `是否確定要兌換「${item.name}」？（需 ${item.price} 點）`,
    onOk: () => {
      // 檢查點數
      if (userPoints < item.price) {
        antd.notification.error({
          message: "兌換失敗",
          description: "點數不足，無法兌換。",
        });
        return;
      }
      if (item.stock <= 0) {
        antd.notification.error({
          message: "兌換失敗",
          description: "商品庫存不足，無法兌換。",
        });
        return;
      }

      userPoints -= item.price;
      item.stock -= 1;
      userPointsElement.textContent = userPoints;

      redeemHistory.push({
        itemName: item.name,
        cost: item.price,
        time: new Date().toLocaleString(),
      });

      antd.notification.success({
        message: "兌換成功",
        description: `您已成功兌換「${item.name}」，剩餘點數：${userPoints}`,
      });
    },
  });
}

// 查看兌換紀錄 (同樣改成 React element)
function showRedeemHistory() {
  if (redeemHistory.length === 0) {
    antd.Modal.info({
      title: "兌換紀錄",
      content: "目前尚無任何兌換紀錄。",
    });
    return;
  }

  const listHtml = redeemHistory
    .map(
      (r, index) =>
        `<li>(${index + 1}) 兌換 <strong>${r.itemName}</strong> - 花費: ${
          r.cost
        } 點 - 時間：${r.time}</li>`
    )
    .join("");

  const container = React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: `<ul style="list-style: none; padding-left: 0;">${listHtml}</ul>`,
    },
  });

  antd.Modal.info({
    title: "兌換紀錄",
    width: 600,
    okText: "關閉",
    content: container,
  });
}

// 商品管理 (同樣改成 React element)
function showManageItemModal() {
  let manageHtml = storeItems
    .map(
      (item) => `
          <div class="border rounded p-2 mb-2">
            <h4 class="font-bold">${item.name} (${item.type})</h4>
            <p>價格：${item.price} 點｜ 庫存：${item.stock}</p>
            <p>描述：${item.desc}</p>
            <button class="ant-btn ant-btn-default ant-btn-sm mr-2"
              onclick="editItem(${item.id})">
              編輯
            </button>
            <button class="ant-btn ant-btn-danger ant-btn-sm"
              onclick="removeItem(${item.id})">
              下架
            </button>
          </div>
        `
    )
    .join("");

  if (!manageHtml) {
    manageHtml = "<p>目前尚無商品。</p>";
  }

  manageHtml += `
      <div class="mt-4">
        <button class="ant-btn ant-btn-primary"
          onclick="addNewItem()">
          新增商品
        </button>
      </div>
    `;

  const container = React.createElement("div", {
    dangerouslySetInnerHTML: { __html: manageHtml },
  });

  antd.Modal.info({
    title: "管理商品（模擬）",
    width: 600,
    okText: "關閉",
    content: container,
  });
}

// 新增商品 (Modal 的 content 亦可保持字串即可)
function addNewItem() {
  antd.Modal.confirm({
    title: "新增商品",
    icon: null,
    width: 500,
    content: `
        <div class="space-y-2">
          <label>商品名稱：<input id="itemNameInput" class="ant-input" /></label><br/>
          <label>類型(虛擬/實體)：<input id="itemTypeInput" class="ant-input" /></label><br/>
          <label>價格(點數)：<input type="number" id="itemPriceInput" class="ant-input" /></label><br/>
          <label>庫存數量：<input type="number" id="itemStockInput" class="ant-input" /></label><br/>
          <label>描述：<textarea id="itemDescInput" class="ant-input"></textarea></label>
        </div>
      `,
    onOk: () => {
      const name = document.getElementById("itemNameInput").value.trim();
      const type = document.getElementById("itemTypeInput").value.trim();
      const price = parseInt(
        document.getElementById("itemPriceInput").value,
        10
      );
      const stock = parseInt(
        document.getElementById("itemStockInput").value,
        10
      );
      const desc = document.getElementById("itemDescInput").value.trim();

      if (!name || !type || !price || !stock) {
        antd.notification.error({
          message: "操作失敗",
          description: "請完整填寫商品資訊。",
        });
        return Promise.reject();
      }

      const newId = storeItems.length
        ? Math.max(...storeItems.map((i) => i.id)) + 1
        : 1;

      storeItems.push({ id: newId, name, type, price, stock, desc });

      antd.notification.success({
        message: "商品新增成功",
        description: `已新增「${name}」到商城。`,
      });
    },
  });
}

// 編輯商品 (同理)
function editItem(itemId) {
  const item = storeItems.find((i) => i.id === itemId);
  if (!item) return;

  antd.Modal.confirm({
    title: "編輯商品",
    icon: null,
    width: 500,
    content: `
        <div class="space-y-2">
          <label>商品名稱：
            <input id="editItemName" class="ant-input" value="${item.name}" />
          </label><br/>
          <label>類型(虛擬/實體)：
            <input id="editItemType" class="ant-input" value="${item.type}" />
          </label><br/>
          <label>價格(點數)：
            <input type="number" id="editItemPrice" class="ant-input" value="${item.price}" />
          </label><br/>
          <label>庫存數量：
            <input type="number" id="editItemStock" class="ant-input" value="${item.stock}" />
          </label><br/>
          <label>描述：
            <textarea id="editItemDesc" class="ant-input">${item.desc}</textarea>
          </label>
        </div>
      `,
    onOk: () => {
      const name = document.getElementById("editItemName").value.trim();
      const type = document.getElementById("editItemType").value.trim();
      const price = parseInt(
        document.getElementById("editItemPrice").value,
        10
      );
      const stock = parseInt(
        document.getElementById("editItemStock").value,
        10
      );
      const desc = document.getElementById("editItemDesc").value.trim();

      if (!name || !type || !price || !stock) {
        antd.notification.error({
          message: "操作失敗",
          description: "請完整填寫商品資訊。",
        });
        return Promise.reject();
      }

      item.name = name;
      item.type = type;
      item.price = price;
      item.stock = stock;
      item.desc = desc;

      antd.notification.success({
        message: "商品編輯成功",
        description: `已更新「${item.name}」的資訊。`,
      });
    },
  });
}

// 下架商品
function removeItem(itemId) {
  antd.Modal.confirm({
    title: "確認下架",
    content: "是否確定要下架該商品？",
    onOk: () => {
      storeItems = storeItems.filter((i) => i.id !== itemId);
      antd.notification.warning({
        message: "商品已下架",
        description: `商品 ID ${itemId} 已被移除。`,
      });
    },
  });
}
