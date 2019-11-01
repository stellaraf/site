import React from "react";
import styled from "styled-components";

/**
 *
 * @param {"leftUp|leftDown|rightUp|rightDown"} direction Shape direction
 * @param {string} offset Offset from base
 * @param {string} height Height of the angle
 * @param {string} startColor Color closest to the object you are extending
 * @param {string} nextColor Color of the next object
 * @param {string} viewBox Override underlying SVG viewBox
 */
function Diagonal({
    direction,
    side,
    offset,
    height = "5vh",
    color,
    viewBox = "0 0 100 100",
    ...restProps
}) {
    const getOffsetSyle = (side, offset) => `${side}: ${offset};`;
    const pointMap = {
        // Starting from the fat side
        rightUp: "100 0, 100 100, 0 0",
        rightDown: "100 0, 100 100, 0 100",
        leftDown: "0 0, 0 100, 100 100",
        leftUp: "0 0, 0 100, 100 0"
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
    const offsetStyle = getOffsetSyle(shapeSide, shapeOffset);

    const Triangle = styled.svg`
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: ${height};
        ${offsetStyle}
    `;
    return (
        <Triangle
            className={`${shapeSide}-angle`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            preserveAspectRatio="none"
            {...restProps}>
            <polygon
                fill={color}
                stroke={color}
                strokeWidth="2"
                points={shapePoints}
            />
        </Triangle>
    );
}

export default Diagonal;
