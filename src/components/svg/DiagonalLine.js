import React from "react";
import styled, { keyframes } from "styled-components";

/**
 *
 * @param {"leftUp|leftDown"} direction Shape direction
 * @param {string} offset Offset from base
 * @param {string} height Height of the angle
 * @param {string} color Color of line
 * @param {string} strokeWidth Width of the line
 * @param {string} viewBox Override underlying SVG viewBox
 */
function DiagonalLine({
    direction,
    side,
    offset,
    height = "5vh",
    color,
    strokeWidth,
    viewBox = "0 0 100 100",
    ...restProps
}) {
    const pointMap = {
        // Starting from the fat side
        leftDown: { x1: "-5", y1: "5", x2: "105", y2: "95" },
        leftUp: { x1: "-5", y1: "105", x2: "105", y2: "5" }
    };
    const shapePoints = pointMap[direction];

    let shapeOffset;
    let shapeSide;

    if (side === undefined) {
        switch (direction) {
            case "rightDown":
            case "leftDown":
                shapeSide = "top";
                break;
            case "rightUp":
            case "leftUp":
                shapeSide = "bottom";
                break;
            default:
                shapeSide = "bottom";
                break;
        }
    } else {
        shapeSide = side;
    }

    if (offset === undefined) {
        shapeOffset = `-${height}`;
    } else {
        shapeOffset = offset;
    }
    if (color === undefined) {
        color = "none";
    }
    const offsetStyle = `top: ${shapeOffset};`;

    const LineSVG = styled.svg`
        position: absolute;
        overflow: visible;
        width: 100%;
        height: ${height};
        ${offsetStyle}
    `;

    return (
        <LineSVG
            className={`${shapeSide}-line`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            preserveAspectRatio="none"
            {...restProps}>
            <line {...shapePoints} stroke={color} strokeWidth={strokeWidth} />
        </LineSVG>
    );
}

export default DiagonalLine;
