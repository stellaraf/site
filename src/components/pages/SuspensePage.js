import React from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import theme from "styles/exports.module.scss";

const SuspensePage = styled.div`
    overflow: hidden;
    background-image: ${theme.stPageGradient};
    position: fixed;
    top: 0;
    left: 0;
    height: 105%;
    width: 105%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
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
