import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";
import { AngleSection } from "components/styled/sections";
import { useWindowScroll } from "react-use";
import site from "config";
import Logo from "components/svg/Logos";
// import { Display } from "components/styled/text";
import styled, { keyframes } from "styled-components";
import { pulse } from "react-animations";
// import { slideInDown, slideOutUp } from "react-animations";
import theme from "styles/exports.module.scss";
// import site from "config";

const easing = t => 1 + --t * t * t * t * t;

// const config = site.pages.home;

// const Title = styled(Display.Title)`
//     width: 100%;
//     ${bp.down("md")} {
//         font-size: ${theme.h1FontSize};
//     }
// `;
// const Subtitle = styled(Display.Subtitle)`
//     margin-left: 1vw;
//     color: ${theme.stSecondary};
// `;

// const BigLogo = styled.div`
//     display: flex;
//     top: ${props => props.topPos}vh;
//     transition: all 1s cubic-bezier(0, 1, 0.5, 1);
//     transform: scale(0.95) translate3d(0px, 0px, 0px);
//     transform-origin: center top;
// `;

// const LogoBlock = styled.div`
//     position: absolute;
//     display: flex;
//     top: ${props => props.topPos}vh;
//     transition: all 1s cubic-bezier(0, 1, 0.5, 1);
//     align-items: center;
//     justify-content: center;
//     pointer-events: auto;
//     width: 100%;
// `;

const LogoBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    width: 100%;
    height: 86px;
    margin-top: 5vh;
    background-color: transparent !important;
    z-index: 1001;

    /* &.logo.hidden {
        pointer-events: none;
        visibility: hidden;
        display: none;
    } */
`;

const HeroCol = styled(Col)`
    display: flex;
    justify-content: center;
`;

// function HeroHeading({ headings }) {
//     return (
//         <>
//             <Title size={2}>{config.headings.title}</Title>
//             {config.headings.subtitle ? (
//                 <Subtitle>{config.headings.subtitle}</Subtitle>
//             ) : null}
//         </>
//     );
// }

// const slideDownAnimation = keyframes`${slideInDown}`;
const pulseAnimation = keyframes`${pulse}`;

const ScrollIndicator = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    justify-content: center;
    align-content: flex-end;
`;

const BouncingArrow = styled(FiChevronDown)`
    animation: 1s ${pulseAnimation} infinite;
`;

const HomeHeroSection = styled(AngleSection)`
    display: flex;
    padding-top: 3rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
    flex-direction: column;
    min-height: 30vh;
    position: relative;

    & .row {
        justify-content: center;
    }

    & .hero-text-container {
        margin-top: 5vh;
    }

    & .hero-text {
        text-align: center;
        line-height: 1.2;
        font-size: ${theme.fontSizeLg};
    }

    & .scroll-indicator {
        position: absolute;
        left: 50%;
        bottom: 0;
        z-index: 100;
    }

    & button.scroll-button {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        user-select: none;
        background-color: transparent;
        border: none;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
    }
`;

function Hero(props) {
    const logoBreak = site.global.logoTransitionScroll;
    // State
    const [readyToScroll, setReadyToScroll] = useState(false);
    const { y } = useWindowScroll();

    // Hooks
    useEffect(() => {
        y >= logoBreak && setReadyToScroll(true);
        y > 0 && y < logoBreak && setReadyToScroll(false);
    }, [logoBreak, y]);
    return (
        <HomeHeroSection
            height="90vh"
            backgroundColor={theme.stPrimary}
            directionTop="flat"
            marginTop="0">
            <Container>
                <Row>
                    <HeroCol sm={12}>
                        <LogoBlock
                            className={readyToScroll ? "logo hidden" : "logo"}
                            style={{
                                opacity: `${Math.max(easing(1 - y / logoBreak), 0)}`,
                                transform: `scale(${Math.max(easing(1 - y / logoBreak), 0) * 0.325 +
                                    0.625}) translate3d(0, 0, 0)`,
                                transformOrigin: "top",
                                top: Math.max(logoBreak - y, 2)
                            }}>
                            <Logo.Typographic color={"white"} width={400} height={200} />
                        </LogoBlock>
                    </HeroCol>
                </Row>
                <Row>
                    <Col className={"hero-text-container"} sm={12} lg={8}>
                        <p className={"hero-text"}>{site.pages.home.headings.text}</p>
                    </Col>
                </Row>
            </Container>
            <ScrollIndicator className={"scroll-indicator"}>
                <button className="scroll-button" onClick={props.scrollToSections}>
                    <BouncingArrow size="3rem" color={theme.navLinkColor} />
                </button>
            </ScrollIndicator>
        </HomeHeroSection>
    );
}

export default Hero;
