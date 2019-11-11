import React from "react";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Icons from "components/svg/Icons";
// import { SectionCard } from "components/pages/home/Cards";
import { AngleSection } from "components/styled/sections";
import { FiChevronRight } from "react-icons/fi";
// import { getDelay } from "utils";
// import { FullWidthCard } from "components/styled/cards";
import { getRevealProps } from "utils";
import bp from "utils/breakpoints";
import withReveal from "react-reveal/withReveal";
import Slide from "react-reveal/Slide";
import styled from "styled-components";
import site from "config";
import theme from "styles/exports.module.scss";
import { VMware } from "components/svg/VendorLogos";

// const CardRow = styled(CardDeck)`
//     justify-content: space-between;
//     align-items: start;
// `;

// const SectionOneWrapper = styled.section`
//     min-height: 40vh;
//     display: flex;
//     margin-top: 5vh;
//     margin-bottom: 5vh;
//     flex-direction: column;
// `;

// function SectionOneRow() {
//     const cards = site.pages.home.sections.sectionOne;
//     const revealProps = {
//         left: true,
//         duration: 128,
//         cascade: true
//     };
//     const sectionDelay = i => getDelay(i, cards.length);
//     return (
//         <CardRow>
//             {cards.map((section, i) => {
//                 let CardWrapper = FullWidthCard(cards.length, i);
//                 return (
//                     <CardWrapper key={i}>
//                         <SectionCard
//                             title={section.title}
//                             text={section.text}
//                             image={section.image}
//                             link={section.link}
//                             delay={sectionDelay(i)}
//                             {...revealProps}
//                         />
//                     </CardWrapper>
//                 );
//             })}
//         </CardRow>
//     );
// }

// function SectionOne(props) {
//     return (
//         <SectionOneWrapper className="infoSection">
//             <Container>
//                 <SectionOneRow />
//             </Container>
//         </SectionOneWrapper>
//     );
// }

const RevealWrapper = styled.div`
    display: flex !important;
    flex-grow: 1 !important;
`;

const StyledCard = styled(Card)`
    background-color: transparent !important;
    color: ${props => props.color};
    text-align: center;
    flex-grow: 1;
    justify-content: center;
    min-height: ${theme.featureCardHeight};
    height: 100%;
    border: none !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
    ${bp.down("md")} {
        min-height: ${theme.featureCardHeightSm};
    }
    &:hover {
        background-color: ${theme.featureCardBorderColor} !important;
        border: 1px solid ${theme.featureCardBorderColor} !important;
    }
`;

// const FeatureIcon = styled.div`
//     display: inline-block;
//     text-align: center;
//     padding: inputBtnPaddingY inputBtnPaddingX;
//     background-color: ${props => props.color};
//     border-radius: ${theme.borderRadius};
// `;

const FeatureTop = styled.div`
    padding: ${theme.sectionCardPaddingY} ${theme.sectionCardPaddingX} !important;
`;

const FeatureBottom = styled.div`
    color: ${props => props.color};
    padding-right: ${theme.sectionCardPaddingX} !important;
    padding-left: ${theme.sectionCardPaddingX} !important;
    padding-bottom: ${theme.sectionCardPaddingY} !important;
`;

// const FeatureCardRow = styled(CardDeck)`
//     display: flex;
//     justify-content: center;
//     width: 100%;
// `;

const FeatureCardTitle = styled.h5`
    color: ${props => props.color};
`;

const FeatureCardText = styled.a`
    color: ${props => props.color} !important;
    &:hover {
        text-decoration: none !important;
        color: ${props => props.color} !important;
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        pointer-events: auto;
        content: "";
        background-color: rgba(0, 0, 0, 0);
    }
`;

function FeatureCard({
    image,
    title = "Placeholder Title",
    text = "Placeholder Text",
    link,
    ...props
}) {
    const { revealProps, standardProps } = getRevealProps(props);
    const CardWrapper = withReveal(RevealWrapper, <Slide {...revealProps} />);
    const Icon = Icons[image] || "div";
    return (
        <CardWrapper {...standardProps}>
            <StyledCard>
                <FeatureTop>
                    <Icon color={theme.stPrimary} />
                </FeatureTop>
                <FeatureBottom>
                    <FeatureCardTitle color={theme.stDark}>{title}</FeatureCardTitle>
                    <LinkContainer to={link}>
                        <FeatureCardText color={theme.stDark} href="/">
                            {text}
                        </FeatureCardText>
                    </LinkContainer>
                </FeatureBottom>
            </StyledCard>
        </CardWrapper>
    );
}

// function SectionOne(props) {
//     const cards = site.pages.home.sections.sectionOne;
//     const revealProps = {
//         left: true,
//         duration: 128,
//         cascade: true
//     };
//     const sectionDelay = i => getDelay(i, cards.length);
//     return (
//         <AngleSection backgroundColor={theme.stWhite}>
//             <SectionContainer>
//                 <FeatureCardRow>
//                     {cards.map((section, i) => {
//                         let CardWrapper = FullWidthCard(cards.length, i);
//                         return (
//                             <CardWrapper key={i}>
//                                 <FeatureCard
//                                     title={section.title}
//                                     text={section.text}
//                                     image={section.image}
//                                     link={section.link}
//                                     delay={sectionDelay(i)}
//                                     {...revealProps}
//                                 />
//                             </CardWrapper>
//                         );
//                     })}
//                 </FeatureCardRow>
//             </SectionContainer>
//         </AngleSection>
//     );
// }

const LearnMore = props => (
    <LinkContainer to={props.href} className="learn-more">
        <Button variant="outline-light">
            <FiChevronRight style={{ marginBottom: "0.1em" }} /> Learn More
        </Button>
    </LinkContainer>
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
        text-align: justify;
        justify-content: left;
        ${bp.down("sm")} {
            text-align: left;
        }
    }
    & .align-center {
        text-align: justify;
        justify-content: center;
        ${bp.down("sm")} {
            text-align: left;
        }
    }
    & .align-right {
        text-align: justify;
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
                    backgroundColor={theme.stDark}>
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

export { Sections, FeatureCard };
