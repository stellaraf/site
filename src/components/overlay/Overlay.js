import React from "react";
import styled from "styled-components";
import Universe from "components/stars";

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

// function LazyOverlay(props) {
//     const myRef = React.createRef();
//     return (
//         <>
//             <LazyLayout ref={myRef}>
//                 <svg
//                     viewBox="0 0 2000 1000"
//                     width="100%"
//                     height="100%"
//                     preserveAspectRatio="xMinYMin slice">
//                     <g></g>
//                 </svg>
//             </LazyLayout>
//             {props.children}
//         </>
//     );
// }

function Overlay(props) {
    return (
        <>
            <Universe />
            {props.children}
        </>
    );
}

export default Overlay;
