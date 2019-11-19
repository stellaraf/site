import React from "react";
import {
    Button,
    Container,
    Card,
    Col,
    ListGroup,
    OverlayTrigger,
    Popover,
    Row
} from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { pulse, fadeIn, fadeInRight } from "react-animations";
// import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import MarkdownToJSX from "markdown-to-jsx";
import { Intel, VMware, PureStorage, Veeam, PaloAltoNetworks } from "components/svg/VendorLogos";
import { FiChevronRight, FiInfo } from "react-icons/fi";
import { IoIosGitNetwork } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { AngleSection } from "components/styled/sections";
import Icons from "components/svg/Icons";
import bp, { query } from "utils/breakpoints";
import { Display } from "components/styled/text";
import site from "config";
import theme from "styles/exports.module.scss";
import USMap from "components/svg/USMap";

const Markdown = props => (
    <MarkdownToJSX
        options={{
            overrides: {
                forceBlock: true,
                Link: { component: Link },
                Intel: { component: Intel },
                VMware: { component: VMware },
                Veeam: { component: Veeam },
                PaloAltoNetworks: { component: PaloAltoNetworks },
                PureStorage: { component: PureStorage }
            }
        }}
        {...props}>
        {props.children}
    </MarkdownToJSX>
);

const config = site.pages.cloud;

const pulseAnimation = keyframes`${pulse}`;
const fadeInAnimation = keyframes`${fadeIn}`;
const fadeInRightAnimation = keyframes`${fadeInRight}`;

const floatAnimation = keyframes`
    0% {
        transform: translatey(0px);
    }
    50% {
        transform: translatey(-1px);
    }
    100% {
        transform: translatey(0px);
    }
`;

const TitleSection = styled.section`
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    margin-top: 96px;
    margin-bottom: 4rem;
    text-align: center;
    ${bp.down("md")} {
        margin-top: 96px;
        margin-bottom: 1rem;
    }
    & h1 {
        font-size: ${theme.display2Size};
        ${bp.down("sm")} {
            font-size: ${theme.display4Size};
        }
        ${bp.down("md")} {
            font-size: ${theme.display3Size};
        }
        ${bp.up("lg")} {
            font-size: ${theme.display2Size};
        }
    }

    & h3 {
        animation: 0.5s ${fadeInRightAnimation};
    }
`;

function TitleBlock() {
    return (
        <TitleSection>
            <Display.Title>{config.title}</Display.Title>
            <Display.Subtitle>{config.subtitle}</Display.Subtitle>
        </TitleSection>
    );
}

const SectionOneContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    align-self: center;
    padding-right: 15px;
    padding-left: 15px;
    position: relative;
    ${bp.down("lg")} {
        max-width: none;
        margin-top: 0;
    }
    ${bp.down("sm")} {
        min-height: 35vh;
    }
    ${bp.up("sm")} {
        min-height: 35vh;
    }

    & .map-col {
        ${bp.down("sm")} {
            padding-right: 0px;
            padding-left: 0px;
        }
    }

    & .map-overlay-text {
        ${bp.up("sm")} {
            position: absolute;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            top: 40%;
            width: 50%;
        }
        ${bp.down("sm")} {
            margin-top: 2vh;
        }
        color: ${theme.stWhite};
        text-align: center;
        animation: 2s ${fadeInAnimation};

        & h2,
        p {
            text-shadow: 0px 0px 10px ${theme.stDark};
        }

        & p.section-text {
            font-size: ${theme.fontSizeLg};
            white-space: pre-line;

            ${bp.down("sm")} {
                font-size: ${theme.fontSizeBase};
            }
        }
    }

    & .map-container {
        overflow: hidden;
        position: relative;
        z-index: 1;
        ${bp.down("sm")} {
            max-width: 100%;
            padding-right: 5px;
            padding-left: 5px;
        }
        ${bp.up("md")} {
            max-width: 80%;
        }

        & .map-us-pin {
            animation: 1s ${fadeInAnimation};
            animation: 1s ${floatAnimation} infinite 1.25s;
        }

        & #map-us-mainland {
            animation: 1s ${fadeInAnimation};
        }
        & #map-us-hawaii {
            animation: 2s ${fadeInAnimation};
        }
    }

    & .section-title-col {
        text-align: center;

        & p.section-text {
            margin-top: 1vh;
            margin-bottom: 3vh;
            font-size: ${theme.fontSizeLg};
            color: ${theme.stWhite};
            white-space: pre-line;
        }
    }
`;

const StyledLocPopup = styled(Popover)`
    && {
        background-color: ${theme.contentCardBackground};
        color: ${theme.stWhite};
        max-width: 600px;

        & .arrow {
            ::after {
                ${props => `border-${props.side}-color: ${theme.contentCardBackground};`}
            }
        }

        & .popover-header[class] {
            background-color: ${theme.contentCardBackground};
            font-size: ${theme.fontSizeBase};
            font-weight: ${theme.fontWeightBold};
            border-bottom: unset;
            ::before {
                border-bottom: 1px solid ${theme.contentCardBackground};
            }
        }

        & .popover-body[class] {
            font-size: ${theme.fontSizeSm};
            font-weight: ${theme.fontWeightLight};
            & .loc-subtitle {
                color: ${theme.stGray};
            }
        }
    }
`;
const LocPopup = (loc, side) => {
    const locMap = site.locations;
    return (
        <StyledLocPopup side={side}>
            <Popover.Title>{locMap[loc].name}</Popover.Title>
            <Popover.Content>
                {/* locMap[loc].subtitle && <p className="loc-subtitle">{locMap[loc].subtitle}</p> */}
                <Markdown>{locMap[loc].info}</Markdown>
            </Popover.Content>
        </StyledLocPopup>
    );
};

const mapBlock = (
    <USMap
        pinFill={theme.stSecondary}
        gradient1color1={theme.stPrimary}
        gradient1color2={theme.stPrimaryAlt}
        gradient2color1={theme.stPrimaryAlt}
        gradient2color2={theme.stPrimary}
        mapFill="url(#map-us-gradient-1)"
        mapFillHawaii="url(#map-us-gradient-2)"
        showTooltip={LocPopup}
    />
);

const titleBlock = (
    <div className="map-overlay-text">
        <h2>{config.sections.one.title}</h2>
        <p className="section-text">{config.sections.one.text}</p>
    </div>
);

function SectionOne() {
    return (
        <SectionOneContainer>
            <Row>
                <Col sm={12} className="map-col">
                    <Container className="map-container" fluid>
                        {query.atLeast("md") && titleBlock}
                        {mapBlock}
                    </Container>
                </Col>
                {query.atMost("sm") && (
                    <Col className="map-col-title" sm={12}>
                        {titleBlock}
                    </Col>
                )}
            </Row>
        </SectionOneContainer>
    );
}

const LearnMore = props => (
    // <LinkContainer to={props.href} className="learn-more">
    <Button
        variant="outline-light"
        className="learn-more"
        href="https://docs.stellar.tech/docs/resources/sla"
        target="_blank">
        <FiChevronRight style={{ marginBottom: "0.1em" }} /> Learn More
    </Button>
    // </LinkContainer>
);

const StyledInfoPopup = styled(Popover)`
    && {
        background-color: ${theme.contentCardBackground};
        color: ${theme.stWhite};
        max-width: 600px;

        & .arrow {
            ::after {
                border-bottom-color: ${theme.contentCardBackground};
            }
        }

        & .popover-header[class] {
            background-color: ${theme.contentCardBackground};
            font-size: ${theme.fontSizeSm};
            font-weight: ${theme.fontWeightNormal};
            border-bottom: unset;
            ::before {
                border-bottom: 1px solid ${theme.contentCardBackground};
            }
        }

        & .popover-body[class] {
            font-size: ${theme.fontSizeSm};
            font-weight: ${theme.fontWeightLight};
        }
    }
`;
const DRPopup = (
    <StyledInfoPopup>
        <Popover.Title>{site.pages.cloud.sections.info[2].infoPopup.title}</Popover.Title>
        <Popover.Content>
            <Markdown>{site.pages.cloud.sections.info[2].infoPopup.text}</Markdown>
        </Popover.Content>
    </StyledInfoPopup>
);

const PopupButton = styled.button`
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    user-select: none;
    background-color: transparent;
    border: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;

    :focus {
        outline: 5px auto ${theme.stSecondary};
    }

    & svg {
        animation: 1s ${pulseAnimation} infinite;
    }
`;

const InfoPopup = props => (
    <OverlayTrigger trigger="click" placement={props.side} overlay={props.target}>
        <PopupButton style={props.style}>
            <FiInfo color={props.color} />
        </PopupButton>
    </OverlayTrigger>
);

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const SectionContainer = styled(Container)`
    position: relative;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    max-width: 80%;
    && {
        ${bp.down("sm")} {
            padding-left: 0px;
            padding-right: 0px;
            max-width: 90%;
        }
    }

    & .content-card-row {
        justify-content: space-around;
        margin-top: 10vh;

        & .content-card-col {
            display: flex;
            & .card {
                color: ${theme.contentCardColor};
                background-color: ${theme.contentCardBackground};
                box-shadow: ${theme.contentCardShadow};
                text-align: left;
                justify-content: left;
                ${bp.down("md")} {
                    margin-right: 0px;
                    margin-left: 0px;
                }
                ${bp.up("md")} {
                    margin-right: 40px;
                    margin-left: 40px;
                }

                & .card-header {
                    display: flex;
                    color: ${theme.contentCardColor};
                    background-color: unset;
                    border-bottom: none;
                    padding-top: 2rem;
                    .content-title {
                        margin-bottom: unset;
                    }
                }
                & .card-footer {
                    display: flex;
                    color: ${theme.contentCardColor};
                    background-color: unset;
                    border-top: none;
                }
                & .list-group {
                    margin-top: 1rem;
                    & .list-group-item {
                        background-color: transparent;
                        color: ${theme.stWhite};
                        font-size: ${theme.fontSizeSm};

                        & .feature-icon {
                            display: inline-block;
                            margin-right: 1rem;
                            margin-left: -1rem;
                        }
                    }
                }
            }
            & .content-bg-dark {
                background-color: ${theme.contentCardBackgroundDark};
                color: ${theme.contentCardColorDark};
                box-shadow: ${theme.contentCardShadowDark};

                & .card-header h5 {
                    color: ${theme.contentCardColorDark};
                }
            }

            ${bp.down("sm")} {
                &:not(:first-of-type) {
                    margin-top: 3vh;
                }
            }
        }
        &:last-of-type {
            margin-bottom: 20vh;
            ${bp.down("sm")} {
                margin-bottom: 10vh;
            }
        }
    }
    .content-card-row .content-card-col:not(:first-child):not(:last-child) {
        margin-top: 5vh;
        margin-bottom: 5vh;
    }

    & div {
        z-index: 100;
    }

    & .section-full-row {
        width: 100%;

        & .section-full-content-col {
            padding-left: 0px;
            padding-right: 0px;
        }

        & .section-title-col {
            text-align: left;

            ${bp.up("md")} {
                padding-left: 55px;
                padding-right: 55px;
            }

            ${bp.down("md")} {
                padding-left: 0px;
                padding-right: 0px;
                max-width: 90%;
            }
        }

        & .section-full-image-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            pointer-events: none;
            user-select: none;

            ${bp.down("sm")} {
                display: none;
                visibility: hidden;
                opacity: 0;
            }
        }
        & .card[class] {
            width: 100%;
        }
    }

    & .section-title-row {
        margin-top: 10vh;
        width: 100%;

        & .section-title-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-height: 30vh;
            pointer-events: none;
            user-select: none;
        }

        & button.btn {
            pointer-events: auto;
            z-index: 1000;
        }

        img {
            max-height: 30vh;
        }

        .section-image-col {
            ${bp.down("sm")} {
                display: none;
                visibility: hidden;
                opacity: 0;
            }
        }
    }

    & .section-title {
        margin-top: 1vh;
        margin-bottom: 2vh;
        color: ${theme.stWhite};
        pointer-events: none;
    }

    & .section-subtitle {
        margin-bottom: 3vh;
        color: ${theme.stWhiteDark};
        font-weight: ${theme.fontWeightNormal};
    }

    & .section-text {
        margin-top: 1vh;
        margin-bottom: 3vh;
        font-size: ${theme.fontSizeLg};
        color: ${theme.stWhite};
        white-space: pre-line;

        ${bp.down("xl")} {
            font-size: ${theme.fontSizeBase};
        }

        a {
            color: ${theme.stWhite};

            :hover {
                color: ${theme.stSecondary};
            }
        }
    }

    & .content-row {
        width: 100%;
        .content-col {
            margin-top: 10vh;
            ${bp.up("md")} {
                &:nth-child(odd) {
                    text-align: left;
                    justify-content: left;
                }

                &:nth-child(even) {
                    text-align: right;
                    justify-content: right;
                }
                &:last-of-type {
                    margin-bottom: 10vh;
                }
            }

            ${bp.down("md")} {
                text-align: left;
                justify-content: left;
            }
            .content-text {
                margin-top: 1vh;
                font-size: ${theme.fontSizeSm};
                line-height: 1.5;

                .inline-icon {
                    margin-left: 0.25rem;
                    margin-right: 0.25rem;
                    pointer-events: none;
                    user-select: None;
                }
            }
        }
    }
    & .info-icon {
        display: flex;
        z-index: 100;
        margin-left: auto;

        & button.info-button {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            user-select: none;
            background-color: transparent;
            border: none;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
        }
    }

    & .learn-more {
        width: fit-content;
        margin-right: auto;
        margin-left: auto;
        pointer-events: auto;
    }
`;
class InfoSections extends React.Component {
    constructor(props) {
        super(props);
        this.info = site.pages.cloud.sections.info;
    }
    render() {
        return (
            <SectionWrapper>
                <AngleSection
                    backgroundColor="transparent"
                    directionTop="flat"
                    directionBottom="flat"
                    marginBottom="0"
                    style={{
                        backgroundImage: theme.stSectionGradient1
                    }}>
                    <SectionContainer fluid>
                        <Row className="section-title-row">
                            <Col className="section-title-col">
                                <h1 className="section-title">{this.info[0].title}</h1>
                                <h4 className="section-subtitle">{this.info[0].subtitle}</h4>
                                <p>
                                    <Markdown className="section-text">
                                        {this.info[0].text}
                                    </Markdown>
                                </p>
                                <LearnMore />
                            </Col>
                        </Row>
                    </SectionContainer>
                    <span ref={this.props.refOne} />
                </AngleSection>
                <AngleSection
                    backgroundColor="transparent"
                    directionTop="flat"
                    directionBottom="flat"
                    marginTop="0"
                    style={{
                        borderTop: theme.navbarBottomBorder,
                        backgroundImage: theme.stSectionGradient2
                    }}>
                    <SectionContainer fluid>
                        <Row className="section-title-row">
                            <Col sm={12} md={4} className="section-title-col section-image-col">
                                <img alt={this.info[1].title} src="/assets/computeicon.svg" />
                            </Col>
                            <Col sm={12} md={6} className="section-title-col">
                                <h1 className="section-title">{this.info[1].title}</h1>
                                <h4 className="section-subtitle">{this.info[1].subtitle}</h4>
                            </Col>
                        </Row>
                        <Row className="content-card-row">
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[1].content[0].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[1].content[0].text}
                                        </Markdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[1].content[1].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[1].content[1].text}
                                        </Markdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="content-card-row">
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[1].content[2].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[1].content[2].text}
                                        </Markdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[1].content[3].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[1].content[3].text}
                                        </Markdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    backgroundColor={theme.stDark}
                    directionTop="rightDown"
                    directionBottom="leftUp">
                    <SectionContainer fluid>
                        <Row className="section-full-row">
                            <Col sm={12} md={6} className="section-full-content-col">
                                <Row className="content-card-row">
                                    <Col sm={12} className="section-title-col">
                                        <h1 className="section-title">{this.info[2].title}</h1>
                                        <h4 className="section-subtitle">
                                            {this.info[2].subtitle}
                                        </h4>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card className="content-bg-dark">
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.info[2].content[0].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Markdown className="content-text">
                                                    {this.info[2].content[0].text}
                                                </Markdown>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card className="content-bg-dark">
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.info[2].content[1].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <p>
                                                    <Markdown className="content-text">
                                                        {this.info[2].content[1].text}
                                                    </Markdown>
                                                </p>
                                            </Card.Body>
                                            <Card.Footer>
                                                <InfoPopup
                                                    style={{ marginLeft: "auto" }}
                                                    color={theme.stWhite}
                                                    side="bottom"
                                                    target={DRPopup}
                                                />
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                sm={12}
                                md={{ span: 5, offset: 1 }}
                                className="section-title-col section-full-image-col">
                                <img alt={this.info[2].title} src="/assets/baasdraasicon.svg" />
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    backgroundColor={theme.stPrimaryAlt}
                    directionTop="rightDown"
                    directionBottom="leftUp">
                    <SectionContainer fluid>
                        <Row className="section-full-row">
                            <Col
                                sm={12}
                                md={4}
                                style={{ paddingLeft: 0, paddingRight: 0 }}
                                className="section-title-col section-full-image-col">
                                <img alt={this.info[3].title} src="/assets/vdiicon.svg" />
                            </Col>
                            <Col
                                sm={12}
                                md={{ span: 7, offset: 1 }}
                                className="section-full-content-col">
                                <Row className="content-card-row">
                                    <Col sm={12} className="section-title-col">
                                        <h1 className="section-title">{this.info[3].title}</h1>
                                        <h4 className="section-subtitle">
                                            {this.info[3].subtitle}
                                        </h4>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card>
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.info[3].content[0].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Markdown className="content-text">
                                                    {this.info[3].content[0].text}
                                                </Markdown>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card>
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.info[3].content[1].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Markdown className="content-text">
                                                    {this.info[3].content[1].text}
                                                </Markdown>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    backgroundColor={theme.stDark}
                    directionTop="rightDown"
                    directionBottom="leftUp"
                    marginTop="0">
                    <SectionContainer fluid>
                        <Row className="section-title-row">
                            <Col sm={12} md={6} className="section-title-col">
                                <h1 className="section-title">{this.info[4].title}</h1>
                                <h4 className="section-subtitle">{this.info[4].subtitle}</h4>
                            </Col>
                            <Col
                                sm={12}
                                md={{ span: 4, offset: 2 }}
                                className="section-title-col section-image-col">
                                <img alt={this.info[4].title} src="/assets/earthicon.svg" />
                            </Col>
                        </Row>
                        <Row className="content-card-row">
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card className="content-bg-dark">
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[4].content[0].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[4].content[0].text}
                                        </Markdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card className="content-bg-dark">
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[4].content[1].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[4].content[1].text}
                                        </Markdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="content-card-row">
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card className="content-bg-dark">
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[4].content[2].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[4].content[2].text}
                                        </Markdown>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <div className="feature-icon">
                                                    <Icons.IPv6
                                                        size="28px"
                                                        color={theme.stSecondary}
                                                    />
                                                </div>
                                                End to end IPv6 connectivity with a /48 assigned by
                                                default
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <div className="feature-icon">
                                                    <Icons.MANRS
                                                        size="28px"
                                                        color={theme.stSecondary}
                                                    />
                                                </div>
                                                100% MANRS Compliance
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <div className="feature-icon">
                                                    <GoLocation
                                                        size={28}
                                                        color={theme.stSecondary}
                                                    />
                                                </div>
                                                Bring your own IP Space
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <div className="feature-icon">
                                                    <IoIosGitNetwork
                                                        size={28}
                                                        color={theme.stSecondary}
                                                    />
                                                </div>
                                                Custom routing logic through granular BGP Community
                                                options
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="content-card-col" sm={12} md={6}>
                                <Card className="content-bg-dark">
                                    <Card.Header>
                                        <h5 className="content-title">
                                            {this.info[4].content[3].title}
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Markdown className="content-text">
                                            {this.info[4].content[3].text}
                                        </Markdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
            </SectionWrapper>
        );
    }
}

export { SectionOne, InfoSections, TitleBlock };
