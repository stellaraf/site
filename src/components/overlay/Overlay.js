import React from "react";
import Universe from "components/stars";

function Overlay(props) {
    return (
        <>
            <Universe />
            {props.children}
        </>
    );
}

export default Overlay;
