import React from "react";
import { CardDeck, Card, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Icons from "components/svg/Icons";
import { SectionCard } from "components/pages/home/Cards";
import { AngleSection } from "components/styled/sections";
import { getDelay } from "utils";
import { FullWidthCard } from "components/styled/cards";
import { getRevealProps } from "utils";
import bp from "utils/breakpoints";
import withReveal from "react-reveal/withReveal";
import Slide from "react-reveal/Slide";
import styled from "styled-components";
import site from "config";
import theme from "styles/exports.module.scss";

const CardRow = styled(CardDeck)`
    justify-content: space-between;
    align-items: start;
`;

const SectionOneWrapper = styled.section`
    min-height: 40vh;
    display: flex;
    margin-top: 5vh;
    margin-bottom: 5vh;
    flex-direction: column;
`;

function SectionOneRow() {
    const cards = site.pages.home.sections.sectionOne;
    const revealProps = {
        left: true,
        duration: 128,
        cascade: true
    };
    const sectionDelay = i => getDelay(i, cards.length);
    return (
        <CardRow>
            {cards.map((section, i) => {
                let CardWrapper = FullWidthCard(cards.length, i);
                return (
                    <CardWrapper key={i}>
                        <SectionCard
                            title={section.title}
                            text={section.text}
                            image={section.image}
                            link={section.link}
                            delay={sectionDelay(i)}
                            {...revealProps}
                        />
                    </CardWrapper>
                );
            })}
        </CardRow>
    );
}

function SectionOne(props) {
    return (
        <SectionOneWrapper className="infoSection">
            <Container>
                <SectionOneRow />
            </Container>
        </SectionOneWrapper>
    );
}

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

const FeatureIcon = styled.div`
    display: inline-block;
    text-align: center;
    padding: inputBtnPaddingY inputBtnPaddingX;
    background-color: ${props => props.color};
    border-radius: ${theme.borderRadius};
`;

const FeatureTop = styled.div`
    padding: ${theme.sectionCardPaddingY} ${theme.sectionCardPaddingX} !important;
`;

const FeatureBottom = styled.div`
    color: ${props => props.color};
    padding-right: ${theme.sectionCardPaddingX} !important;
    padding-left: ${theme.sectionCardPaddingX} !important;
    padding-bottom: ${theme.sectionCardPaddingY} !important;
`;

const FeatureCardRow = styled(CardDeck)`
    width: 100%;
`;

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
                    <FeatureCardTitle color={theme.stDark}>
                        {title}
                    </FeatureCardTitle>
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

const SectionContainer = styled(Container)`
    min-height: 25vh;
    display: flex;
    align-items: center;
`;

function NewSectionOne(props) {
    const cards = site.pages.home.sections.sectionOne;
    const revealProps = {
        left: true,
        duration: 128,
        cascade: true
    };
    const sectionDelay = i => getDelay(i, cards.length);
    return (
        <AngleSection backgroundColor={theme.stWhite}>
            <SectionContainer>
                <FeatureCardRow>
                    {cards.map((section, i) => {
                        let CardWrapper = FullWidthCard(cards.length, i);
                        return (
                            <CardWrapper key={i}>
                                <FeatureCard
                                    title={section.title}
                                    text={section.text}
                                    image={section.image}
                                    link={section.link}
                                    delay={sectionDelay(i)}
                                    {...revealProps}
                                />
                            </CardWrapper>
                        );
                    })}
                </FeatureCardRow>
            </SectionContainer>
        </AngleSection>
    );
}

export { SectionOne, NewSectionOne, FeatureCard };
