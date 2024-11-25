// src/components/SupportChat.js

import React, { useState } from "react";
import { Drawer, Button, Input, List, Avatar, Typography } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Paragraph } = Typography;

const SupportChat = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "客服",
      text: "您好！有什麼可以幫助您的？",
    },
  ]);
  const [input, setInput] = useState("");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "您",
      text: input.trim(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // 模擬客服回覆
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        sender: "客服",
        text: "感謝您的訊息，我們將盡快處理您的問題。",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<CustomerServiceOutlined />}
        size="large"
        style={{ position: "fixed", bottom: 50, right: 50 }}
        onClick={showDrawer}
      />
      <Drawer
        title="支援與客服"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={350}
      >
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor:
                        item.sender === "客服" ? "#1890ff" : "#87d068",
                    }}
                  >
                    {item.sender === "客服" ? "K" : "U"}
                  </Avatar>
                }
                title={item.sender}
                description={<Paragraph>{item.text}</Paragraph>}
              />
            </List.Item>
          )}
        />
        <TextArea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="輸入您的訊息..."
        />
        <Button
          type="primary"
          onClick={handleSend}
          style={{ marginTop: "10px", width: "100%" }}
        >
          發送
        </Button>
      </Drawer>
    </>
  );
};

export default SupportChat;
