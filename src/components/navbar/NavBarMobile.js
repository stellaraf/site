import React from "react";
import { Button, Container, Navbar, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Hamburger from "components/navbar/Hamburger";
import styled from "styled-components";
import Logo from "components/svg/Logos";
import bp from "utils/breakpoints";
import site from "config";
import theme from "styles/exports.module.scss";

const NavWrapper = styled.div`
    position: fixed !important;
    height: 86px;
    top: 0;
    width: 100%;
    z-index: 1000 !important;
    background-color: transparent !important;
`;

const ContactButton = styled(Button)`
    border: ${theme.cardBorderWidth} solid ${theme.navCardBorderColor} !important;
    white-space: nowrap;
    color: ${theme.navLinkColor} !important;
    :hover {
        color: ${theme.stDark} !important;
    }
`;

const NavBarContent = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    padding-left: 15px;
    padding-right: 15px;
    align-content: center;
    justify-content: space-between;
    /* margin-top: 1rem;
    margin-bottom: 1rem; */
`;

const NavBarLink = styled(({ isLocation, ...props }) => <Link {...props} />)`
    position: relative;
    display: inline-block;
    padding: ${theme.navLinkPaddingX};
    text-decoration: none;
    color: ${({ isLocation }) => (isLocation ? theme.stSecondary : theme.navLinkColor)};
    font-weight: ${({ isLocation }) =>
        isLocation ? theme.fontWeightBold : theme.fontWeightNormal};
    transition: color 0.5s, font-weight 0.5s;

    &:hover {
        color: ${({ isLocation }) => (isLocation ? theme.stSecondary : theme.stWhite)} !important;
    }

    ::before {
        position: absolute;
        left: 0;
        width: 100%;
        height: ${({ isLocation }) => (isLocation ? "2px" : 0)};
        background: ${theme.stSecondary};
        content: "";
        opacity: ${({ isLocation }) => (isLocation ? 1 : 0)};
        transition: width 0.5s, opacity 0.5s, transform 0.5s;
    }
    ${bp.down("md")} {
        padding: 0.5rem;
    }
`;

function NavBarItems({ side, location, className }) {
    let navItems = [];
    let navConfig = site.newNav[side];
    navConfig.map((item, i) => {
        navItems.push(
            <NavBarLink
                key={i}
                className={className}
                isLocation={location === item.link ? true : false}
                to={item.link}>
                {item.title}
            </NavBarLink>
        );
        return null;
    });
    return navItems;
}

const NavMenuWrapper = styled(Container)`
    width: 100%;
    position: relative;
    background-color: ${theme.stDark};
    color: ${theme.stWhite};
    padding-top: 1.5rem !important;
    min-height: 100vh;
    overflow-y: hidden;
    z-index: 2;
    border-top: ${theme.navbarBottomBorder};
`;
const NavMenuGroup = styled(ListGroup)`
    margin-top: 1.5rem;
    width: 100%;

    .list-group-item:first-child {
        border-top: none;
    }
    .list-group-item:last-child {
        border-bottom: none;
        border-top: 1px solid ${theme.hamburgerLinkBorder} !important;
    }
    .list-group-item:not(:first-child):not(:last-child) {
        border-top: 1px solid ${theme.hamburgerLinkBorder} !important;
    }
    .list-group-item {
        padding: 2rem 1.25rem;
        border: none;
        background-color: transparent;
        border-radius: 0 !important;
        transition: background-color 0.2s ease;
    }
    .list-group-item:hover,
    .list-group-item:active,
    .list-group-item.active {
        background-color: ${theme.hamburgerLinkHoverBackground} !important;
        border-color: unset;
    }
`;
const NavMenuItem = styled(({ isLocation, to, className, ...props }) => (
    <Link className={className} to={to} active={isLocation.toString()} {...props} />
))`
    color: ${props => (props.isLocation ? theme.stSecondary : theme.stWhite)};
    font-weight: ${props => (props.isLocation ? theme.fontWeightBold : theme.fontWeightNormal)};
    font-size: ${theme.fontSizeLg};
    text-decoration: none;
    :hover {
        color: inherit;
        text-decoration: none !important;
    }
`;

function NavMenuContent({ location, closeNav }) {
    let navConfig = site.newNav.left.concat(site.newNav.right);
    return (
        <NavMenuWrapper>
            {/* <MobileHamburgerBorder /> */}
            <ContactButton href="/contact" variant="outline-light" block>
                {site.pages.contact.title}
            </ContactButton>
            <NavMenuGroup>
                {navConfig.map((item, i) => {
                    return (
                        <NavMenuItem
                            className={`list-group-item ${location === item.link ? "active" : ""}`}
                            key={i}
                            to={item.link}
                            isLocation={location === item.link ? true : false}
                            onClick={closeNav}>
                            {item.title}
                        </NavMenuItem>
                    );
                })}
            </NavMenuGroup>
        </NavMenuWrapper>
    );
}

const MobileNav = styled(({ position, background, top, itemsVisible, expanded, ...props }) => (
    <Navbar variant="transparent" expanded={expanded} {...props} />
))`
    display: flex !important;
    flex: 1 0 100% !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0 !important;
    height: 86px;
    font-size: ${theme.fontSizeSm};
    // border-bottom: ${theme.navbarBottomBorder};
    background-color: transparent;

    &.home {
        background-color: ${theme.stPrimary};
    }

    &.sticky.home {
        background-color: ${theme.stPrimary};
    }

    &.sticky {
        background-color: ${theme.stDark};
    }
`;

const NavBarLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    height: 86px;
    transition: all 0.2s ease;
    transform: translate3d(2%, 8%, 0);
    transform-origin: bottom;

    &.logo-m.in-nav {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
    }
`;

const NavMenuToggle = styled(Navbar.Toggle)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    opacity: 1;
    visibility: visible;
    transition: all 0.2s ease;
    transform-origin: right;
    padding-top: 1rem !important;
    padding-right: 0.75rem !important;
    padding-bottom: 0.5rem !important;
    padding-left: 0.25rem !important;
`;

const NavMenu = styled(Navbar.Collapse)`
    padding-left: 0 !important;
    padding-right: 0 !important;
`;

export default function MobileNavBar({ navOpen, setNavOpen, pathName, doScroll }) {
    const isHome = pathName === "/" ? true : false;
    const handleNavClose = () => setNavOpen(false);
    const handleNavClick = e => setNavOpen(e);

    // Render
    return (
        <NavWrapper>
            <MobileNav
                id="navbar-m"
                expand="false"
                expanded={navOpen}
                onToggle={handleNavClick}
                // className={doScroll ? "sticky" : null}
                className={
                    doScroll && !isHome
                        ? "sticky"
                        : doScroll && isHome
                        ? "sticky home"
                        : !doScroll && isHome
                        ? "home"
                        : null
                }>
                <NavBarContent>
                    <NavBarLogo
                        className={
                            doScroll && !navOpen
                                ? "logo-m in-nav"
                                : !doScroll && navOpen
                                ? "logo-m in-nav"
                                : doScroll && navOpen
                                ? "logo-m in-nav"
                                : "logo-m hidden"
                        }>
                        <Link to="/" onClick={navOpen ? handleNavClose : null}>
                            <Logo.Typographic color={"white"} width={160} height={86} />
                        </Link>
                    </NavBarLogo>
                    <NavMenuToggle
                        className={doScroll ? "nav-m-toggle" : "nav-m-toggle hidden"}
                        aria-controls="navbar-m">
                        <Hamburger
                            isOpen={navOpen}
                            colorOpen={theme.stSecondary}
                            colorClosed={theme.stWhite}
                        />
                    </NavMenuToggle>
                    {!navOpen && (
                        <NavBarItems
                            className={doScroll ? "nav-m-item hidden" : "nav-m-item"}
                            side="left"
                            location={pathName}
                        />
                    )}
                </NavBarContent>
                <NavMenu>
                    <NavMenuContent location={pathName} closeNav={handleNavClose} />
                </NavMenu>
            </MobileNav>
        </NavWrapper>
    );
}
