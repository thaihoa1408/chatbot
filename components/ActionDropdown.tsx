import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

interface ActionDropdownProps {
  items: MenuProps["items"];
}

function ActionDropdown({ items }: ActionDropdownProps) {
  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <Button
        type="text"
        size="small"
        style={{
          padding: "0 2px",
        }}
      >
        <EllipsisOutlined
          style={{
            fontSize: "22px",
            color: "white",
          }}
        />
      </Button>
    </Dropdown>
  );
}

export default ActionDropdown;
