import React, { Component } from "react";
import Navigation from "components/navbar";
import Footer from "components/footer";
import { Hero, Overlay, SectionOne } from "components/home";
import "styles/main.scss";

class App extends Component {
  render() {
    return (
      <>
        <Overlay style={{ backgroundColor: "#202840" }}>
          <Navigation />
          <main>
            <Hero />
            <SectionOne />
          </main>
        </Overlay>
        <Footer />
      </>
    );
  }
}

export default App;
