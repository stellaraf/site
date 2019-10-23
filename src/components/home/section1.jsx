import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { SectionCard } from "components/home/cards";
import styles from "components/home/styles.module.scss";
import classNames from "classnames";

const rowStyle = classNames("heroRow");

const sectionStyle = classNames(styles.heroSection, "sectionOne");

class SectionOne extends Component {
  render() {
    return (
      <section className={sectionStyle}>
        <Container>
          <Row className={rowStyle}>
            <SectionCard delay={128} />
            <SectionCard delay={64} />
            <SectionCard />
          </Row>
        </Container>
      </section>
    );
  }
}

export default SectionOne;
