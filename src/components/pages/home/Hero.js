import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { HeroCard } from "components/pages/home/Cards";
import classNames from "classnames";
import styles from "components/pages/home/styles.module.scss";
import { heroConfig } from "config";

const heroColLeft = classNames("pr-md-5", "py-md-5", "text-white", "heroCol");
const heroColRight = classNames("pl-md-5", "py-md-5", "heroCol");

class HeroHeading extends Component {
    render(props) {
        return (
            <>
                <h1 className={styles.heroHeadingFirst}>
                    {this.props.headings[0]}
                </h1>
                {this.props.headings.slice(1).map((heading, i) => {
                    return (
                        <h2 key={i} className={styles.heroHeadingRemaining}>
                            {heading}
                        </h2>
                    );
                })}
            </>
        );
    }
}

class Hero extends Component {
    render() {
        return (
            <section className={styles.heroSection}>
                <Container>
                    <Row className={"heroRow"}>
                        <Col className={heroColLeft}>
                            <HeroHeading {...heroConfig.homeOne} />
                            <p className={"lead"}>{heroConfig.homeOne.text}</p>
                        </Col>
                        <Col className={heroColRight}>
                            <HeroCard
                                title={"Main Card Title"}
                                titleClass={"h2"}
                                text={"Cool Stories"}
                                align={"right"}>
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
                        </Col>
                    </Row>
                    <Row></Row>
                </Container>
            </section>
        );
    }
}

export default Hero;
