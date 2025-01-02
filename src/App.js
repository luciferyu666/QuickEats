// C:\Tasker\QuickEats\quickeats-frontend\src\App.js

import React from "react";
import "./App.css";

// 原本的組件（不再包 <Router>，僅作一般元件使用）
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapComponent from "./components/MapComponent";

const App = () => {
  console.log("=== App Component Mounting ===");
  console.log("Current URL:", window.location.href);
  console.log("Current PATHNAME:", window.location.pathname);

  return (
    <>
      {/* 頂部導航 (不共用路由) */}
      <Header />

      {/* 這裡只是示範前台首頁內容 */}
      <main>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          Google Maps 測試
        </h1>
        <MapComponent />
      </main>

      {/* 底部信息 */}
      <Footer />
    </>
  );
};

export default App;
