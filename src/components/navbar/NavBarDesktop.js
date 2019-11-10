import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "components/svg/Logos";
import bp from "utils/breakpoints";
import site from "config";
import theme from "styles/exports.module.scss";

const NavItemGroup = styled.div`
    display: flex;
    flex: 1 0 0;
    align-items: center;
    pointer-events: auto;
    // justify-content: ${props => (props.side === "right" ? "flex-end" : "flex-start")};
    justify-content: center;
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
    background-color: transparent;
    transition: background-color 0.2s ease 50ms;

    &.home {
        background-color: ${theme.stPrimary};
    }

    &.sticky.home {
        background-color: ${theme.stPrimary};
    }
    &.sticky {
        background-color: ${theme.stDark};
    }

    ${bp.down("md")} {
        justify-content: flex-start !important;
        font-size: ${theme.fontSizeSm};
        align-items: flex-end !important;
    }
`;

const NavBarLogo = styled.div`
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
        border-top: 1px solid ${theme.stWhite};
        text-decoration: none;
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

export default function DesktopNavBar({ doScroll, pathName }) {
    const isHome = pathName === "/" ? true : false;
    // Render
    return (
        <NavWrapper>
            <DesktopNav
                id="navbar-d"
                className={
                    doScroll && !isHome
                        ? "sticky"
                        : doScroll && isHome
                        ? "sticky home"
                        : !doScroll && isHome
                        ? "home"
                        : null
                }>
                <NavItemGroup side="left">
                    <NavItems side="left" location={pathName} />
                </NavItemGroup>
                <NavBarLogo className={doScroll ? "logo in-nav" : "logo"}>
                    <Link to="/">
                        <Logo.Typographic color={"white"} width={160} height={160} />
                    </Link>
                </NavBarLogo>
                <NavItemGroup side="right">
                    <NavItems side="right" location={pathName} />
                    <ContactButton href="/contact" variant="outline-light">
                        {site.pages.contact.title}
                    </ContactButton>
                </NavItemGroup>
            </DesktopNav>
        </NavWrapper>
    );
}
