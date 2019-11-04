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
    // const heroCardReveal = {
    //     right: true,
    //     cascade: true,
    //     duration: 128
    // };
    // const HeroCardWrapper = styled.div`
    //     flex: 0 0 auto;
    //     max-width: 100%;
    //     position: relative;
    //     width: 100%;
    // `;
    return (
        <HomeHeroSection>
            <Container>
                <Row className={"heroRow"}>
                    <Col>
                        <HeroHeading {...homeConfig.homeOne} />
                    </Col>
                    <Col>
                        <BigLogo size={600} />
                    </Col>
                    {/* <Col className={heroColRight}>
                        <HeroCardWrapper>
                            <HeroCard
                                title="Main Card Title"
                                titleClass="h2"
                                text="Cool Stories"
                                align="right"
                                {...heroCardReveal}>
                                <Button
                                    href="#"
                                    variant="primary"
                                    className={styles.heroButton}>
                                    Button 1
                                </Button>
                                <Button
                                    href="#"
                                    variant="outline-primary"
                                    className={styles.heroButton}>
                                    Button 2
                                </Button>
                            </HeroCard>
                        </HeroCardWrapper>
                    </Col> */}
                </Row>
                {/* <Row></Row> */}
            </Container>
        </HomeHeroSection>
    );
}

export default Hero;
