import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapComponent from "./components/MapComponent"; // 引入 MapComponent
import "./App.css"; // 引入全局樣式

const App = () => {
  return (
    <>
      {/* 頂部導航 */}
      <Header />

      {/* 地圖組件 */}
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
