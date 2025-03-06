import React, { useState, useEffect } from "react";
import { Button, Flex, Layout } from "antd";
import Sidebar from "./Sidebar";
import { EditOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./Layout.module.css";
import { useChatbotContext } from "@/context/ChatbotContext";
const { Content, Header } = Layout;

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleNewConversation } = useChatbotContext();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(window.innerWidth < 768);

    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        className={styles.sidebar}
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
          {collapsed && (
            <Flex align="center" justify="center" gap={8}>
              <MenuUnfoldOutlined onClick={handleToggleSidebar} />
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined style={{ fontSize: "16px" }} />}
                onClick={() => handleNewConversation()}
              />
            </Flex>
          )}
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
