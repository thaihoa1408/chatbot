import React, { useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "./Sidebar";
import { MenuUnfoldOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout
      hasSider
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
        className="md:relative absolute"
        style={{
          zIndex: 1000,
          height: "100%",
          transform: `translateX(${collapsed ? "-100%" : "0"})`,
          transition: "transform 0.3s ease",
        }}
      />
      <Layout>
        <Header
          style={{
            background: "transparent",
            cursor: "pointer",
            padding: "8px 16px",
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {collapsed && <MenuUnfoldOutlined onClick={handleToggleSidebar} />}
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
