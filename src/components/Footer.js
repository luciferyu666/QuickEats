// src/components/Footer.js

import React from "react";
import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      <Text>© 2024 快餐達人（QuickEats）。保留所有權利。</Text>
    </AntFooter>
  );
};

export default Footer;
