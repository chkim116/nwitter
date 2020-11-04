import React from "react";
import styled from "styled-components";

const ButtonBlock = styled.button`
  all: unset;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  cursor: pointer;
  padding: 0.5em 1em;
  text-align: center;
  font-weight: 700;
  border-radius: 33px;
`;

export const Button = ({ children, ...rest }) => {
  return <ButtonBlock {...rest}>{children}</ButtonBlock>;
};
