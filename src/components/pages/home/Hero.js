import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
// import { Display } from "components/styled/text";
import Logo from "components/svg/Logos";
import styled from "styled-components";
// import theme from "styles/exports.module.scss";
// import site from "config";
// import bp from "utils/breakpoints";

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

const LogoBlock = styled.div`
    position: absolute;
    display: flex;
    top: ${props => props.topPos}vh;
    transition: all 1s cubic-bezier(0, 1, 0.5, 1);
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    width: 100%;
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
    const [logoPos, setlogoPos] = React.useState(15);
    const hideLogoPos = -100;
    useScrollPosition(({ prevPos, currPos }) => {
        currPos.y <= hideLogoPos ? setlogoPos(0) : setlogoPos(15);
    });
    return (
        <HomeHeroSection>
            <Container>
                {/* <Row>
                    <HeroCol>
                        <LogoBlock topPos={logoPos}>
                            <Logo.Typographic
                                color={"white"}
                                width={400}
                                height={200}
                            />
                        </LogoBlock>
                    </HeroCol>
                </Row> */}
            </Container>
        </HomeHeroSection>
    );
}

export default Hero;
