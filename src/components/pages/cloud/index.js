import React from "react";
import { Helmet } from "react-helmet";
import { SectionOne, InfoSections, TitleBlock } from "components/pages/cloud/Sections";
import NextSection from "components/next";
import site from "config";

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
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Orion: The Enterprise Native Cloud</title>
                    <link rel="canonical" href="https://stellar.tech/cloud" />
                    <meta name="keywords" content={site.pages.cloud.tags} />
                    <meta name="robots" content="index,follow" />
                </Helmet>
                <TitleBlock />
                <SectionOne scrollToSections={() => this.scrollToRef(this.refOne)} />
                <InfoSections refOne={this.refOne} />
                <NextSection directionBottom="leftUp" directionTop="rightDown" />
            </>
        );
    }
}
export default Cloud;
