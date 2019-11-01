import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Display } from "components/styled/text";
import Logo from "components/svg/Logos";
import classNames from "classnames";
import styled from "styled-components";
import styles from "components/pages/home/styles.module.scss";
import theme from "styles/exports.module.scss";
import site, { homeConfig } from "config";

const heroColLeft = classNames("pr-md-5", "py-md-2", "text-white", "heroCol");
const heroColRight = classNames("pl-md-5", "py-md-2", "heroCol");

const config = site.pages.home;

const Title = styled(Display.Title)`
    width: 100%;
    @media (max-width: ${theme.breakMd}) {
        font-size: ${theme.h1FontSize};
    }
    @media (max-width: ${theme.breakLg}) {
    }
    @media (min-width: ${theme.breakSm}) {
    }
    @media (min-width: ${theme.breakMd}) {
    }
    @media (min-width: ${theme.breakLg}) {
    }
    @media (min-width: ${theme.breakXl}) {
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

function Hero() {
    const heroCardReveal = {
        right: true,
        cascade: true,
        duration: 128
    };
    const HeroCardWrapper = styled.div`
        flex: 0 0 auto;
        max-width: 100%;
        position: relative;
        width: 100%;
    `;
    return (
        <section className={styles.heroSection}>
            <Container>
                <Row className={"heroRow"}>
                    <Col className={heroColLeft}>
                        <HeroHeading {...homeConfig.homeOne} />
                        <p className={"lead"}>{homeConfig.homeOne.text}</p>
                    </Col>
                    <Col className={heroColRight}>
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
                <Row></Row>
            </Container>
        </section>
    );
}

export default Hero;
