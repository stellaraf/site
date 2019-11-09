import React from "react";
import styled from "styled-components";
import theme from "styles/exports.module.scss";
import bp from "utils/breakpoints";
import DiagonalLine from "components/svg/DiagonalLine";
// import { renderToStaticMarkup } from "react-dom/server";
// import Map from "components/pages/cloud/Map";
// const svgString = encodeURIComponent(renderToStaticMarkup(<Map />));
// const dataUri = `url("data:image/svg+xml,${svgString}")`;

// const MapContainer = styled.div`
//     /* background: ${dataUri}; */
//     height: 100%;
//     // background-image: url(/assets/tempmap.svg);
//     background-repeat: no-repeat;
//     background-position-y: 0%;
//     background-position-x: 50%;
//     background-size: contain;
//     position: relative;
//     width: 100%;
//     padding-right: 15px;
//     padding-left: 15px;
//     margin-right: auto;
//     margin-left: auto;
//     @media (max-width: ${theme.breakLg}) {
//         max-width: none;
//         background-size: 300%;
//         background-position-y: 0%;
//         background-position-x: 15%;
//         display: block;
//         flex: none;
//         flex-direction: none;
//         margin-top: 0;
//     }
//     @media (min-width: ${theme.breakSm}) {
//         // max-width: ${theme.containerMaxWidthSm};
//     }
//     @media (min-width: ${theme.breakMd}) {
//         // max-width: ${theme.containerMaxWidthMd};
//         // padding-left: 2%;
//         // padding-right: 2%;
//     }
//     @media (min-width: ${theme.breakLg}) {
//         // max-width: ${theme.containerMaxWidthLg};
//         // padding-left: 5%;
//         // padding-right: 5%;
//     }
//     @media (min-width: ${theme.breakXl}) {
//         // max-width: ${theme.containerMaxWidthXl};
//         // padding-left: 10%;
//         // padding-right: 10%;
//     }
// `;

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
        min-height: 100vh;
    }
    @media (min-width: ${theme.breakMd}) {
        min-height: 80vh;
    }
    @media (min-width: ${theme.breakLg}) {
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
    min-height: 25vh;
    flex-grow: 1;
`;

const InfoSectionMain = styled.div`
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
    "min-height": "25vh",
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
    height = "25vh",
    angleHeight = "5vh",
    side,
    offset,
    directionTop = "rightDown",
    directionBottom = "leftUp",
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

    const borderMap = {
        rightDown: {
            color: `transparent ${backgroundColor} transparent transparent`,
            width: `${angleHeight} 100vw 0 0`
        },
        leftUp: {
            color: `${backgroundColor} transparent transparent`,
            width: `${angleHeight} 100vw 0 0`
        },
        leftDown: {
            color: `transparent transparent ${backgroundColor} transparent`,
            width: `0 100vw ${angleHeight} 0`
        },
        rightUp: {
            color: `transparent ${backgroundColor} transparent transparent`,
            width: `0 100vw ${angleHeight} 0`
        }
    };

    let sectionStyle = {
        height: middleHeight,
        backgroundColor: backgroundColor,
        textColor: textColor,
        angleHeight: middleMargin
    };
    const ThisSection = styled(InfoSection.Main)`
        overflow: visible;
        padding-left: 0;
        padding-right: 0;
    `;

    const InnerSection = styled(InfoSection.Content)`
        background-color: transparent !important;
        ${bp.down("md")} {
            padding-top: ${angleHeight};
            padding-bottom: ${angleHeight};
        }
        ::before,
        ::after {
            content: "";
            position: absolute;
            right: 0;
            width: 0;
            height: 0;
            border-style: solid;
        }
        ::before {
            top: -${angleHeight};
            border-width: ${borderMap[directionTop].width};
            border-color: ${borderMap[directionTop].color};
        }
        ::after {
            bottom: -${angleHeight};
            border-width: ${borderMap[directionBottom].width};
            border-color: ${borderMap[directionBottom].color};
        }
    `;

    return (
        <ThisSection {...sectionStyle}>
            <InnerSection {...props}>{props.children}</InnerSection>
        </ThisSection>
    );
}

function LineSection({
    height = "25vh",
    angleHeight = "5vh",
    color = theme.stWhite,
    textColor = theme.bodyColor,
    direction = "leftDown",
    strokeWidth = "2",
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
        textColor: textColor,
        angleHeight: middleMargin
    };
    const lineParams = {
        direction: direction,
        height: angleHeight,
        color: color,
        strokeWidth: strokeWidth
    };
    const ThisSection = styled(InfoSection.Main)`
        margin-top: ${angleHeight};
        margin-bottom: ${angleHeight};
        overflow: visible;
        padding-left: 0;
        padding-right: 0;
    `;
    const InnerSection = styled(InfoSection.Content)`
        ${bp.down("md")} {
            padding-top: ${angleHeight};
        }
    `;
    return (
        <ThisSection {...sectionStyle}>
            <DiagonalLine {...lineParams} />
            <InnerSection {...props}>{props.children}</InnerSection>
        </ThisSection>
    );
}

export { HeroContainer, HeroSection, InfoSection, AngleSection, LineSection };
