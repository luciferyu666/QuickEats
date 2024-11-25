// src/components/Promotions.js

import React, { useState } from "react";
import { List, Card, Button, message } from "antd";

const { Meta } = Card;

const Promotions = ({ promotions: initialPromotions }) => {
  // 使用 useState 管理促銷活動狀態
  const [promotions, setPromotions] = useState(initialPromotions);

  // 處理「使用優惠」按鈕點擊事件
  const handleUsePromotion = (promotionId) => {
    // 查找並更新促銷活動的狀態
    const updatedPromotions = promotions.map((promo) => {
      if (promo.id === promotionId) {
        if (promo.isUsed) {
          message.warning(`優惠「${promo.title}」已經被使用過了。`);
          return promo;
        }
        return { ...promo, isUsed: true };
      }
      return promo;
    });

    setPromotions(updatedPromotions);

    // 顯示成功消息
    const usedPromotion = promotions.find((promo) => promo.id === promotionId);
    message.success(`已成功使用優惠：「${usedPromotion.title}」！`);
  };

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={promotions}
      locale={{ emptyText: "目前沒有特別優惠。" }}
      renderItem={(promotion) => (
        <List.Item key={promotion.id}>
          <Card
            hoverable
            cover={
              <img
                alt={promotion.title}
                src={promotion.image}
                style={{ height: "200px", objectFit: "cover" }}
              />
            }
            actions={[
              <Button
                type="primary"
                onClick={() => handleUsePromotion(promotion.id)}
                disabled={promotion.isUsed} // 禁用已使用的優惠按鈕
                key="use-promotion"
              >
                {promotion.isUsed ? "已使用" : "使用優惠"}
              </Button>,
            ]}
          >
            <Meta title={promotion.title} description={promotion.description} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Promotions;
