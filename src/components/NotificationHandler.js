// src/components/NotificationHandler.js

import { useEffect } from "react";
import { notification } from "antd";

const NotificationHandler = () => {
  useEffect(() => {
    // 模擬接收新訂單通知，每30秒
    const interval = setInterval(() => {
      notification.info({
        message: "新訂單到來",
        description: `訂單編號：ORD${Math.floor(Math.random() * 100000)}`,
        placement: "topRight",
      });
    }, 30000); // 30秒

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default NotificationHandler;
