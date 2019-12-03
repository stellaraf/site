import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "wouter";
import Icons from "components/svg/Icons";
import { AngleSection } from "components/styled/sections";
import { FiChevronRight } from "react-icons/fi";
import bp from "utils/breakpoints";
import styled from "styled-components";
import site from "config";
import theme from "styles/exports.module.scss";
import { VMware } from "components/svg/VendorLogos";

const LearnMore = props => (
    <Link href={props.href} className="learn-more">
        <Button variant="outline-light">
            <FiChevronRight style={{ marginBottom: "0.1em" }} /> Learn More
        </Button>
    </Link>
);

const SectionIconWrapper = styled.div`
    display: flex;
    max-width: 75%;
`;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    & .line-wrapper {
        width: 105vw;
        height: 5vh;
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    & .line-wrapper .line-right {
        height: 1px;
        padding: 1px;
        z-index: 1000;
        background-color: ${theme.stSecondary};
        transform: rotate(-5deg);
    }
`;

const SectionContainer = styled(Container)`
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    max-width: 80%;
    ${bp.down("sm")} {
        max-width: 90%;
        padding-right: 0px;
        padding-left: 0px;
    }

    & .section-row {
        justify-content: center;
    }

    & .section-title {
        margin-top: 1vh;
        margin-bottom: 2vh;
        color: ${theme.stWhite};
    }

    & .section-subtitle {
        margin-bottom: 3vh;
        color: ${theme.stWhiteDark};
    }

    & .section-text {
        margin-top: 1vh;
        margin-bottom: 3vh;
        font-size: ${theme.fontSizeLg};
        color: ${theme.stWhite};
        white-space: pre-line;
    }

    & .text-dark {
        color: ${theme.stDark};
    }

    & .inline-icon {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }

    & .learn-more {
    }

    & div {
        z-index: 100;
    }

    & .align-left {
        text-align: left;
        justify-content: left;
        ${bp.down("sm")} {
            text-align: left;
        }
    }
    & .align-center {
        text-align: center;
        justify-content: center;
        ${bp.down("sm")} {
            text-align: left;
        }
    }
    & .align-right {
        text-align: right;
        justify-content: right;
        ${bp.down("sm")} {
            text-align: left;
        }
    }

    & .section-graphic {
        display: flex;
        align-items: center;
        justify-content: center;

        ${bp.down("sm")} {
            display: none;
            opacity: 0;
            visibility: hidden;
        }
    }
`;

class Sections extends React.Component {
    constructor(props) {
        super(props);
        this.info = site.pages.home.sections;
    }
    render() {
        return (
            <SectionWrapper>
                <AngleSection backgroundColor={theme.stDark}>
                    <SectionContainer fluid>
                        <Row className="section-row">
                            <Col className="section-graphic" md={{ span: 3, offset: 1 }}>
                                <SectionIconWrapper>
                                    <Icons.DataStructure
                                        size="100%"
                                        color={theme.stWhite}
                                        alt={this.info.sectionOne[0].title}
                                    />
                                </SectionIconWrapper>
                            </Col>
                            <Col className="align-left" sm={12} md={{ span: 7, offset: 1 }}>
                                <h1 className={"section-title"}>{this.info.sectionOne[0].title}</h1>
                                <h4 className={"section-subtitle"}>
                                    {this.info.sectionOne[0].subtitle}
                                </h4>
                                <span ref={this.props.styledRef} />
                                <p className={"section-text"}>
                                    We're not just knowledgeable about cloud technologies, we've
                                    actually built our own cloud. Enterprises need tight control
                                    over their technology, so we decided to built the most
                                    customizable cloud platform on the planet. Powered by{" "}
                                    <VMware
                                        height={14}
                                        className={"inline-icon"}
                                        color={theme.stWhite}
                                    />
                                    , the Orion platform fits right in the enterprise ecosystem.
                                </p>
                                <LearnMore href={this.info.sectionOne[0].link} />
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    directionTop={"rightDown"}
                    directionBottom={"leftUp"}
                    backgroundColor={theme.stPrimaryAlt}>
                    <SectionContainer fluid>
                        <Row className="section-row">
                            <Col className="align-right" sm={12} md={{ span: 7, offset: 1 }}>
                                <h1 className={"section-title"}>{this.info.sectionOne[1].title}</h1>
                                <h4 className={"section-subtitle"}>
                                    {this.info.sectionOne[1].subtitle}
                                </h4>
                                <p className="section-text">{this.info.sectionOne[1].text}</p>
                                <LearnMore href={this.info.sectionOne[1].link} />
                            </Col>
                            <Col className="section-graphic" md={{ span: 3, offset: 1 }}>
                                <SectionIconWrapper>
                                    <Icons.CloudComputing
                                        size="100%"
                                        color={theme.stWhite}
                                        alt={this.info.sectionOne[1].title}
                                    />
                                </SectionIconWrapper>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    directionTop={"rightDown"}
                    directionBottom={"leftUp"}
                    backgroundColor={theme.stDark}
                    marginBottom="10vh">
                    <SectionContainer fluid>
                        <Row className="section-row">
                            <Col className="section-graphic" md={{ span: 3, offset: 1 }}>
                                <SectionIconWrapper>
                                    <Icons.Diagram
                                        size="100%"
                                        color={theme.stWhite}
                                        alt={this.info.sectionOne[2].title}
                                    />
                                </SectionIconWrapper>
                            </Col>
                            <Col className="align-left" sm={12} md={{ span: 7, offset: 1 }}>
                                <h1 className={"section-title"}>{this.info.sectionOne[2].title}</h1>
                                <h4 className={"section-subtitle"}>
                                    {this.info.sectionOne[2].subtitle}
                                </h4>
                                <p className={"section-text"}>{this.info.sectionOne[2].text}</p>
                                <LearnMore href={this.info.sectionOne[2].link} />
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <div className="line-wrapper">
                    <div className="line-right"></div>
                </div>
            </SectionWrapper>
        );
    }
}

export { Sections };
