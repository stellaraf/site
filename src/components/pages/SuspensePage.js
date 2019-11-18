import React from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import theme from "styles/exports.module.scss";

const SuspensePage = styled.div`
    position: fixed;
    height: 105vh;
    width: 105vw;
    overflow: hidden;
    background-image: ${theme.stPageGradient};
`;

const spinningAnimation = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

const LoaderWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: 1s ${spinningAnimation} infinite linear;
`;

export default function() {
    return (
        <SuspensePage>
            <LoaderWrapper>
                <AiOutlineLoading3Quarters size={64} color={theme.stWhite} />
            </LoaderWrapper>
        </SuspensePage>
    );
}
