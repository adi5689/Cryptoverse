import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Cryptos,
  CryptoDetails,
  News,
  HomePage,
  Reference
} from "./components";
import "./App.css";


const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cryptos" element={<Cryptos />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
              <Route path="/reference" element={<Reference />} />
            </Routes>
          </div>
        </Layout>

        <div
          className="footer"
          level={5}
          style={{ color: "white", textAlign: "center" }}
        >
          <Typography.Title className="footer-text">
            Cryptoverse <br />
            <span className="footer-text-span">All rights reserved</span>
          </Typography.Title>
          <Space>
            <Link to="/" className="footer-text-link">
              Home
            </Link>
            <Link to="/news" className="footer-text-link">
              News
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
