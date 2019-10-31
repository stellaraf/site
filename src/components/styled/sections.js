import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled from "styled-components";
import theme from "styles/exports.module.scss";
import Map from "components/pages/cloud/Map";

const svgString = encodeURIComponent(renderToStaticMarkup(<Map />));
const dataUri = `url("data:image/svg+xml,${svgString}")`;

const MapContainer = styled.div`
    /* background: ${dataUri}; */
    height: 100%;
    // background-image: url(/assets/tempmap.svg);
    background-repeat: no-repeat;
    background-position-y: 0%;
    background-position-x: 50%;
    background-size: contain;
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (max-width: ${theme.breakLg}) {
        max-width: none;
        background-size: 300%;
        background-position-y: 0%;
        background-position-x: 15%;
        display: block;
        flex: none;
        flex-direction: none;
        margin-top: 0;
    }
    @media (min-width: ${theme.breakSm}) {
        // max-width: ${theme.containerMaxWidthSm};
    }
    @media (min-width: ${theme.breakMd}) {
        // max-width: ${theme.containerMaxWidthMd};
        // padding-left: 2%;
        // padding-right: 2%;
    }
    @media (min-width: ${theme.breakLg}) {
        // max-width: ${theme.containerMaxWidthLg};
        // padding-left: 5%;
        // padding-right: 5%;
    }
    @media (min-width: ${theme.breakXl}) {
        // max-width: ${theme.containerMaxWidthXl};
        // padding-left: 10%;
        // padding-right: 10%;
    }
`;

const HeroContainer = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: ${theme.breakSm}) {
        max-width: ${theme.containerMaxWidthSm};
    }
    @media (min-width: ${theme.breakMd}) {
        max-width: ${theme.containerMaxWidthMd};
    }
    @media (min-width: ${theme.breakLg}) {
        max-width: ${theme.containerMaxWidthLg};
    }
    @media (min-width: ${theme.breakXl}) {
        max-width: ${theme.containerMaxWidthXl};
    }
`;

const HeroSection = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    align-self: center;
    margin-top: 3rem;
    margin-bottom: 4rem;
    padding-right: 15px;
    padding-left: 15px;
    @media (max-width: ${theme.breakLg}) {
        max-width: none;
        margin-top: 0;
    }
    @media (min-width: ${theme.breakSm}) {
        // max-width: ${theme.containerMaxWidthSm};
        height: 100vh;
    }
    @media (min-width: ${theme.breakMd}) {
        // max-width: ${theme.containerMaxWidthMd};
        height: 80vh;
    }
    @media (min-width: ${theme.breakLg}) {
        // max-width: ${theme.containerMaxWidthLg};
        height: 50vh;
    }
    @media (min-width: ${theme.breakXl}) {
        max-width: ${theme.containerMaxWidthXl};
    }
`;

export { HeroContainer, HeroSection, MapContainer };
