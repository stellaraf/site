import React from "react";
import styled from "styled-components";

import { STAR_COORDS } from "components/stars/universe/star-coords";
import { MeteorShower } from "components/stars/universe/meteor-shower";
import { TwinkleStars } from "components/stars/universe/twinkle-stars";
import * as basicScroll from "components/stars/universe/basicScroll";

// import { STAR_COORDS } from "./star-coords";
// import styled from "styled-components";
// import { MeteorShower } from "./meteor-shower";
// import { TwinkleStars } from "./twinkle-stars";
// import * as basicScroll from "./basicScroll";

const Layout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    pointer-events: none;
`;

class Universe extends React.Component {
    baseScrollInstance = null;

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            debug: false
        };
    }
    componentWillUnmount() {
        this.baseScrollInstance.destroy();
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    componentDidMount() {
        const totalHeight = document.documentElement.scrollHeight;

        this.baseScrollInstance = basicScroll.create({
            elem: this.myRef.current,
            from: 0,
            to: totalHeight,
            props: {
                "--translateScrollY": {
                    from: 0,
                    to: 1
                }
            }
        });

        this.baseScrollInstance.start();
        document.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.altKey && event.keyCode === 68) {
            this.setState({
                debug: !this.state.debug
            });
            event.preventDefault();
        }
    }
    render() {
        return (
            <Layout
                onKeyDown={this.keyDown}
                onKeyUp={this.keyUp}
                ref={this.myRef}>
                <svg
                    viewBox="0 0 2000 1000"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMinYMin slice">
                    <TwinkleStars
                        stars={STAR_COORDS.slice(0, 20)}
                        debug={this.state.debug}
                    />
                    <MeteorShower debug={this.state.debug} />
                </svg>
            </Layout>
        );
    }
}
export default Universe;
