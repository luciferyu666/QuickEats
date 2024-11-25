// src/App.js

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css"; // 引入全局樣式（如有需要）

const App = () => {
  return (
    <>
      <Header />
      {/* 這裡的 AppRoutes 已經在 index.js 中被渲染，因此不需要在這裡再次引入 */}
      {/* <AppRoutes /> */}
      <Footer />
    </>
  );
};

export default App;
