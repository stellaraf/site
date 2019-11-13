import React from "react";
import PageTitle from "hooks/PageTitle";
import { SectionOne, InfoSections, TitleBlock } from "components/pages/cloud/Sections";
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
                <PageTitle page="Orion: The Enterprise Native Cloud Platform from Stellar" />
                <TitleBlock />
                <SectionOne scrollToSections={() => this.scrollToRef(this.refOne)} />
                <InfoSections refOne={this.refOne} />
                <NextSection directionBottom="leftUp" directionTop="rightDown" />
            </>
        );
    }
}
export default Cloud;
