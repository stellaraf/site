import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Hero from "components/pages/home/Hero";
import { Sections } from "components/pages/home/Sections";
import site from "config";

class Home extends Component {
    constructor(props) {
        super(props);
        this.sectionsRef = React.createRef();
        this.scrollToSections = this.scrollToSections.bind(this);
    }
    scrollToSections() {
        this.sectionsRef.current.scrollIntoView({
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
                    <title>Stellar</title>
                    <link rel="canonical" href="https://stellar.tech/" />
                    <meta name="keywords" content={site.pages.home.tags} />
                    <meta name="robots" content="index,follow" />
                </Helmet>
                <Hero scrollToSections={this.scrollToSections} />
                <Sections styledRef={this.sectionsRef} />
            </>
        );
    }
}

export default Home;
