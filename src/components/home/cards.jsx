import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import IconNotFound from "components/home/iconNotFound";
import styles from "components/home/styles.module.scss";
import classNames from "classnames";

class SectionCard extends Component {
  constructor(props) {
    super();
  }
  static defaultProps = {
    left: true,
    right: false,
    top: false,
    bottom: false,
    duration: 128,
    delay: 0,
    cascade: true,
    icon: <IconNotFound />,
    title: "Placeholder Title",
    text: "Placeholder Text"
  };
  render() {
    return (
      <Slide
        left={this.props.left}
        right={this.props.right}
        top={this.props.top}
        bottom={this.props.bottom}
        duration={this.props.duration}
        delay={this.props.delay}
        cascade={this.props.cascade}
      >
        <div>
          <Col>
            <Card className={styles.sectionCard}>
              <div className={styles.sectionCardTop}>{this.props.icon}</div>
              <div className={styles.sectionCardBottom}>
                {this.props.children || (
                  <>
                    <h5 className={styles.sectionCardTitle}>
                      {this.props.title}
                    </h5>
                    <p className={styles.sectionCardText}>{this.props.text}</p>
                  </>
                )}
              </div>
            </Card>
          </Col>
        </div>
      </Slide>
    );
  }
}

class HeroCard extends Component {
  constructor(props) {
    super();
  }
  static defaultProps = {
    left: true,
    right: false,
    top: false,
    bottom: false,
    duration: 128,
    delay: 0,
    cascade: true,
    align: "left",
    title: "Placeholder Title",
    titleClass: "h5",
    text: "Placeholder Text"
  };
  render() {
    return (
      <Slide
        left={this.props.left}
        right={this.props.right}
        top={this.props.top}
        bottom={this.props.bottom}
        duration={this.props.duration}
        delay={this.props.delay}
        cascade={this.props.cascade}
      >
        <div>
          <Col>
            <Card
              className={styles.mainCard}
              style={{ textAlign: this.props.align }}
            >
              <Card.Body className={styles.mainCardBody}>
                <>
                  <p
                    className={classNames(
                      this.props.titleClass,
                      styles.mainCardTitle
                    )}
                  >
                    {this.props.title}
                  </p>
                  <p className={styles.mainCardText}>{this.props.text}</p>
                </>
                {this.props.children}
              </Card.Body>
            </Card>
          </Col>
        </div>
      </Slide>
    );
  }
}

export { SectionCard, HeroCard };
