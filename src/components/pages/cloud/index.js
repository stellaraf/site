import React from "react";
import {
    SectionOne,
    // eslint-disable-next-line
    InfoSections,
    TitleBlock
} from "components/pages/cloud/Sections";
import NextSection from "components/next";

function Cloud() {
    return (
        <>
            <TitleBlock />
            <SectionOne />
            <InfoSections />
            <NextSection directionBottom="leftUp" directionTop="rightDown" />
        </>
    );
}
export default Cloud;
