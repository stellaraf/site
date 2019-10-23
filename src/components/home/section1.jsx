import React, { Component } from "react";
import { CardDeck, Container } from "react-bootstrap";
import { SectionCard } from "components/home/cards";
import styles from "components/home/styles.module.scss";
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

export default SectionOne;
