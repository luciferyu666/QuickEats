// src/components/SearchBar.js

import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <Input
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      prefix={<SearchOutlined />}
      allowClear
      size="large"
    />
  );
};

export default SearchBar;
