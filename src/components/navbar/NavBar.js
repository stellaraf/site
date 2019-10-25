import React, { Component } from "react";
import { CardDeck, Container, Navbar } from "react-bootstrap";
import { Menu as FeatherMenu } from "react-feather";
import NavSection from "components/navbar/NavSection";
import { navConfig, siteConfig } from "config";
import styles from "components/navbar/styles.module.scss";
import theme from "styles/exports.module.scss";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false, bg: "bg1", variant: "bg1" };
    }
    render() {
        return (
            <Navbar
                className={styles.navDropdown}
                id={"navbar"}
                expand="false"
                expanded={this.state.expanded}
                bg={this.state.bg}
                variant={this.state.variant}
                onToggle={e => {
                    if (e === true) {
                        this.setState({
                            expanded: e,
                            bg: "bg2",
                            variant: "bg2"
                        });
                    } else {
                        this.setState({
                            expanded: e,
                            bg: "bg1",
                            variant: "bg1"
                        });
                    }
                }}>
                <Container>
                    <Navbar.Brand href="#">
                        <img
                            src="logo192.png"
                            width={siteConfig.navIconSize}
                            height={siteConfig.navIconSize}
                            style={{
                                display: "inline-block",
                                marginBottom: "0",
                                verticalAlign: "top"
                            }}
                            alt="Temporary Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-nav">
                        <FeatherMenu
                            color={theme.stWhite}
                            size={siteConfig.navIconSize}
                            className={styles.toggleButtonIcon}></FeatherMenu>
                    </Navbar.Toggle>
                    <Navbar.Collapse
                        id="main-nav"
                        className={styles.navCollapse}>
                        {navConfig.map((menu, i) => {
                            return (
                                <CardDeck className={styles.menuRow} key={i}>
                                    <NavSection menu={menu} />
                                </CardDeck>
                            );
                        })}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;
