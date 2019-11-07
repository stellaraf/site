import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import classNames from "classnames";
import theme from "styles/exports.module.scss";
import styles from "components/footer/styles.module.scss";
import site from "config";
import Logo from "components/svg/Logos";
import bp from "utils/breakpoints";
import { FaLinkedin, FaTwitter, FaFacebook, FaGithub } from "react-icons/fa";

const socialIcons = {
    LinkedIn: FaLinkedin,
    Twitter: FaTwitter,
    Facebook: FaFacebook,
    Github: FaGithub
};

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
    padding-left: 0 !important;
    padding-right: 0 !important;
    @media (max-width: ${theme.breakLg}) {
    }
    @media (min-width: ${theme.breakSm}) {
    }
    @media (min-width: ${theme.breakMd}) {
        &:first-of-type {
            padding-left: 15px !important;
            margin-left: 0;
            margin-right: ${theme.gridGutterWidth};
        }
        &:last-of-type {
            padding-right: 15px !important;
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
    text-align: left;
    font-size: fontSizeSm;
    margin-bottom: 0;
    color: ${theme.stGray};
`;

const FooterLogo = styled(Logo.Typographic)`
    margin-left: auto;
    ${bp.down("md")} {
        margin-left: 0;
        margin-right: auto;
    }
`;

function FooterLink({ name, link }) {
    return (
        <li className={styles.footerLink}>
            <LinkContainer to={link}>
                <a href={link} className={styles.footerLinkItem}>
                    {name}
                </a>
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
        <LinkCol key={i} md={2} sm={6}>
            <FooterSection
                key={i}
                title={section.title}
                items={section.items}
            />
        </LinkCol>
    ));
}

const StyledSocialList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    padding-inline-start: 0 !important;
`;
function SocialIcon({ iconName, link }) {
    const ThisIcon = styled(iconName)`
        margin-right: 1rem;
        color: ${theme.stWhite};
        &:hover {
            color: ${theme.stSecondary};
        }
    `;
    return (
        <li>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <ThisIcon />
            </a>
        </li>
    );
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
                            <Row>
                                <Col sm={12}>
                                    <StyledSocialList>
                                        {site.social.map((platform, i) => {
                                            const MatchedIcon =
                                                socialIcons[platform.name];
                                            return (
                                                <SocialIcon
                                                    key={i}
                                                    iconName={MatchedIcon}
                                                    link={platform.link}
                                                />
                                            );
                                        })}
                                    </StyledSocialList>
                                </Col>
                                <Col>
                                    <CopyrightText>
                                        {`Copyright © ${new Date().getFullYear()} ${
                                            site.global.legalName
                                        }`}
                                    </CopyrightText>
                                </Col>
                            </Row>
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
