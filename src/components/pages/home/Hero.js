import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Display } from "components/styled/text";
import Logo from "components/svg/Logos";
import styled from "styled-components";
import theme from "styles/exports.module.scss";
import site, { homeConfig } from "config";
import bp from "utils/breakpoints";

const config = site.pages.home;

const Title = styled(Display.Title)`
    width: 100%;
    ${bp.down("md")} {
        font-size: ${theme.h1FontSize};
    }
`;
const Subtitle = styled(Display.Subtitle)`
    margin-left: 1vw;
    color: ${theme.stSecondary};
`;

const BigLogo = styled(Logo.Typographic)`
    margin-left: auto;
`;

function HeroHeading({ headings }) {
    return (
        <>
            <Title size={2}>{config.headings.title}</Title>
            {config.headings.subtitle ? (
                <Subtitle>{config.headings.subtitle}</Subtitle>
            ) : null}
        </>
    );
}
const HomeHeroSection = styled.section`
    display: flex;
    margin-top: 3rem;
    margin-bottom: 3rem;
    flex-direction: column;
    min-height: 30vh;
`;

function Hero() {
    return (
        <HomeHeroSection>
            <Container>
                <Row className={"heroRow"}>
                    <Col>
                        <HeroHeading {...homeConfig.homeOne} />
                    </Col>
                    <Col>
                        <BigLogo color={"white"} size={600} />
                    </Col>
                </Row>
            </Container>
        </HomeHeroSection>
    );
}

export default Hero;
