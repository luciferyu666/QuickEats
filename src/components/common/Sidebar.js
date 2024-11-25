// src/components/common/Sidebar.js

import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  HistoryOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/delivery">儀表板</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<HistoryOutlined />}>
          <Link to="/delivery/history">歷史訂單</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DollarOutlined />}>
          <Link to="/delivery/earnings">收入統計</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/delivery/account">帳戶</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
