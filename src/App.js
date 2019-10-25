// Third Party Imports
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// App Imports
import NavBar from "components/navbar";
import Footer from "components/footer";
import Overlay from "components/overlay";
import { Home, Cloud } from "components/pages";

// Styles
import "styles/main.scss";

class App extends Component {
    render() {
        return (
            <Router>
                <Overlay>
                    <NavBar />
                    <main>
                        <Switch>
                            <Route path="/cloud">
                                <Cloud />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </main>
                </Overlay>
                <Footer />
            </Router>
        );
    }
}

export default App;
