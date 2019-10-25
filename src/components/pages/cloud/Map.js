import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
    {
        offsetY: -5,
        offsetX: 55,
        textPosition: "middle",
        name: "Phoenix, AZ",
        coordinates: [-111.976438, 33.454463]
    },
    {
        offsetY: -5,
        offsetX: -55,
        textPosition: "middle",
        name: "Dayton, OH",
        coordinates: [-84.236538, 39.591382]
    },
    {
        offsetY: -5,
        offsetX: 12,
        textPosition: "right",
        name: "Honolulu, HI",
        coordinates: [-157.918397, 21.335161]
    }
];

const MapChart = () => {
    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [115, -45, -5],
                scale: 400 //400
            }}>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies
                        .filter(d => d.properties.REGION_UN === "Americas")
                        .map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#EAEAEC"
                                stroke="#D6D6DA"
                            />
                        ))
                }
            </Geographies>
            {markers.map(
                ({ name, coordinates, offsetY, offsetX, textPosition }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <circle
                            r={4}
                            fill="#ff1166"
                            stroke="#000"
                            strokeWidth={0.5}
                        />
                        <text
                            textAnchor={textPosition}
                            x={offsetX}
                            y={offsetY}
                            style={{
                                fontFamily: "system-ui",
                                fill: "#5D5A6D",
                                fontSize: "0.75rem"
                            }}>
                            {name}
                        </text>
                    </Marker>
                )
            )}
        </ComposableMap>
    );
};

export default MapChart;
