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

// Styles
import "styles/main.scss";

// Async Imports
const Home = asyncComponent(() => import("components/pages/home"));
const Cloud = asyncComponent(() => import("components/pages/cloud"));
const Contact = asyncComponent(() => import("components/pages/contact"));
const Stars = asyncComponent(() => import("components/stars/particles"));

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
                    <Route exact props={childProps} path="/" component={Home} />
                </Switch>
            </main>
            <Footer />
            <Stars />
        </Router>
    );
}

export default App;
