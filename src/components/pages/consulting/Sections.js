import React from "react";
import { CardColumns, Card, Container, Col, Row } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { pulse, fadeIn, fadeInRight } from "react-animations";
import { Link } from "react-router-dom";
import MarkdownToJSX from "markdown-to-jsx";
import { FiChevronRight } from "react-icons/fi";
import {
    VMware,
    Microsoft,
    Citrix,
    Nutanix,
    Office365,
    Zerto,
    Veeam,
    RedHat,
    Debian,
    Ubuntu
} from "components/svg/VendorLogos";
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
                FiChevronRight: { component: FiChevronRight }
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

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const SectionContainer = styled(Container)`
    position: relative;
    min-height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    max-width: 80%;

    & .card-columns {
        // display: flex;


        & .card {
            color: ${theme.contentCardColor};
            background-color: ${theme.contentCardBackground};
            box-shadow: ${theme.contentCardShadow};
            ${bp.down("md")} {
                margin-right: 0px;
                margin-left: 0px;
            }
            /* ${bp.up("md")} {
                margin-right: 40px;
                margin-left: 40px;
            } */

            & .card-header {
                display: flex;
                color: ${theme.contentCardColor};
                background-color: unset;
                border-bottom: none;
                padding-top: 2rem;
                justify-content: center;
                .content-title {
                    margin-bottom: unset;
                }
            }

            & .card-body {
                a {
                    color: ${theme.stWhite};
                    text-decoration: none;
                    :hover {
                        color: ${theme.stSecondary};
                    }
                }
            }
            & .card-footer {
                display: flex;
                color: ${theme.contentCardColor};
                background-color: unset;
                border-top: none;
                justify-content: space-evenly;
                flex-direction: row;
                flex-wrap: wrap;
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
        margin-top: 3vh;
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
        margin-top: 10vh;
        margin-bottom: 2vh;
        color: ${theme.stWhite};
        pointer-events: none;
        font-family: ${theme.stFontsMono};
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

    & div.brand-container {
        display: flex;
        flex: 1 0 auto;
        align-items: center;
        justify-content: center;
        margin: 0.5rem;
        & svg.brand-icon {
            pointer-events: none;
            user-select: none;
        }
    }
`;

class InfoSections extends React.Component {
    constructor(props) {
        super(props);
        this.config = site.pages.consulting.sections;
    }
    render() {
        return (
            <SectionWrapper>
                <AngleSection
                    backgroundColor={theme.stPrimary}
                    directionTop="leftDown"
                    directionBottom="rightUp">
                    <SectionContainer fluid>
                        <Row className="section-title-row">
                            <Col sm={12} className="section-title-col">
                                <h1 className="section-title">{this.config[0].title}</h1>
                                <h4 className="section-subtitle">{this.config[0].subtitle}</h4>
                            </Col>
                        </Row>
                        <CardColumns>
                            <Card>
                                <Card.Header>
                                    <h5 className="content-title">Virtualization</h5>
                                </Card.Header>
                                <Card.Body>
                                    Name a virtualization technology and we can deploy it
                                    blindfolded.
                                </Card.Body>
                                <Card.Footer>
                                    <div className="brand-container">
                                        <VMware
                                            className="brand-icon"
                                            height={16}
                                            color={theme.stWhite}
                                        />
                                    </div>
                                    <div className="brand-container">
                                        <Microsoft
                                            className="brand-icon"
                                            height={24}
                                            color={theme.stWhite}
                                        />
                                    </div>
                                    <div className="brand-container">
                                        <Citrix
                                            className="brand-icon"
                                            height={40}
                                            color={theme.stWhite}
                                        />
                                    </div>
                                    <div className="brand-container">
                                        <Nutanix
                                            className="brand-icon"
                                            height={16}
                                            color={theme.stWhite}
                                        />
                                    </div>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <h5 className="content-title">Storage</h5>
                                </Card.Header>
                                <Card.Body>
                                    We specialize in the deployment of enterprise storage platforms
                                    and have extensive experience with almost every storage platform
                                    on the planet.
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <h5 className="content-title">Office 365</h5>
                                </Card.Header>
                                <Card.Body>
                                    We've successfully migrated thousands of companies to Office
                                    365. Whether you're coming from Exchange 2003-2019, Google G
                                    Suite, or an existing Office 365 tenant, we'll get you there.
                                </Card.Body>
                                <Card.Footer>
                                    <Office365 height={48} color={theme.stWhite} />
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <h5 className="content-title">Business Continuity</h5>
                                </Card.Header>
                                <Card.Body>
                                    If the <Link to="/cloud">Orion backup & DR platform</Link> isn't
                                    the right fit for your organization, we can still help you with
                                    your business continuity planning. As a{" "}
                                    <Link to="/services">managed IT provider</Link>, we regularly
                                    work with a wide variety of backup & DR platforms.
                                </Card.Body>
                                <Card.Footer>
                                    <div className="brand-container">
                                        <Zerto
                                            className="brand-icon"
                                            color={theme.stWhite}
                                            height={64}
                                        />
                                    </div>
                                    <div className="brand-container">
                                        <Veeam
                                            className="brand-icon"
                                            color={theme.stWhite}
                                            height={18}
                                        />
                                    </div>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <h5 className="content-title">Active Directory</h5>
                                </Card.Header>
                                <Card.Body>
                                    Bring us your broken, orphaned child domains and we will make
                                    them whole again.
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <h5 className="content-title">Linux</h5>
                                </Card.Header>
                                <Card.Body>
                                    Need help deciphering that <code>df -h</code>? Can't quite{" "}
                                    <code>grep</code> the <code>ps -ax</code>? We can help!
                                </Card.Body>
                                <Card.Footer>
                                    <div className="brand-container">
                                        <RedHat
                                            className="brand-icon"
                                            color={theme.stWhite}
                                            height={32}
                                        />
                                    </div>
                                    <div className="brand-container">
                                        <Debian
                                            className="brand-icon"
                                            color={theme.stWhite}
                                            height={32}
                                        />
                                    </div>
                                    <div className="brand-container">
                                        <Ubuntu
                                            className="brand-icon"
                                            color={theme.stWhite}
                                            height={32}
                                        />
                                    </div>
                                </Card.Footer>
                            </Card>
                        </CardColumns>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    backgroundColor={theme.stPrimaryAlt}
                    directionTop="leftDown"
                    directionBottom="rightUp">
                    <SectionContainer fluid>
                        <Row className="section-title-row">
                            <Col sm={12} className="section-title-col">
                                <h1 className="section-title">{this.config[1].title}</h1>
                                <h4 className="section-subtitle">{this.config[1].subtitle}</h4>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    backgroundColor={theme.stDark}
                    directionTop="leftDown"
                    directionBottom="rightUp">
                    <SectionContainer fluid>
                        <Row className="section-title-row">
                            <Col sm={12} className="section-title-col">
                                <h1 className="section-title">{this.config[2].title}</h1>
                                <h4 className="section-subtitle">{this.config[2].subtitle}</h4>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
            </SectionWrapper>
        );
    }
}

export { InfoSections };
