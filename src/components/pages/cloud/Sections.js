import React from "react";
import { Button, Container, CardDeck, Col, Row } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import withReveal from "react-reveal/withReveal";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import MarkdownToJSX from "markdown-to-jsx";
import { Intel, VMware, PureStorage } from "components/svg/VendorLogos";
import { FiChevronRight } from "react-icons/fi";
import { getDelay, buildCardRows, getRevealProps } from "utils";
import { HeroSection, AngleSection } from "components/styled/sections";
import bp from "utils/breakpoints";
import { Display } from "components/styled/text";
import { LocationCard } from "components/pages/cloud/Cards";
import site, { locationConfig } from "config";
import theme from "styles/exports.module.scss";

const Markdown = props => (
    <MarkdownToJSX
        options={{
            overrides: {
                forceBlock: true,
                Link: { component: Link },
                Intel: { component: Intel },
                VMware: { component: VMware },
                PureStorage: { component: PureStorage }
            }
        }}
        {...props}>
        {props.children}
    </MarkdownToJSX>
);

const config = site.pages.cloud;

const LocationRow = styled(CardDeck)`
    justify-content: space-between;
    align-items: center;
    @media (min-width: ${theme.breakSm}) {
        justify-content: center;
        &:nth-child(n + 1) {
            margin-top: 0;
        }
    }
    @media (min-width: ${theme.breakMd}) {
        justify-content: center;
        &:nth-child(n + 1) {
            margin-top: 0;
        }
    }
    @media (min-width: ${theme.breakLg}) {
        justify-content: space-between;
        &:nth-child(n + 1) {
            margin-top: 3rem;
        }
    }
    @media (min-width: ${theme.breakXl}) {
        justify-content: space-between;
        &:nth-child(n + 1) {
            margin-top: 3rem;
        }
    }
`;

function TitleBlock() {
    const Section = styled.section`
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
    `;
    const Title = styled(Display.Title)`
        font-size: ${theme.display2Size};
        @media (max-width: ${theme.breakLg}) {
            font-size: ${theme.display4Size};
        }
        @media (min-width: ${theme.breakSm}) {
            font-size: ${theme.display4Size};
        }
        @media (min-width: ${theme.breakMd}) {
            font-size: ${theme.display3Size};
        }
        @media (min-width: ${theme.breakLg}) {
            font-size: ${theme.display2Size};
        }
        @media (min-width: ${theme.breakXl}) {
        }
    `;
    const Subtitle = styled(Display.Subtitle)``;
    return (
        <Section>
            <Title>{config.title}</Title>
            <Subtitle>{config.subtitle}</Subtitle>
        </Section>
    );
}

function SectionOneTitle(props) {
    let section = config.sections.one;
    const { revealProps, standardProps } = getRevealProps(props);
    const TitleContainer = styled(Container)`
        text-align: center;
    `;
    const Title = styled.h3``;
    const Text = styled.p`
        margin-top: 3%;
        font-size: ${theme.fontSizeLg};
    `;
    const Wrapper = withReveal(TitleContainer, <Fade cascade {...revealProps} />);
    return (
        <Wrapper fluid={true} {...standardProps}>
            <Title>{section.title}</Title>
            <Text>{section.text}</Text>
        </Wrapper>
    );
}

function SectionOne() {
    const cardRows = buildCardRows(locationConfig, 3);
    return (
        <HeroSection>
            <SectionOneTitle duration={2000} delay={128} />
            {cardRows.map((row, i) => {
                const rowDelay = i =>
                    getDelay(i, row.length, {
                        maxDelay: 128,
                        slowFirst: false
                    });
                return (
                    <LocationRow key={i}>
                        {row.map((loc, i) => {
                            return (
                                <LocationCard
                                    location={loc.id}
                                    title={loc.name}
                                    subtitle={loc.subtitle}
                                    text={loc.info}
                                    key={i}
                                    delay={rowDelay(i)}
                                    bottom
                                    duration={2000}
                                />
                            );
                        })}
                    </LocationRow>
                );
            })}
        </HeroSection>
    );
}

const LearnMore = props => (
    <LinkContainer to={props.href} className="learn-more">
        <Button variant="outline-light">
            <FiChevronRight style={{ marginBottom: "0.1em" }} /> Learn More
        </Button>
    </LinkContainer>
);

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    & div.abstractdots {
        /* position: absolute;
        top: 50%;
        right: 0;
        height: 20vh;
        width: 60vw;
        background-color: ${theme.stWhite};
        border-left-color: ${theme.stWhite};
        border-top-left-radius: 20%;
        border-left-width: 20vw; */
    }
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

    & div {
        z-index: 100;
    }

    & .section-title {
        margin-top: 1vh;
        margin-bottom: 2vh;
        color: ${theme.stWhite};
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
            .content-title {
            }
            .content-text {
                margin-top: 1vh;
                font-size: ${theme.fontSizeSm};
                line-height: 1.5;

                .inline-icon {
                    margin-left: 0.25rem;
                    margin-right: 0.25rem;
                }
            }
        }
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
                        <Row>
                            <Col className="section-title-col">
                                <h1 className="section-title">{this.info[0].title}</h1>
                                <h4 className="section-subtitle">{this.info[0].subtitle}</h4>
                                <p>
                                    <Markdown className="section-text">
                                        {this.info[0].text}
                                    </Markdown>
                                </p>
                                <LearnMore href="/docs/sla" />
                            </Col>
                        </Row>
                    </SectionContainer>
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
                        <Row>
                            <Col className="section-title-col">
                                <h1 className="section-title">{this.info[1].title}</h1>
                                <h4 className="section-subtitle">{this.info[1].subtitle}</h4>
                            </Col>
                        </Row>
                        <Row className="content-row">
                            <Col sm={12} md={8} className="content-col">
                                <h5 className="content-title">{this.info[1].content[0].title}</h5>
                                <Markdown className="content-text">
                                    {this.info[1].content[0].text}
                                </Markdown>
                            </Col>
                            <Col sm={12} md={{ span: 8, offset: 4 }} className="content-col">
                                <h5 className="content-title">{this.info[1].content[1].title}</h5>
                                <Markdown className="content-text">
                                    {this.info[1].content[1].text}
                                </Markdown>
                            </Col>
                            <Col sm={12} md={8} className="content-col">
                                <h5 className="content-title">{this.info[1].content[2].title}</h5>
                                <Markdown className="content-text">
                                    {this.info[1].content[2].text}
                                </Markdown>
                            </Col>
                            <Col sm={12} md={{ span: 8, offset: 4 }} className="content-col">
                                <h5 className="content-title">{this.info[1].content[3].title}</h5>
                                <Markdown className="content-text">
                                    {this.info[1].content[3].text}
                                </Markdown>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
                <AngleSection
                    backgroundColor={theme.stDark}
                    directionTop="rightDown"
                    directionBottom="leftUp">
                    <SectionContainer fluid>
                        <Row>
                            <Col className="section-title-col">
                                <h1 className="section-title">{this.info[2].title}</h1>
                                <h4 className="section-subtitle">{this.info[2].subtitle}</h4>
                            </Col>
                        </Row>
                        <Row className="content-row">
                            <Col sm={12} md={8} className="content-col">
                                <h5 className="content-title">{this.info[2].content[0].title}</h5>
                                <Markdown className="content-text">
                                    {this.info[2].content[0].text}
                                </Markdown>
                            </Col>
                            <Col sm={12} md={{ span: 8, offset: 4 }} className="content-col">
                                <h5 className="content-title">{this.info[2].content[1].title}</h5>
                                <Markdown className="content-text">
                                    {this.info[2].content[1].text}
                                </Markdown>
                            </Col>
                        </Row>
                    </SectionContainer>
                </AngleSection>
            </SectionWrapper>
        );
    }
}

export { SectionOne, InfoSections, TitleBlock };
