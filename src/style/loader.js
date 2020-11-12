import React from "react";
import styled from "styled-components";
import color from "./color";

const LoaderContainer = styled.div`
    width: 100%;
    position: absolute;
    min-height: 100vh;
`;

const LoaderBar = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 10px solid ${color.white};
    border-top: 10px solid ${color.mainBlue};
    border-radius: 50em;
    animation-name: loading;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;

    @keyframes loading {
        from {
            transform: translate(-50%, -50%) rotate(0);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`;

export const Loader = () => {
    return (
        <LoaderContainer>
            <LoaderBar></LoaderBar>
        </LoaderContainer>
    );
};
