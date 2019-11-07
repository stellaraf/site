import React from "react";
import styled from "styled-components";

const MenuWrapper = styled(({ width, height, visible, ...props }) => (
    <div {...props} />
))`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    ${props => (props.visible ? null : "display: none")};
    position: relative;
    z-index: 3 !important;
`;
const BaseLine = styled.span`
    display: block;
    height: ${props => props.lineSize}px;
    width: 100%;
    background-color: ${props => props.lineColor};
    transition-timing-function: ease;
    transition-duration: ${props => props.animationDuration}s;
    transform-origin: center;
    position: absolute;
    margin-top: -${props => Math.round(props.lineSize / 2)};
`;

const Line = {
    Edge: styled(BaseLine)`
        transform: ${props => props.transform};
    `,
    Middle: styled(BaseLine)`
        transition-timing-function: ease-out;
        transition-duration: ${props => props.animationDuration / 4}s;
        opacity: ${props => props.opacity};
        top: ${props => props.distanceTop}px;
    `
};

function Hamburger({
    isOpen = false,
    visible = true,
    hidden,
    width = 40,
    height = 30,
    lineSize = 2,
    colorClosed = "#ffffff",
    colorOpen = "#ff0000",
    animationDuration = 0.4,
    id = "nav-hb",
    as
}) {
    const color = isOpen ? colorOpen : colorClosed;
    const halfHeight = Math.round(height / 2);
    let isVisible = visible;
    if (hidden !== undefined) {
        isVisible = !visible;
    }
    let WrappingComponent;
    if (as !== undefined) {
        WrappingComponent = as;
    } else {
        WrappingComponent = MenuWrapper;
    }
    const getTransformValue = (basePos, rotate) => {
        const height = isOpen ? `${halfHeight}px` : `${basePos}px`;
        const rotation = isOpen ? `${rotate}deg` : "0";
        return `translate3d(0,${height},0) rotate(${rotation})`;
    };
    const baseLineProps = {
        lineSize: lineSize,
        lineColor: color,
        animationDuration: animationDuration
    };
    return (
        <WrappingComponent
            visible={isVisible}
            width={height}
            height={width}
            id={id}>
            <Line.Edge
                transform={getTransformValue("0", "45")}
                {...baseLineProps}
            />
            <Line.Middle
                animationDuration={animationDuration}
                opacity={isOpen ? 0 : 1}
                distanceTop={halfHeight}
                {...baseLineProps}
            />
            <Line.Edge
                transform={getTransformValue(height, "-45")}
                {...baseLineProps}
            />
        </WrappingComponent>
    );
}
export default Hamburger;
