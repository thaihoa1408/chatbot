import React, { useState } from "react";
import { Flex, Layout } from "antd";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";
import { useChatbotContext } from "@/context/ChatbotContext";
import { LuPanelLeftOpen } from "react-icons/lu";
import { FaRegPenToSquare } from "react-icons/fa6";
const { Content, Header } = Layout;

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleNewConversation } = useChatbotContext();
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout
      hasSider
      style={{
        height: "100dvh",
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
          className={styles.header}
        >
          {collapsed && (
            <Flex align="center" gap={16} className={styles.iconContainer}>
              <LuPanelLeftOpen
                onClick={handleToggleSidebar}
                style={{ cursor: "pointer", color: "white", fontSize: "22px" }}
              />
              <FaRegPenToSquare
                style={{ fontSize: "20px", cursor: "pointer", color: "white" }}
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
