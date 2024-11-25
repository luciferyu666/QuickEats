// src/components/admin/SystemMonitoring.js

import React from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Progress,
  Alert,
  List,
  Statistic,
} from "antd";
import { systemMonitoring } from "../../data/mockData"; // 使用命名導入
import "./SystemMonitoring.css";

const { Title, Paragraph } = Typography;

const SystemMonitoring = () => {
  const { serviceStatus, trafficStats, errorLogs } = systemMonitoring;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="服務狀態監控">
            <List
              dataSource={serviceStatus}
              renderItem={(service) => (
                <List.Item key={service.name}>
                  <List.Item.Meta
                    title={service.name}
                    description={
                      <span
                        style={{
                          color: service.status === "正常" ? "green" : "red",
                        }}
                      >
                        {service.status}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="流量與性能統計">
            <Paragraph>
              <strong>每日請求數量：</strong> {trafficStats.dailyRequests}
            </Paragraph>
            <Paragraph>
              <strong>平均響應時間：</strong> {trafficStats.averageResponseTime}{" "}
              ms
            </Paragraph>
            <Paragraph>
              <strong>高峰時段流量：</strong>
            </Paragraph>
            <Progress
              type="line"
              percent={trafficStats.peakTrafficPercentage}
              strokeColor="#1890ff"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24}>
          <Card title="系統錯誤日志">
            {errorLogs.length > 0 ? (
              errorLogs.map((log, index) => (
                <Alert
                  key={index}
                  message={`錯誤 ${index + 1}`}
                  description={log}
                  type="error"
                  showIcon
                  style={{ marginBottom: "16px" }}
                />
              ))
            ) : (
              <Paragraph>目前沒有系統錯誤。</Paragraph>
            )}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} lg={12}>
          <Card title="流量統計">
            <Statistic
              title="每日請求數量"
              value={trafficStats.dailyRequests}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
            />
            <Statistic
              title="平均響應時間"
              value={trafficStats.averageResponseTime}
              precision={2}
              suffix="ms"
              valueStyle={{ color: "#cf1322" }}
              style={{ marginTop: "16px" }}
            />
            <Statistic
              title="流量峰值百分比"
              value={trafficStats.peakTrafficPercentage}
              precision={0}
              suffix="%"
              valueStyle={{ color: "#1890ff" }}
              style={{ marginTop: "16px" }}
            />
            <Progress
              type="line"
              percent={trafficStats.peakTrafficPercentage}
              strokeColor="#1890ff"
              style={{ marginTop: "16px" }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="服務狀態">
            <List
              dataSource={serviceStatus}
              renderItem={(service) => (
                <List.Item key={service.name}>
                  <List.Item.Meta
                    title={service.name}
                    description={
                      <span
                        style={{
                          color: service.status === "正常" ? "green" : "red",
                        }}
                      >
                        {service.status}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24}>
          <Card title="系統錯誤日志">
            <List
              dataSource={errorLogs}
              renderItem={(log, index) => (
                <List.Item key={index}>
                  <Alert
                    message={`錯誤 ${index + 1}`}
                    description={log}
                    type="error"
                    showIcon
                  />
                </List.Item>
              )}
            />
            {errorLogs.length === 0 && (
              <Paragraph>目前沒有系統錯誤。</Paragraph>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SystemMonitoring;
