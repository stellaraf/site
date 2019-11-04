import React, { Component } from "react";
import Hero from "components/pages/home/Hero";
import { SectionOne, NewSectionOne } from "components/pages/home/Sections";

class Home extends Component {
    render() {
        return (
            <>
                <Hero />
                {/* <SectionOne /> */}
                <NewSectionOne />
            </>
        );
    }
}

export default Home;
