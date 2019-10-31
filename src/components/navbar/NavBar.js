import React, { Component } from "react";
import { Button, CardDeck, Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";
import NavSection from "components/navbar/NavSection";
import Logo from "components/svg/Logos";
import { navConfig, siteConfig, homeConfig } from "config";
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

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.navClosed = { expanded: false, bg: "bg1", variant: "bg1" };
        this.navOpen = { expanded: true, bg: "bg2", variant: "bg2" };
        this.state = this.navClosed;
        this.handleNavClick = () => {
            this.setState(this.navClosed);
            this.setButtonState(false);
        };
        this.buttonActive = false;
        this.setButtonState = () => {
            this.buttonActive = false;
        };
    }
    render() {
        return (
            <>
                <Navbar
                    className={
                        // Show bottom border if navbar is open
                        this.state.expanded
                            ? styles.navDropdownOpen
                            : styles.navDropdown
                    }
                    id={"navbar"}
                    expand="false"
                    expanded={this.state.expanded}
                    bg={this.state.bg}
                    variant={this.state.variant}
                    onToggle={e => {
                        if (e === true) {
                            this.setState(this.navOpen);
                        } else {
                            this.setState(this.navClosed);
                        }
                    }}>
                    <Container>
                        <Navbar.Brand href="#">
                            <LinkContainer to="/">
                                <Logo.Iconographic
                                    size={siteConfig.navIconSize}
                                />
                            </LinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="main-nav">
                            <FiMenu
                                color={theme.stWhite}
                                size={siteConfig.navIconSize}
                                className={styles.toggleButtonIcon}
                            />
                        </Navbar.Toggle>
                        <Navbar.Collapse
                            id="main-nav"
                            className={styles.navCollapse}>
                            <>
                                <NavRow>
                                    <LinkContainer to="/contact">
                                        <ContactButton
                                            variant="outline-light"
                                            onClick={this.handleNavClick}
                                            active={this.buttonActive}>
                                            {homeConfig.contactButton.text}
                                        </ContactButton>
                                    </LinkContainer>
                                </NavRow>
                                {navConfig.map((menu, i) => {
                                    return (
                                        <NavSectionRow key={i}>
                                            <NavSection
                                                menu={menu}
                                                handleNavClick={
                                                    this.handleNavClick
                                                }
                                            />
                                        </NavSectionRow>
                                    );
                                })}
                            </>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default NavBar;
