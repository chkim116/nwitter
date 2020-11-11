import React from "react";
import styled from "styled-components";

const AppBlock = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 5em;
`;

const AppContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    width: 100%;
    align-items: center;
`;
export const AppLayout = ({ children }) => {
    return <AppBlock>{children}</AppBlock>;
};

export const AppContent = ({ children }) => {
    return <AppContentBlock>{children}</AppContentBlock>;
};
