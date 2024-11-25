// src/components/OperatingHours.js

import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  TimePicker,
  Button,
  Modal,
  message,
  Table,
  Select,
  DatePicker,
  List,
  Typography,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const { Title, Paragraph } = Typography;

const OperatingHours = ({
  regularHours,
  setRegularHours,
  specialDates,
  setSpecialDates,
}) => {
  const [isSpecialModalVisible, setIsSpecialModalVisible] = useState(false);
  const [specialForm] = Form.useForm();

  // 列表顯示特殊日期
  const specialColumns = [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "營業狀態",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "營業中" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "開店時間",
      dataIndex: "open",
      key: "open",
      render: (time) => (time ? time.format("HH:mm") : "-"),
    },
    {
      title: "關店時間",
      dataIndex: "close",
      key: "close",
      render: (time) => (time ? time.format("HH:mm") : "-"),
    },
    {
      title: "操作",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleDeleteSpecialDate(record.date)}
        >
          刪除
        </Button>
      ),
    },
  ];

  // 添加特殊日期
  const handleAddSpecialDate = () => {
    specialForm.resetFields();
    setIsSpecialModalVisible(true);
  };

  const handleSpecialModalOk = () => {
    specialForm
      .validateFields()
      .then((values) => {
        const { date, status, open, close } = values;

        // 檢查特殊日期是否已存在
        if (
          specialDates.some((item) => item.date === date.format("YYYY-MM-DD"))
        ) {
          message.error("該日期已存在特殊設定！");
          return;
        }

        // 如果狀態為「休息中」，忽略開店和關店時間
        const newSpecialDate = {
          key: date.format("YYYY-MM-DD"),
          date: date.format("YYYY-MM-DD"),
          status,
          open: status === "營業中" ? open : null,
          close: status === "營業中" ? close : null,
        };

        setSpecialDates((prev) => [...prev, newSpecialDate]);
        message.success("特殊日期設定已新增！");
        setIsSpecialModalVisible(false);
        specialForm.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleSpecialModalCancel = () => {
    setIsSpecialModalVisible(false);
    specialForm.resetFields();
  };

  // 刪除特殊日期
  const handleDeleteSpecialDate = (date) => {
    setSpecialDates((prev) => prev.filter((item) => item.date !== date));
    message.success("特殊日期設定已刪除！");
  };

  // 更新常規營業時間
  const handleRegularHoursChange = (day, field, value) => {
    setRegularHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  // 定義一週七天
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Card title="營業時間設置" style={{ marginBottom: "20px" }}>
      <Title level={4}>每日營業時間</Title>
      <Table
        dataSource={daysOfWeek.map((day) => ({
          key: day,
          day,
          open: regularHours[day].open,
          close: regularHours[day].close,
          closed: regularHours[day].closed,
        }))}
        columns={[
          {
            title: "星期",
            dataIndex: "day",
            key: "day",
          },
          {
            title: "營業狀態",
            dataIndex: "closed",
            key: "closed",
            render: (closed, record) => (
              <Select
                value={closed ? "休息中" : "營業中"}
                onChange={(value) =>
                  handleRegularHoursChange(
                    record.day,
                    "closed",
                    value === "休息中" ? true : false
                  )
                }
                style={{ width: 120 }}
              >
                <Option value="營業中">營業中</Option>
                <Option value="休息中">休息中</Option>
              </Select>
            ),
          },
          {
            title: "開店時間",
            dataIndex: "open",
            key: "open",
            render: (time, record) =>
              !record.closed ? (
                <TimePicker
                  value={time}
                  format="HH:mm"
                  onChange={(value) =>
                    handleRegularHoursChange(record.day, "open", value)
                  }
                />
              ) : (
                "-"
              ),
          },
          {
            title: "關店時間",
            dataIndex: "close",
            key: "close",
            render: (time, record) =>
              !record.closed ? (
                <TimePicker
                  value={time}
                  format="HH:mm"
                  onChange={(value) =>
                    handleRegularHoursChange(record.day, "close", value)
                  }
                />
              ) : (
                "-"
              ),
          },
        ]}
        pagination={false}
        bordered
      />

      <Paragraph style={{ marginTop: "20px" }}>
        * 若選擇「休息中」，開店和關店時間將不予顯示。
      </Paragraph>

      <Button
        type="dashed"
        onClick={handleAddSpecialDate}
        style={{ marginTop: "20px" }}
      >
        新增特殊日期設定
      </Button>

      <Title level={4} style={{ marginTop: "20px" }}>
        特殊日期設定
      </Title>
      {specialDates.length > 0 ? (
        <Table
          dataSource={specialDates}
          columns={specialColumns}
          pagination={{ pageSize: 5 }}
          bordered
        />
      ) : (
        <Paragraph>暫無特殊日期設定。</Paragraph>
      )}

      <Modal
        title="新增特殊日期設定"
        visible={isSpecialModalVisible}
        onOk={handleSpecialModalOk}
        onCancel={handleSpecialModalCancel}
        okText="新增"
      >
        <Form form={specialForm} layout="vertical">
          <Form.Item
            label="日期"
            name="date"
            rules={[{ required: true, message: "請選擇日期！" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="營業狀態"
            name="status"
            rules={[{ required: true, message: "請選擇營業狀態！" }]}
          >
            <Select>
              <Option value="營業中">營業中</Option>
              <Option value="休息中">休息中</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="開店時間"
            name="open"
            rules={[
              { required: true, message: "請選擇開店時間！" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("status") === "營業中") {
                    if (value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("請選擇開店時間！"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label="關店時間"
            name="close"
            rules={[
              { required: true, message: "請選擇關店時間！" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("status") === "營業中") {
                    if (value) {
                      const openTime = specialForm.getFieldValue("open");
                      if (openTime && value.isAfter(openTime)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("關店時間必須晚於開店時間！")
                      );
                    }
                    return Promise.reject(new Error("請選擇關店時間！"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default OperatingHours;
