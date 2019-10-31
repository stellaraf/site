import React from "react";
import { Container, Card, CardDeck } from "react-bootstrap";
import styled from "styled-components";
import { getDelay, buildCardRows } from "utils";
import styles from "components/pages/cloud/styles.module.scss";
import { HeroSection, MapContainer } from "components/styled/sections";
import { LocationCard } from "components/pages/cloud/Cards";
import { locationConfig, pageConfig } from "config";
import theme from "styles/exports.module.scss";

const config = pageConfig.cloud;

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
        &:nth-child(n + 1) {
            margin-top: 3rem;
        }
    }
    @media (min-width: ${theme.breakXl}) {
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
    const Title = styled.h1``;
    const Subtitle = styled.p``;
    return (
        <Section>
            <Title>{config.title}</Title>
            <Subtitle>{config.subtitle}</Subtitle>
        </Section>
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

function SectionTwo() {
    return (
        <section className={styles.sectionGeneric}>
            <Container>
                {/* <Card>
                    <Card.Body>Temp</Card.Body>
                </Card> */}
            </Container>
        </section>
    );
}

export { SectionOne, SectionTwo, TitleBlock };
