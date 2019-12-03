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
import { TwitterMeta, OpenGraphMeta } from "utils/helmetHelpers";

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
                    <meta charSet="utf-8" />
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
                                <Helmet>
                                    <title>{site.pages.consulting.title}</title>
                                    <link rel="canonical" href="https://stellar.tech/consulting" />
                                    <meta name="keywords" content={site.pages.consulting.tags} />
                                </Helmet>
                                <TwitterMeta page="consulting" />
                                <OpenGraphMeta page="consulting" />
                                <Consulting />
                            </Route>
                            <Route path="/services">
                                <Helmet>
                                    <title>{site.pages.services.title}</title>
                                    <link rel="canonical" href="https://stellar.tech/services" />
                                    <meta name="keywords" content={site.pages.services.tags} />
                                </Helmet>
                                <TwitterMeta page="services" />
                                <OpenGraphMeta page="services" />
                                <Services />
                            </Route>
                            <Route path="/contact">
                                <Helmet>
                                    <title>Contact Stellar</title>
                                    <link rel="canonical" href="https://stellar.tech/contact" />
                                    <meta name="keywords" content={site.pages.contact.tags} />
                                </Helmet>
                                <TwitterMeta page="contact" />
                                <OpenGraphMeta page="contact" />
                                <Contact />
                            </Route>
                            <Route path="/about">
                                <Helmet>
                                    <title>{site.pages.about.title}</title>
                                    <link rel="canonical" href="https://stellar.tech/about" />
                                    <meta name="keywords" content={site.pages.about.tags} />
                                </Helmet>
                                <TwitterMeta page="about" />
                                <OpenGraphMeta page="about" />
                                <About />
                            </Route>
                            <Route path="/cloud">
                                <Helmet>
                                    <title>Orion: The Enterprise Native Cloud</title>
                                    <link rel="canonical" href="https://stellar.tech/cloud" />
                                    <meta name="keywords" content={site.pages.cloud.tags} />
                                </Helmet>
                                <TwitterMeta page="cloud" />
                                <OpenGraphMeta page="cloud" />
                                <Cloud />
                            </Route>
                            <Route path="/">
                                <Helmet>
                                    <title>Stellar</title>
                                    <meta name="keywords" content={site.pages.home.tags} />
                                    <meta name="twitter:card" content="summary_large_image" />
                                    <meta name="twitter:site" content="@StellarTechInc" />
                                    <meta name="twitter:title" content="Stellar" />
                                    <meta
                                        name="twitter:description"
                                        content="Fueling your digital velocity"
                                    />
                                    <meta name="twitter:image" content="/opengraph.png" />
                                    <meta name="og:title" content="Stellar" />
                                    <meta
                                        name="og:description"
                                        content="Fueling your digital velocity"
                                    />
                                    <meta name="og:url" content="https://stellar.tech/" />
                                    <meta
                                        name="og:image"
                                        content="https://stellar.tech/opengraph.png"
                                    />
                                </Helmet>
                                <Home />
                            </Route>
                            <Route path="*" component={NotFound} />
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
