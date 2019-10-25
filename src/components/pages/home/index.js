import React, { Component } from "react";
import Hero from "components/pages/home/Hero";
import { SectionOne } from "components/pages/home/Sections";

class Home extends Component {
    render() {
        return (
            <>
                <Hero />
                <SectionOne />
            </>
        );
    }
}

export default Home;
