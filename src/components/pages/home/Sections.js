import React, { Component } from "react";
import { CardDeck, Container } from "react-bootstrap";
import { SectionCard } from "components/pages/home/Cards";
import styles from "components/pages/home/styles.module.scss";
import classNames from "classnames";

class SectionOne extends Component {
    render() {
        return (
            <section className={classNames(styles.heroSection, "infoSection")}>
                <Container>
                    <CardDeck>
                        <SectionCard delay={128} />
                        <SectionCard delay={64} />
                        <SectionCard />
                    </CardDeck>
                </Container>
            </section>
        );
    }
}

export { SectionOne };
