import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import classNames from "classnames";
import theme from "styles/exports.module.scss";
import styles from "components/footer/styles.module.scss";
import site from "config";
import Logo from "components/svg/Logos";

const FooterRow = styled(Row)`
    justify-items: center;
    justify-content: space-between;
    width: 100%;
`;

const LogoRow = styled(FooterRow)`
    margin-left: 0 !important;
    margin-right: 0 !important;
`;

const LogoCol = styled(Col)`
    display: flex;
    justify-content: space-between;
    flex-grow: 1 !important;
    flex-shrink: 0 !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
`;

const LinkCol = styled(Col)`
    display: flex;
    align-self: flex-start;
    flex-grow: 0 !important;
    flex-shrink: 1 !important;
    margin-left: ${theme.gridGutterWidth};
    margin-right: ${theme.gridGutterWidth};
    @media (max-width: ${theme.breakLg}) {
    }
    @media (min-width: ${theme.breakSm}) {
    }
    @media (min-width: ${theme.breakMd}) {
        &:first-of-type {
            margin-left: 0;
            margin-right: ${theme.gridGutterWidth};
        }
        &:last-of-type {
            margin-right: 0;
            margin-left: ${theme.gridGutterWidth};
        }
    }
    @media (min-width: ${theme.breakLg}) {
    }
    @media (min-width: ${theme.breakXl}) {
    }
`;

const FooterHr = styled(Container)`
    margin-top: 4vh;
    padding-top: 2vh;
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-top: 1px solid ${theme.stSecondary};
`;

const CopyrightText = styled.p`
    text-align: center;
    font-size: fontSizeSm;
    margin-bottom: 0;
    color: ${theme.stGray};
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

function FooterSection({ title, items }) {
    const footerLinks = items.map((item, i) => {
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
        <LinkCol key={i} sm={2}>
            <FooterSection
                key={i}
                title={section.title}
                items={section.items}
            />
        </LinkCol>
    ));
}

function Footer() {
    return (
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
                    <FooterCol sections={site.footer.sections} />
                </FooterRow>
                <FooterHr fluid={true}>
                    <LogoRow>
                        <LogoCol sm={6}>
                            <CopyrightText>
                                {`Copyright © ${new Date().getFullYear()} ${
                                    site.global.legalName
                                }`}
                            </CopyrightText>
                        </LogoCol>
                        <LogoCol sm={6}>
                            <FooterLogo size={300} tagline />
                        </LogoCol>
                    </LogoRow>
                </FooterHr>
            </Container>
        </nav>
    );
}

export default Footer;
