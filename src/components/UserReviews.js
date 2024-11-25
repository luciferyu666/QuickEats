// src/components/UserReviews.js

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Modal,
  Form,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const { Option } = Select;

const UserReviews = ({ reviews, setReviews }) => {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [searchText, setSearchText] = useState("");
  const [filterRating, setFilterRating] = useState(null);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyForm] = Form.useForm();
  const [statistics, setStatistics] = useState({
    averageRating: 0,
    ratingDistribution: [],
    keywordStats: {},
  });

  // 更新統計數據
  useEffect(() => {
    calculateStatistics(filteredReviews);
  }, [filteredReviews]);

  const calculateStatistics = (data) => {
    if (data.length === 0) {
      setStatistics({
        averageRating: 0,
        ratingDistribution: [],
        keywordStats: {},
      });
      return;
    }

    // 計算平均評分
    const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / data.length).toFixed(1);

    // 計算評分分佈
    const ratingCount = {};
    data.forEach((review) => {
      ratingCount[review.rating] = (ratingCount[review.rating] || 0) + 1;
    });
    const ratingDistribution = Object.keys(ratingCount).map((key) => ({
      rating: key,
      count: ratingCount[key],
    }));

    // 計算關鍵詞統計（簡單示例：計算出現頻率最高的單詞）
    const keywordCount = {};
    data.forEach((review) => {
      const words = review.feedback.split(/\s+/);
      words.forEach((word) => {
        const cleanedWord = word
          .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "")
          .toLowerCase();
        if (cleanedWord && cleanedWord.length > 1) {
          keywordCount[cleanedWord] = (keywordCount[cleanedWord] || 0) + 1;
        }
      });
    });
    // 取前5個關鍵詞
    const sortedKeywords = Object.keys(keywordCount)
      .sort((a, b) => keywordCount[b] - keywordCount[a])
      .slice(0, 5);
    const keywordStats = {};
    sortedKeywords.forEach((word) => {
      keywordStats[word] = keywordCount[word];
    });

    setStatistics({
      averageRating,
      ratingDistribution,
      keywordStats,
    });
  };

  const handleSearch = () => {
    let filtered = reviews;
    if (searchText) {
      filtered = filtered.filter((review) =>
        review.feedback.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (filterRating) {
      filtered = filtered.filter((review) => review.rating === filterRating);
    }
    setFilteredReviews(filtered);
  };

  const resetFilters = () => {
    setSearchText("");
    setFilterRating(null);
    setFilteredReviews(reviews);
  };

  const showReplyModal = (record) => {
    setSelectedReview(record);
    setIsReplyModalVisible(true);
    replyForm.setFieldsValue({
      reply: record.reply || "",
    });
  };

  const handleReplyOk = () => {
    replyForm
      .validateFields()
      .then((values) => {
        const updatedReviews = reviews.map((review) => {
          if (review.orderId === selectedReview.orderId) {
            return { ...review, reply: values.reply };
          }
          return review;
        });
        setReviews(updatedReviews);
        setFilteredReviews(updatedReviews);
        message.success("回覆已保存！");
        setIsReplyModalVisible(false);
        setSelectedReview(null);
        replyForm.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleReplyCancel = () => {
    setIsReplyModalVisible(false);
    setSelectedReview(null);
    replyForm.resetFields();
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <Card title="用戶評價與回饋" style={{ marginBottom: "20px" }}>
      {/* 篩選區域 */}
      <Space style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Input
          placeholder="搜索評價關鍵字"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
          style={{ width: 200 }}
        />
        <Select
          placeholder="選擇評分"
          value={filterRating}
          onChange={(value) => setFilterRating(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value={5}>5 星</Option>
          <Option value={4}>4 星</Option>
          <Option value={3}>3 星</Option>
          <Option value={2}>2 星</Option>
          <Option value={1}>1 星</Option>
        </Select>
        <Button type="primary" onClick={handleSearch}>
          篩選
        </Button>
        <Button onClick={resetFilters}>重置</Button>
      </Space>

      {/* 統計分析區域 */}
      <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
        <Card size="small" title={`平均評分: ${statistics.averageRating} 星`}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statistics.ratingDistribution}>
              <XAxis dataKey="rating" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="評分數量" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card size="small" title="關鍵詞統計">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={Object.keys(statistics.keywordStats).map((key) => ({
                  name: key,
                  value: statistics.keywordStats[key],
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {Object.keys(statistics.keywordStats).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Space>

      {/* 評價表格區域 */}
      <Table
        dataSource={filteredReviews}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
      >
        <Table.Column title="訂單編號" dataIndex="orderId" key="orderId" />
        <Table.Column title="用戶姓名" dataIndex="userName" key="userName" />
        <Table.Column
          title="評分"
          dataIndex="rating"
          key="rating"
          render={(rating) => <Tag color="gold">{rating} 星</Tag>}
          sorter={(a, b) => a.rating - b.rating}
        />
        <Table.Column title="回饋" dataIndex="feedback" key="feedback" />
        <Table.Column
          title="回覆"
          dataIndex="reply"
          key="reply"
          render={(reply) =>
            reply ? (
              <Tag color="green">已回覆</Tag>
            ) : (
              <Tag color="volcano">未回覆</Tag>
            )
          }
        />
        <Table.Column
          title="操作"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button type="link" onClick={() => showReplyModal(record)}>
                {record.reply ? "編輯回覆" : "回覆"}
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* 回覆模態框 */}
      <Modal
        title={`回覆評價 - 訂單編號: ${selectedReview ? selectedReview.orderId : ""}`}
        visible={isReplyModalVisible}
        onOk={handleReplyOk}
        onCancel={handleReplyCancel}
        okText="保存回覆"
      >
        <Form form={replyForm} layout="vertical" name="replyForm">
          <Form.Item
            name="reply"
            label="回覆內容"
            rules={[
              {
                required: true,
                message: "請輸入回覆內容！",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="輸入您的回覆..." />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserReviews;
