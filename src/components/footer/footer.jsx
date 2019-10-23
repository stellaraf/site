import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "components/footer/styles.module.css";
import { footerConfig } from "config";
import Copyright from "components/footer/copyright";
import classNames from "classnames";

const footerStyle = classNames(
  "navbar",
  "navbar-footer",
  "bg-light",
  styles.footerSticky
);

function FooterLink({ name, link }) {
  return (
    <li className={styles.footerLink}>
      <small>
        <a href={link} className={styles.footerLinkItem}>
          {name}
        </a>
      </small>
    </li>
  );
}

function FooterHeading({ title }) {
  return (
    <li className={styles.footerLink}>
      <small className={styles.footerLinkTitle}>{title}</small>
    </li>
  );
}

function FooterSection({ title, links }) {
  const footerLinks = links.map((item, i) => {
    return <FooterLink key={i} link={item.link} name={item.name} />;
  });
  return (
    <ul style={{ paddingRight: 0, paddingLeft: 0 }}>
      <FooterHeading title={title} />
      {footerLinks}
    </ul>
  );
}

function FooterCol({ sections }) {
  return sections.map((section, i) => (
    <Col key={i}>
      <FooterSection key={i} title={section.title} links={section.links} />
    </Col>
  ));
}

class Footer extends Component {
  render() {
    return (
      <>
        <nav
          className={footerStyle}
          style={{
            paddingTop: "3rem",
            paddingBottom: "1rem"
          }}
        >
          <Container>
            <Row>
              <FooterCol sections={footerConfig.sections} />
            </Row>
            <Copyright />
          </Container>
        </nav>
      </>
    );
  }
}

export default Footer;
