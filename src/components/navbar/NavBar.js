import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWindowScroll, useLockBodyScroll } from "react-use";
import DesktopNav from "components/navbar/NavBarDesktop";
import MobileNav from "components/navbar/NavBarMobile";
import { query } from "utils/breakpoints";
import site from "config";

export default function NavBarEntry() {
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
            <MobileNav
                navOpen={isOpen}
                setNavOpen={setOpen}
                pathName={pathName}
                doScroll={readyToScroll}
            />
        );
    } else {
        return <DesktopNav doScroll={readyToScroll} pathName={pathName} />;
    }
}
