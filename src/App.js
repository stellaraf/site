// Third Party Imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// App Imports
import asyncComponent from "components/AsyncComponent";
import NavBar from "components/navbar";
import Footer from "components/footer";
import GlobalStyle from "components/styled/global";
import ScrollToTopOnMount from "hooks/ScrollToTopOnMount";

// Styles
import "styles/main.scss";

// Async Imports
const Home = asyncComponent(() => import("components/pages/home"));
const Cloud = asyncComponent(() => import("components/pages/cloud"));
const Contact = asyncComponent(() => import("components/pages/contact"));
const Services = asyncComponent(() => import("components/pages/services"));
const About = asyncComponent(() => import("components/pages/about"));
const Consulting = asyncComponent(() => import("components/pages/consulting"));
const Stars = asyncComponent(() => import("components/stars/particles"));
const NotFound = asyncComponent(() => import("components/pages/notfound"));

class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <ScrollToTopOnMount />
                <GlobalStyle />
                <NavBar />
                <main>
                    <Switch>
                        <Route exact props={this.props} path="/consulting" component={Consulting} />
                        <Route exact props={this.props} path="/services" component={Services} />
                        <Route exact props={this.props} path="/contact" component={Contact} />
                        <Route exact props={this.props} path="/about" component={About} />
                        <Route exact props={this.props} path="/cloud" component={Cloud} />
                        <Route exact props={this.props} path="/" component={Home} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </main>
                <Footer />
                <Stars />
            </Router>
        );
    }
}

export default App;
