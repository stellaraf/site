import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { HeroCard } from "components/pages/home/Cards";
import classNames from "classnames";
import styled from "styled-components";
import styles from "components/pages/home/styles.module.scss";
import { homeConfig } from "config";

const heroColLeft = classNames("pr-md-5", "py-md-5", "text-white", "heroCol");
const heroColRight = classNames("pl-md-5", "py-md-5", "heroCol");

function HeroHeading({ headings }) {
    return (
        <>
            <h1 className={styles.heroHeadingFirst}>{headings[0]}</h1>
            {headings.slice(1).map((heading, i) => {
                return (
                    <h2 key={i} className={styles.heroHeadingRemaining}>
                        {heading}
                    </h2>
                );
            })}
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
                    </Col>
                </Row>
                <Row></Row>
            </Container>
        </section>
    );
}

export default Hero;
