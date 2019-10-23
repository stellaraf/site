import React, { Component } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { Menu as FeatherMenu } from "react-feather";
import DropdownMenu from "components/navbar/dropdown";
import { navConfig, siteConfig } from "config";
import styles from "components/navbar/styles.module.scss";
import theme from "styles/exports.module.scss";
import classNames from "classnames";

class Navigation extends Component {
  render() {
    return (
      <>
        <Navbar expand="lg">
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
                className={styles.toggleButtonIcon}
              ></FeatherMenu>
            </Navbar.Toggle>
            <Navbar.Collapse id="main-nav">
              <Nav className="mr-auto">
                {navConfig.map((menu, i) => {
                  return <DropdownMenu key={i} menu={menu} />;
                })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <hr style={{ marginTop: "0" }} />
      </>
    );
  }
}

export default Navigation;
