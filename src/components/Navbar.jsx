import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  // QuestionCircleOutlined,
} from "@ant-design/icons";
import icon from "../images/eye2.png";
import "./styles.css";
import "../App.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size={50} />
        <Typography.Title level={2} className="logo">
          <Link className="logo-text" to="/">
            Cryptoverse
          </Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
            <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          className="menu"
          items={[
            {
              key: "1",
              icon: <HomeOutlined className="menu-icon" />,
              label: (
                <Link to="/" className="item-text">
                  Home
                </Link>
              ),
            },
            {
              key: "2",
              icon: <FundOutlined className="menu-icon" />,
              label: (
                <Link to="/cryptos" className="item-text">
                  Crypto&apos;s
                </Link>
              ),
            },
            {
              key: "4",
              icon: <BulbOutlined className="menu-icon" />,
              label: (
                <Link to="/news" className="item-text">
                  News
                </Link>
              ),
            },
            // {
            //   key: "5",
            //   icon: <QuestionCircleOutlined className="menu-icon" />,
            //   label: (
            //     <Link to="/reference" className="item-text">
            //       Reference
            //     </Link>
            //   ),
            // },
          ]}
        />
      )}
    </div>
  );
};

export default Navbar;
