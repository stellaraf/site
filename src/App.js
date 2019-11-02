// Third Party Imports
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom";
// import styled from "styled-components";

// App Imports
import NavBar from "components/navbar";
import Footer from "components/footer";
import Overlay from "components/overlay";
import { Home, Cloud, Contact, Docs } from "components/pages";

// Styles
import "styles/main.scss";

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Overlay>
                <NavBar />
                <main>
                    <Switch>
                        <Route path="/docs" component={Docs} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/cloud" component={Cloud} />
                        <Route path="/" component={Home} />
                    </Switch>
                </main>
            </Overlay>
            <Footer />
        </Router>
    );
}

export default App;
