import React from "react";
import { Container, CardDeck } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import withReveal from "react-reveal/withReveal";
import styled from "styled-components";
import { getDelay, buildCardRows, getRevealProps } from "utils";
import {
    HeroSection,
    AngleSection,
    InfoSection,
    LineSection
} from "components/styled/sections";
import bp from "utils/breakpoints";
import { Display } from "components/styled/text";
import { LocationCard } from "components/pages/cloud/Cards";
import site, { locationConfig } from "config";
import theme from "styles/exports.module.scss";
import { NextCard } from "components/cards";

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
        margin-top: 3rem;
        margin-bottom: 4rem;
        text-align: center;
        @media (max-width: ${theme.breakMd}) {
            margin-top: 2rem;
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
    const Wrapper = withReveal(TitleContainer, <Fade {...revealProps} />);
    return (
        <Wrapper fluid={true} {...standardProps}>
            <Title>{section.title}</Title>
            <Text>{section.text}</Text>
        </Wrapper>
    );
}

function SectionOne() {
    const cardRows = buildCardRows(locationConfig, 3);
    const revealProps = {
        bottom: true,
        duration: 2000,
        cascade: true
    };

    return (
        <HeroSection>
            <SectionOneTitle duration={2000} delay={128} cascade />
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
                                    {...revealProps}
                                />
                            );
                        })}
                    </LocationRow>
                );
            })}
        </HeroSection>
    );
}

const SectionTwoText = `
    text-align: center;
    color: ${theme.stDark};
`;
const SectionTwoTitle = styled.h1`
    ${SectionTwoText}
    margin-top: 3vh;
`;

const SectionTwoSubTitle = styled.h4`
    ${SectionTwoText}
    font-weight: ${theme.fontWeightNormal};
`;

const ContentWrapper = styled.p`
    ${SectionTwoText}
    margin-top: 3vh;
`;

const SectionContainer = styled(Container)`
    height: 50vh;
`;

function SectionTwo() {
    let section = config.sections.two;
    const ContentHtml = () => {
        return { __html: section.text };
    };

    return (
        <AngleSection backgroundColor={theme.stWhite} textColor={theme.stDark}>
            <SectionContainer>
                <SectionTwoTitle>{section.title}</SectionTwoTitle>
                <SectionTwoSubTitle>{section.subtitle}</SectionTwoSubTitle>
                <ContentWrapper dangerouslySetInnerHTML={ContentHtml()} />
            </SectionContainer>
        </AngleSection>
    );
}

const NextPageRow = styled(CardDeck)`
    justify-content: space-between;
    align-items: end;
    ${bp.up("sm")} {
        justify-content: center;
        &:nth-child(n + 1) {
            margin-top: 0;
        }
    }
    ${bp.up("md")} {
        justify-content: center;
        &:nth-child(n + 1) {
            margin-top: 0;
        }
    }
    ${bp.up("lg")} {
        justify-content: space-between;
        &:nth-child(n + 1) {
            margin-top: 3rem;
        }
    }
    ${bp.up("xl")} {
        justify-content: space-between;
        &:nth-child(n + 1) {
            margin-top: 3rem;
        }
    }
`;

function NextPage() {
    return (
        <InfoSection.Main>
            <InfoSection.Content>
                <NextPageRow>
                    <NextCard page="docs" />
                </NextPageRow>
            </InfoSection.Content>
        </InfoSection.Main>
    );
}

export { SectionOne, SectionTwo, TitleBlock, NextPage };
