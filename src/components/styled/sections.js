import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled from "styled-components";
import theme from "styles/exports.module.scss";
import Map from "components/pages/cloud/Map";
import { Diagonal } from "components/svg";
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
        min-height: 100vh;
    }
    @media (min-width: ${theme.breakMd}) {
        // max-width: ${theme.containerMaxWidthMd};
        min-height: 80vh;
    }
    @media (min-width: ${theme.breakLg}) {
        // max-width: ${theme.containerMaxWidthLg};
        min-height: 50vh;
    }
    @media (min-width: ${theme.breakXl}) {
        max-width: ${theme.containerMaxWidthXl};
    }
`;

const InfoSectionContent = styled.div`
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    min-height: 50vh;
    flex-grow: 1;
`;

const InfoSectionMain = styled.section`
    width: 100vw;
    max-width: 100%;
    position: relative;
    overflow: hidden;
    min-height: ${props => props.height};
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-self: center;
    margin-top: ${props => props.angleHeight};
    margin-bottom: ${props => props.angleHeight};
    padding-right: 15px;
    padding-left: 15px;
    color: ${props => props.textColor};
    background-color: ${props => props.backgroundColor};
    @media (max-width: ${theme.breakLg}) {
        max-width: none;
        margin-top: 0;
    }
    @media (min-width: ${theme.breakSm}) {
    }
    @media (min-width: ${theme.breakMd}) {
    }
    @media (min-width: ${theme.breakLg}) {
    }
    @media (min-width: ${theme.breakXl}) {
    }
`;

InfoSectionMain.defaultProps = {
    "min-height": "40vh",
    "margin-top": "3rem",
    "margin-bottom": "2rem",
    color: theme.bodyColor,
    "background-color": theme.bodyBg
};

const InfoSection = {
    Main: InfoSectionMain,
    Content: InfoSectionContent
};

function AngleSection({
    height = "40vh",
    angleHeight = "5vh",
    backgroundColor = theme.bodyBg,
    textColor = theme.bodyColor,
    ...props
}) {
    const [heightInt, heightUnit] = height
        .split(/(\d+)([a-zA-Z]+)/)
        .filter(i => i);
    const [angleHeightInt, angleHeightUnit] = angleHeight
        .split(/(\d+)([a-zA-Z]+)/)
        .filter(i => i);
    const middleHeightInt = heightInt - angleHeightInt * 2;
    const middleHeight = `${middleHeightInt}${heightUnit}`;
    const middleMargin = `${~~(angleHeightInt * 1.2)}${angleHeightUnit}`;

    let sectionStyle = {
        height: middleHeight,
        backgroundColor: backgroundColor,
        textColor: textColor,
        angleHeight: middleMargin
    };
    const topDiag = {
        direction: "rightDown",
        height: angleHeight,
        color: sectionStyle.backgroundColor
    };
    const bottomDiag = {
        direction: "leftUp",
        height: angleHeight,
        color: sectionStyle.backgroundColor
    };
    const ThisSection = styled(InfoSection.Main)`
        overflow: visible;
        padding-left: 0;
        padding-right: 0;
    `;
    return (
        <ThisSection {...sectionStyle}>
            <Diagonal {...topDiag} />
            <InfoSection.Content {...props}>
                {props.children}
            </InfoSection.Content>
            <Diagonal {...bottomDiag} />
        </ThisSection>
    );
}

export { HeroContainer, HeroSection, MapContainer, InfoSection, AngleSection };
