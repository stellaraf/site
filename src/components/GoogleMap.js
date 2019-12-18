import React from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import theme from "styles/exports.module.scss";
import useDarkMode from "use-dark-mode";
import useApple from "hooks/useApple";

// import { FaMapMarkerAlt } from "react-icons/fa";
// import { Popover } from "react-bootstrap";

// const StyledLocPopup = styled(Popover)`
//     && {
//         z-index: 100;
//         background-color: ${theme.contentCardBackground};
//         color: ${theme.stWhite};
//         max-width: 200px;
//         width: 200px;
//         & .arrow {
//             ::after {
//                 ${props => `border-${props.placement}-color: ${theme.contentCardBackground};`}
//             }
//         }

//         & .popover-header[class] {
//             background-color: ${theme.contentCardBackground};
//             font-size: ${theme.fontSizeBase};
//             font-weight: ${theme.fontWeightBold};
//             width: 200px;
//             border-bottom: unset;
//             ::before {
//                 border-bottom: 1px solid ${theme.contentCardBackground};
//             }
//         }

//         & .popover-body[class] {
//             white-space: pre;
//             font-size: ${theme.fontSizeSm};
//             font-weight: ${theme.fontWeightLight};
//             width: 200px;
//             & .loc-subtitle {
//                 color: ${theme.stGray};
//             }
//             pointer-events: auto;
//         }
//     }
// `;
// export default function({
//     center = { lat: 33.4572873, lng: -111.9881193 },
//     zoom = 11.36,
//     title = "Placeholder Title",
//     text = "Placeholder Text",
//     latitude = 0,
//     longitude = 0,
//     height = "50vh",
//     width = "100%",
//     color = "#ffffff"
// }) {
//     return (
//         <div style={{ height: height, width: width }} id="location-map">
//             <GoogleMapReact bootstrapURLKeys={{}} defaultCenter={center} defaultZoom={zoom}>
//                 <div
//                     style={{ position: "relative" }}
//                     lat={latitude}
//                     lng={longitude}
//                     id="marker-parent"
//                 >
//                     <div
//                         style={{ position: "absolute", top: -32, left: -16, height: 32, width: 32 }}
//                         id="marker-container"
//                     >
//                         <FaMapMarkerAlt size={32} color={color} id="marker-icon" />
//                     </div>
//                     <StyledLocPopup
//                         style={{ position: "absolute", top: 12, left: -16 }}
//                         id="location-popover"
//                         placement="bottom"
//                     >
//                         <Popover.Title as="h3">{title}</Popover.Title>
//                         <Popover.Content>{text}</Popover.Content>
//                     </StyledLocPopup>
//                 </div>
//             </GoogleMapReact>
//         </div>
//     );
// }

const mapThemeDark = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
    }
];

const infoWindowHtml = (title, text, url) =>
    `<div id="map-info-content"><h4>${title}</h4>
    <a href="${url}" target="blank">${text}</a></div>`;

const mapOptions = mode => {
    let options = {};
    mode && (options = { styles: mapThemeDark });
    return options;
};

const mapUrl = (isApple, addr) => {
    const addrfmt = encodeURI(addr.replace(/\n/g, ", "));
    return `${isApple ? "maps" : "https"}://maps.google.com/maps/search/?api=1&query=${addrfmt}`;
};

const MapContainer = styled.div`
    & {
        height: ${props => props.height};
        width: ${props => props.width};
        & #map-info-content {
            padding-left: 0px;
            padding-top: 0px;
            padding-right: 12px;
            padding-bottom: 12px;
            width: 200px;
            text-align: left;
        }
        & #map-info-content h4 {
            color: ${theme.stDark};
        }
        & #map-info-content a {
            color: ${theme.stDark};
            white-space: pre;
            margin-bottom: 0;
        }
    }
`;
export default function({
    center = { lat: 33.4572873, lng: -111.9881193 },
    zoom = 11.36,
    title = "Placeholder Title",
    text = "Placeholder Text",
    latitude = 0,
    longitude = 0,
    height = "50vh",
    width = "100%"
}) {
    const { value: darkMode } = useDarkMode();
    const isApple = useApple();
    const locUrl = mapUrl(isApple, text);
    const apiIsLoaded = (map, maps) => {
        const marker = new maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map
        });
        const infoWindow = new maps.InfoWindow({
            content: infoWindowHtml(title, text, locUrl)
        });
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    };

    return (
        <MapContainer id="location-map" height={height} width={width}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GMAPS_API_KEY || "",
                    language: "en",
                    region: "us"
                }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                options={() => mapOptions(darkMode)}
            />
        </MapContainer>
    );
}
