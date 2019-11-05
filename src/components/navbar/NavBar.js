import React, { useState } from "react";
import { Button, CardDeck, Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import NavSection from "components/navbar/NavSection";
import Hamburger from "components/navbar/Hamburger";
import Logo from "components/svg/Logos";
import site from "config";
import styles from "components/navbar/styles.module.scss";
import theme from "styles/exports.module.scss";

const NavRow = styled(Container)`
    display: flex;
    padding-left: 0 !important;
    padding-right: 0 !important;
    justify-content: end;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const ContactButton = styled(Button)`
    margin-left: auto;
    border: ${theme.cardBorderWidth} solid ${theme.navCardBorderColor} !important;
`;

const NavSectionRow = styled(CardDeck)`
    @media (min-width: ${theme.breakSm}) {
        justify-content: center;
        &:nth-child(n + 1) {
            margin-top: 0;
        }
    }
    @media (min-width: ${theme.breakMd}) {
        justify-content: center;
        &:nth-child(n + 1) {
            margin-top: 0;
        }
    }
    @media (min-width: ${theme.breakLg}) {
        &:nth-child(n + 1) {
            margin-top: ${theme.gridGutterWidth};
        }
    }
    @media (min-width: ${theme.breakXl}) {
        &:nth-child(n + 1) {
            margin-top: ${theme.gridGutterWidth};
        }
    }
`;

const StyledNav = styled(Navbar)`
    background-image: ${props => props.background};
    border-bottom: ${props => props.border};
`;

function NavBar() {
    const config = site.nav;
    const home = site.pages.home;
    const [isOpen, setOpen] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState("none");
    const [navBorder, setNavBorder] = useState("none");
    const [buttonActive, setButtonActive] = useState(false);
    const handleToggle = event => {
        if (event) {
            console.log("Seen open");
            setOpen(true);
            setBackgroundImage(theme.stGradientDown);
            setNavBorder(theme.navbarBottomBorder);
        } else {
            console.log("Seen closed");
            setButtonActive(false);
            setOpen(false);
            setBackgroundImage("none");
            setNavBorder("none");
        }
    };
    const handleNavClick = () => handleToggle(false);
    const handleBrandClick = () => {
        if (isOpen) {
            handleNavClick();
        }
    };
    return (
        <>
            <StyledNav
                id="navbar"
                expand="false"
                expanded={isOpen}
                bg="transparent"
                background={backgroundImage}
                border={navBorder}
                variant="transparent"
                onToggle={handleToggle}>
                <Container>
                    <Navbar.Brand href="/">
                        <LinkContainer to="/" onClick={handleBrandClick}>
                            <Logo.Iconographic size={site.global.navIconSize} />
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar">
                        <Hamburger
                            isOpen={isOpen}
                            colorOpen={theme.stSecondary}
                            colorClosed={theme.stWhite}
                        />
                    </Navbar.Toggle>
                    <Navbar.Collapse
                        id="main-nav"
                        className={styles.navCollapse}>
                        <>
                            <NavRow>
                                <LinkContainer
                                    exact
                                    onClick={handleNavClick}
                                    isActive={buttonActive}
                                    activeClassName={null}
                                    to="/contact">
                                    <ContactButton
                                        href="/contact"
                                        variant="outline-light">
                                        {home.contactButton.text}
                                    </ContactButton>
                                </LinkContainer>
                            </NavRow>
                            {config.map((menu, i) => {
                                return (
                                    <NavSectionRow key={i}>
                                        <NavSection
                                            menu={menu}
                                            handleNavClick={handleNavClick}
                                        />
                                    </NavSectionRow>
                                );
                            })}
                        </>
                    </Navbar.Collapse>
                </Container>
            </StyledNav>
        </>
    );
}
export default NavBar;
