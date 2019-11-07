import React, { useState, useEffect } from "react";
import { Button, Container, Navbar, ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "components/navbar/Hamburger";
import styled from "styled-components";
import Logo from "components/svg/Logos";
import bp, { query } from "utils/breakpoints";
import site from "config";
import theme from "styles/exports.module.scss";

const NavRow = styled(Container)`
    position: relative;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding-right: 0 !important;
    padding-left: 0 !important;
`;

const LinkBlock = styled.div`
    display: flex;
    align-items: center;
    pointer-events: auto;
`;

const LogoBlock = styled(({ top, right, scale, position, ...props }) => (
    <Link to={props.to || ""} {...props} />
))`
    top: ${props => props.top}vh;
    transition: all 100ms linear 0ms;
    // transform: scale(${props => props.scale}) translate3d(0px, -20px, 0px);
    transform: scale(${props => props.scale}) translate3d(0px, 0px, 0px);
    transform-origin: center top;
    position: ${props => props.position};
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    // width: 100%;
    ${props =>
        props.position === "absolute" ? `right: ${props.right}vw` : null}
    ${props => !props.to && `pointer-events: none;`}
    ${props => (props.position === "absolute" ? "width: 100%;" : null)}
`;

const ContactButton = styled(Button)`
    margin-left: auto;
    border: ${theme.cardBorderWidth} solid ${theme.navCardBorderColor} !important;
    white-space: nowrap;
`;

const DesktopNav = styled(({ position, background, top, ...props }) => (
    <Navbar id="navbar" variant="transparent" {...props} />
))`
    display: flex !important;
    flex: 1 !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
    align-items: center !important;
    margin-bottom: 10vh;
    position: ${props => props.position} !important;
    background-color: ${props => props.background} !important;
    border-bottom: ${theme.navbarBottomBorder};
    ${props => props.position === "fixed" && `width: 100%;`}
    ${props => props.top && `top: ${props.top} !important;`}
    ${props => props.position === "fixed" && `z-index: 1000 !important;`}

    ${bp.down("md")} {
        flex: 1 0 100% !important;
        justify-content: flex-start !important;
        font-size: ${theme.fontSizeSm};
        ${props => props.position === "fixed" && "height: 120px;"}
        align-items: flex-end !important;
    }
`;

const MobileNav = styled(({ position, background, top, ...props }) => (
    <Navbar id="navbar-m" variant="transparent" {...props} />
))`
    display: flex !important;
    flex: 1 !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
    align-items: center !important;
    margin-bottom: 10vh;
    position: ${props => props.position} !important;
    background-color: ${props => props.background} !important;
    border-bottom: ${theme.navbarBottomBorder};
    ${props => props.position === "fixed" && `width: 100%;`}
    ${props => props.top && `top: ${props.top} !important;`}
    ${props => props.position === "fixed" && `z-index: 1000 !important;`}

    ${bp.down("md")} {
        flex: 1 0 100% !important;
        justify-content: flex-start !important;
        font-size: ${theme.fontSizeSm};
        // ${props => props.position === "fixed" && "height: 120px;"}
        align-items: flex-end !important;
    }
`;

// const StyledNav = styled(({ background, position, top, border, ...props }) => (
//     <Navbar {...props} />
// ))`
//     margin-bottom: 10vh;
//     position: ${props => props.position} !important;
//     background-color: ${props => props.background} !important;
//     border-bottom: ${props => props.border};
//     ${props => props.position === "fixed" && `width: 100%;`}
//     ${props => props.top && `top: ${props.top} !important;`}
//     ${props => props.position === "fixed" && `z-index: 1000 !important;`}
// `;

const NavLink = styled(({ isLocation, ...props }) => <Link {...props} />)`
    position: relative;
    display: inline-block;
    padding: ${theme.navLinkPaddingX};
    margin-right: 2rem;
    text-decoration: none;
    color: ${({ isLocation }) =>
        isLocation ? theme.stSecondary : theme.navLinkColor};
    font-weight: ${({ isLocation }) =>
        isLocation ? theme.fontWeightBold : theme.fontWeightNormal};
    transition: color 0.5s, font-weight 0.5s;

    &:hover {
        color: ${({ isLocation }) =>
            isLocation ? theme.stSecondary : theme.stWhite} !important;
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

// const NavWrapper = styled.div`
//     position: relative;
//     margin-bottom: 5vh;
// `;

const navHero = {
    desktop: {
        navbar: {
            position: "relative",
            background: "transparent"
        },
        logo: {
            top: 15,
            scale: 1,
            position: "absolute"
        }
    },
    mobile: {
        navbar: {
            position: "relative",
            background: "transparent",
            itemsVisible: true
        },
        logo: {
            top: 15,
            scale: 1,
            position: "absolute"
        }
    }
};
const navBar = {
    desktop: {
        navbar: {
            position: "fixed",
            top: "0",
            background: theme.stDark
        },
        logo: {
            top: 0,
            scale: 0.4,
            position: "absolute",
            to: { pathname: "/", state: { heroLogo: true } }
        }
    },
    mobile: {
        navbar: {
            position: "fixed",
            top: "0",
            background: theme.stDark,
            itemsVisible: false
        },
        logo: {
            top: 0,
            right: 25,
            scale: 0.4,
            position: "absolute",
            to: { pathname: "/", state: { heroLogo: true } }
        }
    }
};

function NavItems({ side, location }) {
    let navItems = [];
    let navConfig = site.newNav[side];
    navConfig.map((item, i) => {
        navItems.push(
            <NavLink
                key={i}
                isLocation={location === item.link ? true : false}
                to={item.link}>
                {item.title}
            </NavLink>
        );
    });
    return navItems;
}

const MobileHamburger = styled(({ visible, ...props }) => (
    <Navbar.Toggle {...props} />
))`
    position: absolute !important;
    top: 1vh;
    right: 5vw;
    z-index: 100;
    // border: none;
    // background-color: transparent;
    ${props => (props.visible ? null : "display: none")};
    &:focus {
        outline: none;
    }
`;

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
    ${props => (props.visible ? null : "visibility: hidden;")};
`;

const MobileNavLink = styled(({ isLocation, ...props }) => <Link {...props} />)`
    position: relative;
    display: inline-block;
    padding: ${theme.navLinkPaddingX};
    text-decoration: none;
    color: ${({ isLocation }) =>
        isLocation ? theme.stSecondary : theme.navLinkColor};
    font-weight: ${({ isLocation }) =>
        isLocation ? theme.fontWeightBold : theme.fontWeightNormal};
    transition: color 0.5s, font-weight 0.5s;

    &:hover {
        color: ${({ isLocation }) =>
            isLocation ? theme.stSecondary : theme.stWhite} !important;
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

function MobileNavItems({ side, location }) {
    let navItems = [];
    let navConfig = site.newNav[side];
    navConfig.map((item, i) => {
        navItems.push(
            <MobileNavLink
                key={i}
                isLocation={location === item.link ? true : false}
                to={item.link}>
                {item.title}
            </MobileNavLink>
        );
    });
    return navItems;
}

const MobileHamburgerWrapper = styled(Container)`
    width: 100%;
    position: relative;
    background-color: ${theme.stDark};
    color: ${theme.stWhite};
    padding-top: 10vh;
    min-height: 100vh;
    overflow-y: hidden;
    z-index: 2;
    body {
        position: fixed !important;
    }
`;
const MobileHamburgerGroup = styled(ListGroup)`
    margin-top: 1.5rem;
    width: 100%;

    .list-group-item:first-child {
        border-top: none;
    }
    .list-group-item:last-child {
        border-bottom: none;
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
        border-color: none;
    }
`;
const MobileHamburgerItem = styled(
    ({ isLocation, to, className, ...props }) => (
        <Link className={className} to={to} active={isLocation} {...props} />
    )
)`
    color: ${props => (props.isLocation ? theme.stSecondary : theme.stWhite)};
    font-weight: ${props =>
        props.isLocation ? theme.fontWeightBold : theme.fontWeightNormal};
    font-size: ${theme.fontSizeLg};
    text-decoration: none;
    :hover {
        color: inherit;
        text-decoration: none !important;
    }
`;
const MobileHamburgerBorder = styled.span`
    display: block;
    height: 1px;
    min-width: 120vw;
    width: 100%;
    top: 86px;
    left: -10vw;
    background-color: ${theme.stSecondary};
    position: absolute;
    margin-top: 3px;
    margin-bottom: 2vh;
    overflow: hidden;
`;

function MobileHamburgerItems({ location, closeNav }) {
    let navConfig = site.newNav.left.concat(site.newNav.right);
    return (
        <MobileHamburgerWrapper fluid={true}>
            <MobileHamburgerBorder />
            <ContactButton href="/contact" variant="outline-light" block>
                {site.pages.contact.title}
            </ContactButton>
            <MobileHamburgerGroup>
                {navConfig.map((item, i) => {
                    return (
                        <MobileHamburgerItem
                            className={`list-group-item ${
                                location === item.link ? "active" : ""
                            }`}
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

function DesktopNavBar() {
    let { pathname: activeNav } = useLocation();
    const isHome = activeNav === "/" ? true : false;
    const initialNavState = isHome ? navHero : navBar;
    const [navMode, setNav] = useState(initialNavState);
    const [scrollPosition, setScrollPosition] = useState(0);
    const LOGO_TOP = 100;

    const handleScroll = () =>
        window.scrollY !== 0 && setScrollPosition(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        isHome && scrollPosition <= LOGO_TOP ? setNav(navHero) : setNav(navBar);
    }, [isHome, scrollPosition]);
    return (
        <DesktopNav {...navMode.desktop.navbar}>
            <LinkBlock>
                <NavItems side="left" location={activeNav} />
            </LinkBlock>
            <LogoBlock {...navMode.desktop.logo}>
                <Logo.Typographic color={"white"} width={400} height={200} />
            </LogoBlock>
            <LinkBlock>
                <NavItems side="right" location={activeNav} />
                <ContactButton href="/contact" variant="outline-light">
                    {site.pages.contact.title}
                </ContactButton>
            </LinkBlock>
        </DesktopNav>
    );
}

function MobileNavBar() {
    // Variables
    let { pathname: activeNav } = useLocation();
    const LOGO_TOP = 100;
    const isHome = activeNav === "/" ? true : false;
    const initialNavState = isHome ? navHero : navBar;
    const [isOpen, setOpen] = useState(false);
    const [navMode, setNav] = useState(initialNavState);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Functions
    const handleToggle = event => (event ? setOpen(true) : setOpen(false));
    const handleNavClick = () => handleToggle(false);
    const handleBrandClick = () => isOpen && handleNavClick();
    const handleScroll = () =>
        window.scrollY !== 0 && setScrollPosition(window.scrollY);

    // Hooks
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        isHome && !isOpen && scrollPosition <= LOGO_TOP
            ? setNav(navHero)
            : setNav(navBar);
    }, [isHome, isOpen, scrollPosition]);

    // Render
    return (
        <MobileNav
            expand="false"
            expanded={isOpen}
            onToggle={handleToggle}
            {...navMode.mobile.navbar}>
            <LogoBlock {...navMode.mobile.logo}>
                <Logo.Typographic color={"white"} width={400} height={200} />
            </LogoBlock>
            <MobileHamburger visible={!navMode.mobile.navbar.itemsVisible}>
                <Hamburger
                    isOpen={isOpen}
                    colorOpen={theme.stSecondary}
                    colorClosed={theme.stWhite}
                />
            </MobileHamburger>
            <Navbar.Collapse>
                <MobileHamburgerItems
                    location={activeNav}
                    closeNav={handleNavClick}
                />
            </Navbar.Collapse>
            {!isOpen && (
                <MobileNavRow visible={navMode.mobile.navbar.itemsVisible}>
                    <MobileNavItems side="left" location={activeNav} />
                </MobileNavRow>
            )}
        </MobileNav>
    );
}

function NavBarEntry() {
    if (query.atMost("sm")) {
        return <MobileNavBar />;
    } else {
        return <DesktopNavBar />;
    }
}

export default NavBarEntry;
