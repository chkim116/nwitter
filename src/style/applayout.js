import React from "react";
import styled from "styled-components";

const AppBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const AppContentBlock = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
export const AppLayout = ({ children }) => {
  return <AppBlock>{children}</AppBlock>;
};

export const AppContent = ({ children }) => {
  return <AppContentBlock>{children}</AppContentBlock>;
};
