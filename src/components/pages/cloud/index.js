import React from "react";
import {
    SectionOne,
    // eslint-disable-next-line
    InfoSections,
    TitleBlock
} from "components/pages/cloud/Sections";
import NextSection from "components/next";

class Cloud extends React.Component {
    constructor(props) {
        super(props);
        this.refOne = React.createRef();
        this.scrollToRef = this.scrollToRef.bind(this);
    }
    scrollToRef(refName) {
        this[refName].current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });
    }
    render() {
        return (
            <>
                <TitleBlock />
                <SectionOne scrollToSections={() => this.scrollToRef(this.refOne)} />
                <InfoSections refOne={this.refOne} />
                <NextSection directionBottom="leftUp" directionTop="rightDown" />
            </>
        );
    }
}
export default Cloud;
