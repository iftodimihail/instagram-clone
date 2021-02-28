import React from "react";
import styled from "styled-components";

const ActionMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 16px;

  > svg {
    width: 26px;
    height: 26px;
    fill: lightgray;
    padding: 8px;
  }
`;

function ActionMenu() {
  return <ActionMenuContainer></ActionMenuContainer>;
}

export default ActionMenu;
