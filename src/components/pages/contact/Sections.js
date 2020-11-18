import React from "react";
import { ContactForm } from "components/forms";
import { Col, Container, Row } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { AngleSection } from "components/styled/sections";
import { FiMail, FiPhone } from "react-icons/fi";
import { Display } from "components/styled/text";
import GoogleMap from "components/GoogleMap";
import site from "config";
import bp from "utils/breakpoints";
import theme from "styles/exports.module.scss";

const fadeInAnimation = keyframes`${fadeIn}`;

const TitleSection = styled.section`
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    margin-top: 96px;
    margin-bottom: 4rem;
    text-align: center;
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
        animation: 0.5s ${fadeInAnimation};
    }
`;

function TitleBlock() {
    const config = site.pages.contact;
    return (
        <TitleSection>
            <Display.Title>{config.title}</Display.Title>
            <Display.Subtitle>{config.subtitle}</Display.Subtitle>
        </TitleSection>
    );
}

const SectionContainer = styled(Container)`
    position: relative;
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;

    ${bp.down("sm")} {
        max-width: 100%;
    }

    ${bp.up("sm")} {
        max-width: 80%;
    }

    & div {
        z-index: 50;
    }

    & .section-title-row {
        margin-top: 1vh;
        width: 100%;

        & .section-title-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-height: 30vh;
            pointer-events: none;
            user-select: none;
        }
    }

    & .section-title {
        margin-top: 1vh;
        margin-bottom: 2vh;
        color: ${theme.stWhite};
        pointer-events: none;
        animation: 0.5s ${fadeInAnimation};
    }

    & .section-subtitle {
        margin-bottom: 3vh;
        color: ${theme.stWhiteDark};
        font-weight: ${theme.fontWeightNormal};
    }

    & .contact-icon {
        margin-right: 1rem;
    }

    & .contact-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-height: 30vh;
    }

    & .section-text {
        margin-top: 1vh;
        margin-bottom: 3vh;
        max-height: 3vh;
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
`;

class SupportSection extends React.Component {
    constructor(props) {
        super(props);
        this.config = site.pages.contact.sections.support;
    }
    render() {
        return (
            <AngleSection
                backgroundColor={theme.stPrimary}
                directionTop="leftDown"
                directionBottom="rightUp"
            >
                <SectionContainer fluid>
                    <Row className="section-title-row">
                        <Col className="section-title-col">
                            <h1 className="section-title">{this.config.title}</h1>
                            <h4 className="section-subtitle">{this.config.subtitle}</h4>
                        </Col>
                    </Row>
                    <Row className="section-title-row">
                        <Col className="contact-col" sm={12} md={{ span: 3, offset: 2 }}>
                            <p className="section-text">
                                <FiMail
                                    size={32}
                                    className="contact-icon"
                                    color={theme.stSecondary}
                                />
                                <a href="mailto:support@stellar.tech">support@stellar.tech</a>
                            </p>
                        </Col>
                        <Col className="contact-col" sm={12} md={{ span: 3, offset: 2 }}>
                            <p className="section-text">
                                <FiPhone
                                    size={32}
                                    className="contact-icon"
                                    color={theme.stSecondary}
                                />
                                <a href="tel:+18884341043">+1 (888) 434-1043</a>
                            </p>
                        </Col>
                    </Row>
                </SectionContainer>
            </AngleSection>
        );
    }
}

const ContactContainer = styled(Container)`
    position: relative;
    min-height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    ${bp.down("sm")} {
        && {
            max-width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
    }

    ${bp.up("sm")} {
        max-width: 80%;
    }

    & div {
        z-index: 50;
    }

    & .section-title-row {
        margin-top: 1vh;
        width: 100%;

        & .section-title-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-height: 30vh;
            pointer-events: none;
            user-select: none;
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

    & .contact-icon {
        margin-right: 1rem;
    }

    & .contact-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 5vh;
    }

    & .section-text {
        margin-top: 1vh;
        margin-bottom: 3vh;
        max-height: 3vh;
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
`;

class ContactSection extends React.Component {
    constructor(props) {
        super(props);
        this.config = site.pages.contact.sections.contactForm;
    }
    render() {
        return (
            <AngleSection
                backgroundColor={theme.stPrimaryAlt}
                directionTop="leftDown"
                directionBottom="rightUp"
            >
                <ContactContainer fluid>
                    <Row className="section-title-row">
                        <Col className="section-title-col">
                            <h1 className="section-title">{this.config.title}</h1>
                            <h4 className="section-subtitle">{this.config.subtitle}</h4>
                        </Col>
                    </Row>
                    <Row className="section-title-row">
                        <Col className="contact-col" sm={12}>
                            <ContactForm />
                        </Col>
                    </Row>
                </ContactContainer>
            </AngleSection>
        );
    }
}

class LocationSection extends React.Component {
    constructor(props) {
        super(props);
        this.config = site.pages.contact.sections.locationInfo;
    }
    render() {
        return (
            <AngleSection
                backgroundColor={theme.stDark}
                directionTop="leftDown"
                directionBottom="rightUp"
            >
                <ContactContainer fluid>
                    <Row className="section-title-row">
                        <Col className="section-title-col">
                            <h1 className="section-title">{this.config.title}</h1>
                            <h4 className="section-subtitle">{this.config.subtitle}</h4>
                        </Col>
                    </Row>
                    <Row className="section-title-row">
                        <Col className="contact-col" sm={12}>
                            <GoogleMap
                                longitude={this.config.longitude}
                                latitude={this.config.latitude}
                                title={this.config.popover.title}
                                text={this.config.popover.text}
                            />
                        </Col>
                    </Row>
                </ContactContainer>
            </AngleSection>
        );
    }
}

export { TitleBlock, SupportSection, ContactSection, LocationSection };
