// Third Party Imports
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

// App Imports
import NavBar from "components/navbar";
import Footer from "components/footer";
import Overlay from "components/overlay";
import { Home, Cloud, Contact } from "components/pages";

// Styles
import styles from "components/overlay/styles.module.scss";
import theme from "styles/exports.module.scss";
import "styles/main.scss";

class App extends Component {
    render() {
        return (
            <Router>
                <Overlay>
                    <NavBar />
                    <main>
                        <Switch>
                            <Route path="/contact" component={Contact} />
                            <Route path="/cloud" component={Cloud} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </main>
                    <Footer />
                </Overlay>
            </Router>
        );
    }
}

export default App;
