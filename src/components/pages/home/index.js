import React, { Component } from "react";
import Hero from "components/pages/home/Hero";
import { NewSectionOne } from "components/pages/home/Sections";

class Home extends Component {
    render() {
        return (
            <>
                <Hero />
                <NewSectionOne />
            </>
        );
    }
}

export default Home;
