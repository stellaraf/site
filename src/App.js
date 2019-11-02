// Third Party Imports
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom";

// App Imports
import asyncComponent from "components/AsyncComponent";
import NavBar from "components/navbar";
import Footer from "components/footer";
import Overlay from "components/overlay";

// Styles
import "styles/main.scss";
// import { Home, Cloud, Contact } from "components/pages";

// Async Imports
const Home = asyncComponent(() => import("components/pages/home"));
const Cloud = asyncComponent(() => import("components/pages/cloud"));
const Contact = asyncComponent(() => import("components/pages/contact"));

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App({ childProps }) {
    return (
        <Router>
            <ScrollToTop />
            <Overlay>
                <NavBar />
                <main>
                    <Switch>
                        <Route
                            exact
                            props={childProps}
                            path="/contact"
                            component={Contact}
                        />
                        <Route
                            exact
                            props={childProps}
                            path="/cloud"
                            component={Cloud}
                        />
                        <Route
                            exact
                            props={childProps}
                            path="/"
                            component={Home}
                        />
                    </Switch>
                </main>
            </Overlay>
            <Footer />
        </Router>
    );
}

export default App;
