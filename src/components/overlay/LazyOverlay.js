import React from "react";
import styled from "styled-components";
const LazyLayout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: transparent;

    pointer-events: none;
`;

function LazyOverlay(props) {
    const myRef = React.createRef();
    return (
        <>
            <LazyLayout ref={myRef} />
            {props.children}
        </>
    );
}
export default LazyOverlay;
