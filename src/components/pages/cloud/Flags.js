import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled from "styled-components";
import {
    Arizona,
    California,
    Chicago,
    Georgia,
    Hawaii,
    Portland
} from "components/svg/flags";

function Flag({ name }) {
    const flagMap = {
        phx01: <Arizona />,
        sac01: <California />,
        chi01: <Chicago />,
        atl01: <Georgia />,
        hnl01: <Hawaii />,
        pdx01: <Portland />
    };
    const thisFlag = flagMap[name];
    const svgString = encodeURIComponent(renderToStaticMarkup(thisFlag));
    const dataUri = `url("data:image/svg+xml,${svgString}")`;
    const FlagContainer = styled.div`
        display: block;
        margin-left: auto;
        border-radius: 50%;
        background-image: ${dataUri};
        background-position: 50%;
        background-repeat: no-repeat;
        height: 60px;
        width: 60px;
    `;
    return <FlagContainer />;
}

export default Flag;
