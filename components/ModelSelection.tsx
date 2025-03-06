import { DownOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { GOOGLE_LLM_LIST } from "@/constants";
import { useChatbotContext } from "@context/ChatbotContext";
import React from "react";

export default function ModelSelection() {
  const {
    state: { selectedConversation },
    handleUpdateConversation,
  } = useChatbotContext();

  const handleOptionClick = ({ key }: { key: string }) => {
    if (!selectedConversation) return;
    handleUpdateConversation(selectedConversation, {
      key: "settings",
      value: {
        ...selectedConversation.settings,
        model: key,
      },
    });
  };

  return (
    <Dropdown
      trigger={["click"]}
      disabled={(selectedConversation?.messages?.length ?? 0) > 0}
      menu={{
        items: GOOGLE_LLM_LIST.map((llm) => ({
          label: llm.modelName,
          key: llm.modelId,
        })),
        onClick: handleOptionClick,
        style: {
          maxHeight: "600px",
          overflowY: "auto",
        },
      }}
    >
      <Button shape="round" icon={<GoogleOutlined />}>
        {GOOGLE_LLM_LIST.find(
          (llm) => llm.modelId === selectedConversation?.settings.model
        )?.modelName || selectedConversation?.settings.model}
        <DownOutlined style={{ marginLeft: "5px" }} />
      </Button>
    </Dropdown>
  );
}
