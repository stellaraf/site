// Third Party Imports
import React, { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Route, Switch } from "wouter";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import smoothscroll from "smoothscroll-polyfill";

// App Imports
import site from "config";
import SuspensePage from "components/pages/SuspensePage";
import NavBar from "components/navbar";
import Footer from "components/footer";
import GlobalStyle from "components/styled/global";
import ScrollToTopOnMount from "hooks/ScrollToTopOnMount";
import ScrollToTop from "components/ScrollToTop";
import MetaTags from "utils/helmetHelpers";

// Styles
import "styles/main.scss";

// Async Imports
const Home = lazy(() => import("components/pages/home"));
const Cloud = lazy(() => import("components/pages/cloud"));
const Contact = lazy(() => import("components/pages/contact"));
const Services = lazy(() => import("components/pages/services"));
const About = lazy(() => import("components/pages/about"));
const Consulting = lazy(() => import("components/pages/consulting"));
const Stars = lazy(() => import("components/stars/particles"));
const NotFound = lazy(() => import("components/pages/NotFound"));

ReactGA.initialize("UA-152723479-1");
smoothscroll.polyfill();

class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        ReactGA.pageview(window.location.pathname + window.location.search);
        return (
            <React.Fragment>
                <Helmet>
                    <title>{site.global.givenName}</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content={site.global.description} />
                    <link rel="canonical" href="https://stellar.tech/" />
                    <meta
                        name="rights"
                        content={`Copyright © ${new Date().getFullYear()} Stellar Technologies Inc.`}
                    />
                </Helmet>
                <ScrollToTopOnMount />
                <GlobalStyle />
                <Suspense fallback={<SuspensePage />}>
                    <NavBar />
                    <main>
                        <Switch>
                            <Route path="/consulting">
                                <MetaTags page="consulting" />
                                <Consulting />
                            </Route>
                            <Route path="/services">
                                <MetaTags page="services" />
                                <Services />
                            </Route>
                            <Route path="/contact">
                                <Helmet>
                                    <title>Contact Stellar</title>
                                </Helmet>
                                <MetaTags page="contact" />
                                <Contact />
                            </Route>
                            <Route path="/about">
                                <MetaTags page="about" />
                                <About />
                            </Route>
                            <Route path="/cloud">
                                <MetaTags page="cloud" />
                                <Helmet>
                                    <title>{`Orion: The Enterprise Native Cloud | ${site.global.shortName}`}</title>
                                </Helmet>
                                <Cloud />
                            </Route>
                            <Route path="/">
                                <MetaTags page="home" />
                                <Helmet>
                                    <title>{site.pages.home.title}</title>
                                </Helmet>
                                <Home />
                            </Route>
                            <Route path="/:rest*" component={NotFound} />
                        </Switch>
                    </main>
                    <ScrollToTop />
                    <Footer />
                    <Stars />
                </Suspense>
            </React.Fragment>
        );
    }
}

export default App;
