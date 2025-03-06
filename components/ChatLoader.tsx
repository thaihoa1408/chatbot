import React, { FC } from "react";
import styles from "./ChatLoader.module.css";
import { Flex, theme } from "antd";
import { Avatar } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export const ChatLoader: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Flex
      align="flex-start"
      gap="8px"
      style={{ marginBottom: "16px", maxWidth: "calc(100% - 40px)" }}
    >
      <Avatar
        style={{
          flexShrink: 0,
          border: "none",
        }}
        size={32}
        icon={<GoogleOutlined style={{ fontSize: "16px" }} />}
      />

      <div
        style={{
          borderRadius: "24px",
          backgroundColor: colorBgContainer,
          padding: "8px 16px",
          lineHeight: "20px",
          width: "fit-content",
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            padding: "8px 16px",
          }}
        >
          <div className={styles.dotFlashing}></div>
        </Flex>
      </div>
    </Flex>
  );
};
