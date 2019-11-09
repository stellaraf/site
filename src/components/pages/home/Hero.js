import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useWindowScroll } from "react-use";
import site from "config";
import Logo from "components/svg/Logos";
// import { Display } from "components/styled/text";
import styled from "styled-components";
// import theme from "styles/exports.module.scss";
// import site from "config";
// import bp from "utils/breakpoints";

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

const BigLogo = styled.div`
    display: flex;
    top: ${props => props.topPos}vh;
    transition: all 1s cubic-bezier(0, 1, 0.5, 1);
    transform: scale(0.95) translate3d(0px, 0px, 0px);
    transform-origin: center top;
`;

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
    background-color: transparent !important;

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
const HomeHeroSection = styled.section`
    display: flex;
    margin-top: 3rem;
    margin-bottom: 3rem;
    flex-direction: column;
    min-height: 30vh;
`;

function Hero() {
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
        <HomeHeroSection>
            <Container>
                <Row>
                    <HeroCol>
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
            </Container>
        </HomeHeroSection>
    );
}

export default Hero;
