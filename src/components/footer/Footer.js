import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import classNames from "classnames";
import theme from "styles/exports.module.scss";
import styles from "components/footer/styles.module.scss";
import { footerConfig } from "config";
import Logo from "components/svg/Logos";
import Copyright from "components/footer/Copyright";

const FooterRow = styled(Row)`
    width: 100%;
`;

const LogoCol = styled(Col)`
    display: flex;
    justify-content: end;
    flex-grow: 1 !important;
    flex-shrink: 0 !important;
    padding-right: 0 !important;
`;

const LinkCol = styled(Col)`
    display: flex;
    align-self: flex-start;
    flex-grow: 0 !important;
    flex-shrink: 1 !important;
    margin-right: ${theme.gridGutterWidth};
    &:nth-child(n + 2) {
        margin-left: ${theme.gridGutterWidth};
    }
`;

const FooterLogo = styled(Logo.Typographic)`
    margin-left: auto;
`;

function FooterLink({ name, link }) {
    return (
        <li className={styles.footerLink}>
            <LinkContainer to={link}>
                <a className={styles.footerLinkItem}>{name}</a>
            </LinkContainer>
        </li>
    );
}

function FooterHeading({ title }) {
    return (
        <li className={styles.footerLink}>
            <p className={styles.footerLinkTitle}>{title}</p>
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
        <LinkCol key={i}>
            <FooterSection
                key={i}
                title={section.title}
                links={section.links}
            />
        </LinkCol>
    ));
}

class Footer extends Component {
    render() {
        return (
            <>
                <nav
                    className={classNames(
                        "navbar",
                        "navbar-footer",
                        styles.footerStyle
                    )}
                    style={{
                        paddingTop: "3rem",
                        paddingBottom: "1rem"
                    }}>
                    <Container>
                        <FooterRow>
                            <FooterCol sections={footerConfig.sections} />
                            <LogoCol>
                                <FooterLogo size={300} />
                            </LogoCol>
                        </FooterRow>
                        <Copyright />
                    </Container>
                </nav>
            </>
        );
    }
}

export default Footer;
