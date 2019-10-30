import React, { Component } from "react";
import { Container } from "react-bootstrap";
import land50m from "components/pages/cloud/land50m";
import land110m from "components/pages/cloud/land110m";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Sphere
} from "react-simple-maps";

import { geoOrthographic } from "d3-geo";
import { FiMapPin } from "react-icons/fi";
import styles from "components/pages/cloud/styles.module.scss";
import theme from "styles/exports.module.scss";

const markers = [
    {
        offsetY: -7,
        offsetX: 0,
        textPosition: "right",
        name: "Phoenix, AZ",
        coordinates: [-111.976438, 33.454463]
    },
    {
        offsetY: -7,
        offsetX: 0,
        textPosition: "left",
        name: "Dayton, OH",
        coordinates: [-84.236538, 39.591382]
    },
    {
        offsetY: -7,
        offsetX: 0,
        textPosition: "right",
        name: "Honolulu, HI",
        coordinates: [-157.918397, 21.335161]
    }
];

function buildGlobe() {
    return geoOrthographic()
        .rotate([110, -30, -10])
        .scale(300);
}

function globeSize(newWidth) {
    // const breakpoints = {
    //     sm: 576,
    //     md: 768,
    //     lg: 992,
    //     xl: 1200
    // };
    // const widths = {
    //     sm: breakpoints.sm * 0.8,
    //     md: breakpoints.md * 0.8,
    //     lg: breakpoints.lg * 0.85,
    //     xl: breakpoints.xl * 0.9
    // };
    // return viewPortSize * 0.8;
    return (600 / 800) * newWidth;
}

class Globe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewBoxSize: `0 0 954 954`,
            containerDimensions: { width: null, height: null }
        };
        this.componentDidMount = () => {
            const parentDimensions = {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight
            };
            this.setState({
                viewBoxSize: `0 0 ${parentDimensions.width} ${parentDimensions.width}`,
                containerDimensions: {
                    width: parentDimensions.width,
                    height: globeSize(parentDimensions.width)
                }
            });
        };
    }
    render() {
        return (
            <Container
                ref={el => (this.container = el)}
                className={styles.GlobeContainer}>
                <ComposableMap
                    className={styles.GlobeSvg}
                    projection={buildGlobe()}
                    viewBox={"0 0 954 954"}
                    preserveAspectRatio="xMinYMin meet">
                    <Sphere stroke={theme.globeStroke} />
                    <Geographies geography={land110m}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={theme.mapFill}
                                    stroke={theme.mapStroke}
                                />
                            ))
                        }
                    </Geographies>
                    {markers.map(
                        ({
                            name,
                            coordinates,
                            offsetY,
                            offsetX,
                            textPosition
                        }) => (
                            <Marker key={name} coordinates={coordinates}>
                                <FiMapPin color={theme.stDanger} size={16} />
                                {/* <circle
                                    r={2}
                                    fill="#ff1166"
                                    stroke="#000"
                                    strokeWidth={0.5}
                                /> */}
                                <text
                                    textAnchor={textPosition}
                                    x={offsetX}
                                    y={offsetY}
                                    style={{
                                        fill: theme.mapText,
                                        fontSize: "0.5rem"
                                    }}>
                                    {name}
                                </text>
                            </Marker>
                        )
                    )}
                </ComposableMap>
            </Container>
        );
    }
}

export default Globe;
