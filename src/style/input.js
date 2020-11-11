import React from "react";
import styled from "styled-components";

const InputBlock = styled.input`
    all: unset;
    background: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    border-bottom: 1px solid #778795;
`;

export const Input = ({ children, ...rest }) => {
    return <InputBlock {...rest}>{children}</InputBlock>;
};
