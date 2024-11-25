// src/components/RevenueReports.js

import React, { useState, useEffect } from "react";
import { Card, Select, Button, message } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DownloadOutlined, FilePdfOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { dailyRevenue, weeklyRevenue, monthlyRevenue } from "../data/mockData"; // 引入收入模擬數據

const { Option } = Select;

const RevenueReports = () => {
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [filteredData, setFilteredData] = useState([]);

  // 根據選擇的時間範圍設置數據
  useEffect(() => {
    switch (timeFrame) {
      case "Daily":
        setFilteredData(dailyRevenue);
        break;
      case "Weekly":
        setFilteredData(weeklyRevenue);
        break;
      case "Monthly":
        setFilteredData(monthlyRevenue);
        break;
      default:
        setFilteredData([]);
    }
  }, [timeFrame]);

  // 導出報表為 Excel
  const handleDownloadExcel = () => {
    if (filteredData.length === 0) {
      message.error("請先生成報表！");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue");
    XLSX.writeFile(workbook, `Revenue_${timeFrame}.xlsx`);
    message.success("報表已下載為 Excel！");
  };

  // 導出報表為 PDF
  const handleDownloadPDF = () => {
    if (filteredData.length === 0) {
      message.error("請先生成報表！");
      return;
    }
    const input = document.getElementById("revenue-chart");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Revenue_${timeFrame}.pdf`);
      message.success("報表已下載為 PDF！");
    });
  };

  return (
    <Card title="收入報表" style={{ marginBottom: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Select
          value={timeFrame}
          onChange={setTimeFrame}
          style={{ width: 150, marginRight: "20px", marginBottom: "10px" }}
        >
          <Option value="Daily">每日</Option>
          <Option value="Weekly">每週</Option>
          <Option value="Monthly">每月</Option>
        </Select>
        <Button
          type="primary"
          onClick={() => message.success("報表生成成功！")}
          style={{ marginRight: "20px", marginBottom: "10px" }}
        >
          生成報表
        </Button>
        <Button
          icon={<DownloadOutlined />}
          onClick={handleDownloadExcel}
          disabled={filteredData.length === 0}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        >
          下載 Excel
        </Button>
        <Button
          icon={<FilePdfOutlined />}
          onClick={handleDownloadPDF}
          disabled={filteredData.length === 0}
          style={{ marginBottom: "10px" }}
        >
          下載 PDF
        </Button>
      </div>
      <div id="revenue-chart">
        <ResponsiveContainer width="100%" height={400}>
          {timeFrame === "Weekly" ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="收入 (NT$)"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          ) : timeFrame === "Monthly" ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="收入 (NT$)"
                stroke="#ffc658"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          ) : (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="收入 (NT$)"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueReports;
