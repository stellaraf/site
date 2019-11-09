import React, { useState, useEffect } from "react";
import { Button, Container, Navbar, ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useWindowScroll, useLockBodyScroll } from "react-use";
import useWhyDidYouUpdate from "hooks/useWhyDidYouUpdate";
import Hamburger from "components/navbar/Hamburger";
import styled from "styled-components";
import Logo from "components/svg/Logos";
import bp, { query } from "utils/breakpoints";
import site from "config";
import theme from "styles/exports.module.scss";

const LinkBlock = styled.div`
    display: flex;
    flex: 1 0 0;
    align-items: center;
    pointer-events: auto;
    justify-content: ${props => (props.side === "right" ? "flex-end" : "flex-start")};
`;

const ContactButton = styled(Button)`
    border: ${theme.cardBorderWidth} solid ${theme.navCardBorderColor} !important;
    white-space: nowrap;
    color: ${theme.navLinkColor} !important;
    :hover {
        color: ${theme.stDark} !important;
    }
`;

const NavWrapper = styled.div`
    position: fixed !important;
    height: 86px;
    top: 0;
    width: 100%;
    z-index: 1000 !important;
    background-color: transparent !important;
`;

const DesktopNav = styled(({ position, background, top, ...props }) => (
    <Navbar variant="transparent" {...props} />
))`
    padding: 0 1rem !;
    margin-bottom: 10vh;
    background-color: "transparent" !important;
    border-bottom: ${theme.navbarBottomBorder};
    transition: background-color 0.5s ease 0.2s;

    &.sticky {
        background-color: ${theme.stDark} !important;
    }

    ${bp.down("md")} {
        justify-content: flex-start !important;
        font-size: ${theme.fontSizeSm};
        align-items: flex-end !important;
    }
`;

const DesktopLogoBlock = styled.div`
    opacity: 0;
    width: 100%;
    display: flex;
    flex: 0 1 0;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    height: 86px;
    transform: translate3d(-5%, 50%, 0);
    transform-origin: bottom;
    transition: all 0.2s ease;
    pointer-events: none;
    background-color: transparent !important;

    &.logo.in-nav {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
    }
`;

const NavLink = styled(({ isLocation, ...props }) => <Link {...props} />)`
    position: relative;
    display: inline-block;
    padding: ${theme.navLinkPaddingX} 0.5rem ${theme.navLinkPaddingX} 0.5rem;
    margin-right: 1rem;
    text-decoration: none;
    color: ${({ isLocation }) => (isLocation ? theme.stSecondary : theme.navLinkColor)};
    font-weight: ${({ isLocation }) =>
        isLocation ? theme.fontWeightBold : theme.fontWeightNormal};
    transition: color 0.5s, font-weight 0.5s;
    ${bp.up("lg")} {
        margin-right: 2rem;
        padding: ${theme.navLinkPaddingX};
    }
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
        transform: translateY(-10px);
    }
    ${bp.down("md")} {
        padding: 0.5rem;
    }
`;

function NavItems({ side, location }) {
    let navItems = [];
    let navConfig = site.newNav[side];
    navConfig.map((item, i) => {
        navItems.push(
            <NavLink key={i} isLocation={location === item.link ? true : false} to={item.link}>
                {item.title}
            </NavLink>
        );
        return null;
    });
    return navItems;
}

function DesktopNavBar({ doScroll, pathName }) {
    // Render
    return (
        <NavWrapper>
            <DesktopNav id="navbar-d" className={doScroll ? "sticky" : null}>
                <LinkBlock side="left">
                    <NavItems side="left" location={pathName} />
                </LinkBlock>
                <DesktopLogoBlock className={doScroll ? "logo in-nav" : "logo"}>
                    <Link to="/">
                        <Logo.Typographic color={"white"} width={160} height={160} />
                    </Link>
                </DesktopLogoBlock>
                <LinkBlock side="right">
                    <NavItems side="right" location={pathName} />
                    <ContactButton href="/contact" variant="outline-light">
                        {site.pages.contact.title}
                    </ContactButton>
                </LinkBlock>
            </DesktopNav>
        </NavWrapper>
    );
}

const MobileNavRow = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    padding-left: 15px;
    padding-right: 15px;
    align-content: center;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const MobileNavLink = styled(({ isLocation, ...props }) => <Link {...props} />)`
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

function MobileNavItems({ side, location, className }) {
    let navItems = [];
    let navConfig = site.newNav[side];
    navConfig.map((item, i) => {
        navItems.push(
            <MobileNavLink
                key={i}
                className={className}
                isLocation={location === item.link ? true : false}
                to={item.link}>
                {item.title}
            </MobileNavLink>
        );
        return null;
    });
    return navItems;
}

const MobileHamburgerWrapper = styled(Container)`
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
const MobileHamburgerGroup = styled(ListGroup)`
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
const MobileHamburgerItem = styled(({ isLocation, to, className, ...props }) => (
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

function MobileHamburgerItems({ location, closeNav }) {
    let navConfig = site.newNav.left.concat(site.newNav.right);
    return (
        <MobileHamburgerWrapper>
            {/* <MobileHamburgerBorder /> */}
            <ContactButton href="/contact" variant="outline-light" block>
                {site.pages.contact.title}
            </ContactButton>
            <MobileHamburgerGroup>
                {navConfig.map((item, i) => {
                    return (
                        <MobileHamburgerItem
                            className={`list-group-item ${location === item.link ? "active" : ""}`}
                            key={i}
                            to={item.link}
                            isLocation={location === item.link ? true : false}
                            onClick={closeNav}>
                            {item.title}
                        </MobileHamburgerItem>
                    );
                })}
            </MobileHamburgerGroup>
        </MobileHamburgerWrapper>
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
    font-size: ${theme.fontSizeSm};
    border-bottom: ${theme.navbarBottomBorder};
    background-color: transparent !important;

    &.sticky {
        background-color: ${theme.stDark} !important;
    }
`;

const MobileLogoBlock = styled.div`
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

const HamburgerToggle = styled(Navbar.Toggle)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    opacity: 1;
    visibility: visible;
    transition: all 0.2s ease;
    transform-origin: right;
`;

const MobileHamburger = styled(Navbar.Collapse)`
    padding-left: 0 !important;
    padding-right: 0 !important;
`;

function MobileNavBar({ navOpen, setNavOpen, pathName, doScroll }) {
    useWhyDidYouUpdate("MobileNavBar", { navOpen, setNavOpen, pathName, doScroll });

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
                className={doScroll ? "sticky" : null}>
                <MobileNavRow>
                    <MobileLogoBlock
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
                    </MobileLogoBlock>
                    <HamburgerToggle
                        className={doScroll ? "nav-m-toggle" : "nav-m-toggle hidden"}
                        aria-controls="navbar-m">
                        <Hamburger
                            isOpen={navOpen}
                            colorOpen={theme.stSecondary}
                            colorClosed={theme.stWhite}
                        />
                    </HamburgerToggle>
                    {!navOpen && (
                        <MobileNavItems
                            className={doScroll ? "nav-m-item hidden" : "nav-m-item"}
                            side="left"
                            location={pathName}
                        />
                    )}
                </MobileNavRow>
                <MobileHamburger>
                    <MobileHamburgerItems location={pathName} closeNav={handleNavClose} />
                </MobileHamburger>
            </MobileNav>
        </NavWrapper>
    );
}

function NavBarEntry() {
    useWhyDidYouUpdate("NavBarEntry");
    // Variables
    const logoBreak = site.global.logoTransitionScroll;
    const { pathname: pathName } = useLocation();
    const isHome = pathName === "/" ? true : false;

    // State
    const [readyToScroll, setReadyToScroll] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const { y } = useWindowScroll();

    // Hooks
    useEffect(() => {
        isHome && y >= logoBreak && setReadyToScroll(true);
        isHome && y < logoBreak && setReadyToScroll(false);
        !isHome && setReadyToScroll(true);
    }, [isHome, isOpen, logoBreak, y]);

    useLockBodyScroll(isOpen);
    // Render
    if (query.atMost("sm")) {
        return (
            <MobileNavBar
                navOpen={isOpen}
                setNavOpen={setOpen}
                pathName={pathName}
                doScroll={readyToScroll}
            />
        );
    } else {
        return <DesktopNavBar doScroll={readyToScroll} pathName={pathName} />;
    }
}

export default NavBarEntry;
