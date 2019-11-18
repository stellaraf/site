import React, { Component } from "react";
import Hero from "components/pages/home/Hero";
import { Sections } from "components/pages/home/Sections";

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
                <Hero scrollToSections={this.scrollToSections} />
                <Sections styledRef={this.sectionsRef} />
            </>
        );
    }
}

export default Home;
