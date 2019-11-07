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
const NotFound = asyncComponent(() => import("components/pages/notfound"));

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
                        location={{
                            pathname: "/contact",
                            state: { heroLogo: true }
                        }}
                    />
                    <Route
                        exact
                        props={childProps}
                        path="/cloud"
                        location={{
                            pathname: "/cloud",
                            state: { heroLogo: false }
                        }}
                        component={Cloud}
                    />
                    <Route
                        exact
                        props={childProps}
                        path="/"
                        component={Home}
                        location={{
                            pathname: "/",
                            state: { heroLogo: true }
                        }}
                    />
                    <Route path="*" component={NotFound} />
                </Switch>
            </main>
            <Footer />
            <Stars />
        </Router>
    );
}

export default App;
