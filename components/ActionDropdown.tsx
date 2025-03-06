import { Dropdown, MenuProps } from "antd";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

interface ActionDropdownProps {
  items: MenuProps["items"];
}

function ActionDropdown({ items }: ActionDropdownProps) {
  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <EllipsisOutlined
        style={{
          fontSize: "20px",
          color: "white",
        }}
      />
    </Dropdown>
  );
}

export default ActionDropdown;
