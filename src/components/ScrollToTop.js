import React from "react";
import { Button } from "react-bootstrap";
import { FiChevronUp } from "react-icons/fi";
import styled from "styled-components";
import theme from "styles/exports.module.scss";
import { useWindowScroll } from "react-use";

const ScrollButton = styled(Button)`
    position: fixed;
    bottom: 25px;
    right: 25px;
    display: none;
    visibility: hidden;
    opacity: 0;
    &[class] {
        background-color: transparent;
        border: 1px solid ${theme.navLinkColor};

        :hover,
        :not(:disabled):not(.disabled):active {
            background-color: ${theme.stSecondary};
            color: ${theme.stDark};
        }
    }
    &.visible[class] {
        display: block;
        visibility: visible;
        opacity: 1;
        transition: opacity 100ms ease;
    }
`;

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.document.activeElement.blur();
};

export default function() {
    const { y } = useWindowScroll();
    const [visible, setVisibility] = React.useState(false);
    React.useEffect(() => {
        y > 120 && setVisibility(true);
        y < 120 && visible && setVisibility(false);
    }, [visible, y]);
    return (
        <ScrollButton
            className={visible ? "visible" : null}
            href="#"
            size="lg"
            onClick={scrollToTop}>
            <FiChevronUp />
        </ScrollButton>
    );
}
