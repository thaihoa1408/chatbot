import React from "react";
import { MenuFoldOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Typography, theme } from "antd";
import type { Conversation } from "@/types";
import { groupConversations } from "@/utils";
import ConversationItem from "./ConversationItem";
import { useChatbotContext } from "@/context/ChatbotContext";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100%",
  width: "236px",
  transition: "all 0.3s ease",
};

export default function Sidebar({
  collapsed,
  onToggle,
  className,
  style,
}: SidebarProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    state: { conversations },
    handleNewConversation,
  } = useChatbotContext();

  const groupedConversations: {
    date: string;
    conversations: Conversation[];
  }[] = groupConversations(conversations);

  return (
    <Layout.Sider
      style={{
        ...siderStyle,
        background: colorBgContainer,
        padding: collapsed ? 0 : "8px 16px",
        width: collapsed ? 0 : "236px",
        ...style,
      }}
      className={className}
      width={236}
      collapsed={collapsed}
      collapsedWidth={0}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={4}>
          <svg
            style={{
              width: "20px",
              height: "auto",
            }}
            viewBox="0 0 90 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="6" y="10" width="35" height="52" fill="#000000"></rect>
            <path
              d="M0 0V70.338H89.521V0H0ZM19.184 53.481L12.79 47.085L19.184 40.691L25.578 34.2971C25.578 34.2971 21.681 30.4 19.184 27.903C16.687 25.406 12.79 21.509 12.79 21.509L15.987 18.3115L19.184 15.114L28.7755 24.7055L38.367 34.2971L28.7755 43.889L19.184 53.481Z"
              fill="aliceblue"
            ></path>
            <rect
              className="blinkit"
              x="45"
              y="44"
              width="29"
              height="8"
              fill="#000000"
            ></rect>
          </svg>
          <Typography.Text style={{ fontWeight: "bold", fontSize: "1.125rem" }}>
            K.O Dev
          </Typography.Text>
        </Flex>
        <Flex align="center" gap={8}>
          <MenuFoldOutlined
            onClick={onToggle}
            style={{ cursor: "pointer", color: "white" }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined style={{ fontSize: "16px" }} />}
            onClick={() => handleNewConversation()}
          />
        </Flex>
      </Flex>
      <div
        style={{
          padding: "0.5rem 0",
          height: "calc(100%-100px)",
          overflow: "auto",
        }}
      >
        <Flex vertical gap="0.25rem">
          {groupedConversations.map((item, index) => {
            return (
              <Flex vertical key={index}>
                <Typography.Text
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 800,
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  {item.date}
                </Typography.Text>
                <Flex vertical>
                  {item.conversations.map((conversation, index) => (
                    <ConversationItem
                      key={conversation.uuid}
                      conversation={conversation}
                    />
                  ))}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </div>
    </Layout.Sider>
  );
}
