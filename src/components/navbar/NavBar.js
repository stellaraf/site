import React, { Component } from "react";
import { CardDeck, Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Menu as FeatherMenu } from "react-feather";
import NavSection from "components/navbar/NavSection";
import Logo from "components/svg/Logos";
import { navConfig, siteConfig } from "config";
import styles from "components/navbar/styles.module.scss";
import theme from "styles/exports.module.scss";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.navClosed = { expanded: false, bg: "bg1", variant: "bg1" };
        this.navOpen = { expanded: true, bg: "bg2", variant: "bg2" };
        this.state = this.navClosed;
        this.handleNavClick = () => {
            this.setState(this.navClosed);
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
                            <FeatherMenu
                                color={theme.stWhite}
                                size={siteConfig.navIconSize}
                                className={
                                    styles.toggleButtonIcon
                                }></FeatherMenu>
                        </Navbar.Toggle>
                        <Navbar.Collapse
                            id="main-nav"
                            className={styles.navCollapse}>
                            {navConfig.map((menu, i) => {
                                return (
                                    <CardDeck
                                        className={styles.menuRow}
                                        key={i}>
                                        <NavSection
                                            menu={menu}
                                            handleNavClick={this.handleNavClick}
                                        />
                                    </CardDeck>
                                );
                            })}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default NavBar;
