import React from "react";
import { Container, Card, Col, Popover, Row } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { pulse, fadeIn, fadeInRight } from "react-animations";
import { Link } from "react-router-dom";
import MarkdownToJSX from "markdown-to-jsx";
import Logo from "components/svg/Logos";
import { AngleSection } from "components/styled/sections";
import bp from "utils/breakpoints";
import site from "config";
import theme from "styles/exports.module.scss";

const Markdown = props => (
    <MarkdownToJSX
        options={{
            overrides: {
                forceBlock: true,
                Link: { component: Link },
                StellarLogo: { component: Logo.Typographic }
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

        & .section-title-col {
            text-align: left;

            ${bp.up("md")} {
                padding-left: 55px;
                padding-right: 55px;
            }

            ${bp.down("md")} {
                padding-left: 0px;
                padding-right: 0px;
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
    & .inline-icon {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        pointer-events: none;
        user-select: None;
    }
    & #logo-type-stellar.inline-icon {
        padding-bottom: 0.5rem;
        margin-bottom: -0.5rem;
    }
`;

class InfoSections extends React.Component {
    constructor(props) {
        super(props);
        this.config = site.pages.services.sections;
    }
    render() {
        return (
            <SectionWrapper>
                <AngleSection
                    backgroundColor={theme.stPrimaryAlt}
                    directionTop="rightDown"
                    directionBottom="leftUp">
                    <SectionContainer fluid>
                        <Row className="section-full-row">
                            <Col sm={12} md={6}>
                                <Row className="content-card-row">
                                    <Col sm={12} className="section-title-col">
                                        <h1 className="section-title">{this.config[0].title}</h1>
                                        <h4 className="section-subtitle">
                                            {this.config[0].subtitle}
                                        </h4>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card>
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.config[0].content[0].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Markdown className="content-text">
                                                    {this.config[0].content[0].text}
                                                </Markdown>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card>
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.config[0].content[1].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <p>
                                                    <Markdown className="content-text">
                                                        {this.config[0].content[1].text}
                                                    </Markdown>
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                sm={12}
                                md={{ span: 5, offset: 1 }}
                                className="section-title-col section-full-image-col">
                                <img alt={this.config[0].title} src="/assets/servicedesk.svg" />
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    backgroundColor={theme.stPrimary}
                    directionTop="rightDown"
                    directionBottom="leftUp">
                    <SectionContainer fluid>
                        <Row className="section-full-row">
                            <Col
                                sm={12}
                                md={4}
                                style={{ paddingLeft: 0, paddingRight: 0 }}
                                className="section-title-col section-full-image-col">
                                <img
                                    alt={this.config[1].title}
                                    src="/assets/infrastructuresupport.svg"
                                />
                            </Col>
                            <Col sm={12} md={{ span: 7, offset: 1 }}>
                                <Row className="content-card-row">
                                    <Col sm={12} className="section-title-col">
                                        <h1 className="section-title">{this.config[1].title}</h1>
                                        <h4 className="section-subtitle">
                                            {this.config[1].subtitle}
                                        </h4>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card>
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.config[1].content[0].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Markdown className="content-text">
                                                    {this.config[1].content[0].text}
                                                </Markdown>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={12} className="content-card-col">
                                        <Card>
                                            <Card.Header>
                                                <h5 className="content-title">
                                                    {this.config[1].content[1].title}
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Markdown className="content-text">
                                                    {this.config[1].content[1].text}
                                                </Markdown>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
            </SectionWrapper>
        );
    }
}

export { InfoSections };
