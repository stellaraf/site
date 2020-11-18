import React from "react";
import styled from "styled-components";
import { MeteorShower } from "components/stars/universe/meteor-shower";
import * as basicScroll from "components/stars/universe/basicScroll";
import buildCoords from "components/stars/universe/random-coords";
import { TwinkleStars } from "components/stars/universe/twinkle-stars";
import site from "config";

function calcStars() {
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    const winHighest = Math.max(winWidth, winHeight);
    return ~~(winHighest / site.stars.factor);
}

const numStars = calcStars();

// const Layout = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     z-index: -1;

//     pointer-events: none;
// `;

const Layout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    max-height: 35vh;

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
                    // height="100%"
                    height="45vh"
                    preserveAspectRatio="xMinYMin slice">
                    <TwinkleStars
                        stars={buildCoords(numStars)}
                        debug={this.state.debug}
                    />
                    <MeteorShower debug={this.state.debug} />
                </svg>
            </Layout>
        );
    }
}
export default Universe;
