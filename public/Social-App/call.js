// call.js

// ============================================
// 通話功能（模擬）
// ============================================
let inCall = false;
let isMuted = false;
let isVideoEnabled = true;

const startCallButton = document.getElementById("startCall");
const endCallButton = document.getElementById("endCall");
const muteToggleButton = document.getElementById("muteToggle");
const videoToggleButton = document.getElementById("videoToggle");

// 開始通話
startCallButton.addEventListener("click", () => {
  if (inCall) {
    antd.notification.warning({
      message: "提示",
      description: "目前已在通話中。",
    });
    return;
  }
  antd.notification.info({
    message: "通話提示",
    description: "正在嘗試連線中...（模擬）",
  });
  setTimeout(() => {
    inCall = true;
    isMuted = false;
    isVideoEnabled = true;
    updateCallUI();
    antd.notification.success({
      message: "通話建立",
      description: "通話已連線成功，現在可以交流。（模擬）",
    });
  }, 1000);
});

// 結束通話
endCallButton.addEventListener("click", () => {
  if (!inCall) {
    antd.notification.info({
      message: "提示",
      description: "尚未開始通話。",
    });
    return;
  }
  inCall = false;
  isMuted = false;
  isVideoEnabled = true;
  updateCallUI();
  antd.notification.warning({
    message: "通話提示",
    description: "已結束通話（模擬）。",
  });
});

// 靜音 / 取消靜音
muteToggleButton.addEventListener("click", () => {
  if (!inCall) {
    antd.notification.info({
      message: "提示",
      description: "尚未開始通話，無法靜音。",
    });
    return;
  }
  isMuted = !isMuted;
  antd.notification.info({
    message: isMuted ? "已靜音" : "已取消靜音",
    description: isMuted
      ? "對方將聽不到您的聲音。（模擬）"
      : "對方已能聽到您的聲音。（模擬）",
  });
  updateCallUI();
});

// 關閉 / 開啟視訊
videoToggleButton.addEventListener("click", () => {
  if (!inCall) {
    antd.notification.info({
      message: "提示",
      description: "尚未開始通話，無法關閉或打開視訊。",
    });
    return;
  }
  isVideoEnabled = !isVideoEnabled;
  antd.notification.info({
    message: isVideoEnabled ? "已開啟視訊" : "已關閉視訊",
    description: isVideoEnabled
      ? "對方可以看到您。（模擬）"
      : "對方看不到您的畫面。（模擬）",
  });
  updateCallUI();
});

// 更新 UI
function updateCallUI() {
  startCallButton.disabled = inCall;
  endCallButton.disabled = !inCall;
  muteToggleButton.disabled = !inCall;
  videoToggleButton.disabled = !inCall;

  muteToggleButton.innerText = isMuted ? "取消靜音" : "靜音";
  videoToggleButton.innerText = isVideoEnabled ? "關閉視訊" : "開啟視訊";
}

// 預設初始 UI
updateCallUI();
