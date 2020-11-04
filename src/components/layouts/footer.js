import React from "react";

import styled from "styled-components";

const FooterBlock = styled.footer`
  position: fixed;
  top: 50px;
  right: 10%;
`;

export const Footer = () => {
  return (
    <FooterBlock>
      <div> &copy; {new Date().getFullYear()}</div>
    </FooterBlock>
  );
};
