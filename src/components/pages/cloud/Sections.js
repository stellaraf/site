import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Container, Card, CardDeck } from "react-bootstrap";
import styled from "styled-components";
// import Globe from "components/pages/cloud/Globe";
import Map from "components/pages/cloud/Map";
import styles from "components/pages/cloud/styles.module.scss";
import { HeroContainer, HeroSection } from "components/styled/sections";
import theme from "styles/exports.module.scss";
import { LocationCard } from "components/pages/cloud/Cards";
import { locationConfig } from "config";

const svgString = encodeURIComponent(renderToStaticMarkup(<Map />));
const dataUri = `url("data:image/svg+xml,${svgString}")`;
const MapContainer = styled(HeroContainer)`
    /* background: ${dataUri}; */
    height: 100%;
    background-image: url(/assets/tempmap.svg);
    background-repeat: no-repeat;
    background-position-y: 0%;
    background-position-x: 50%;
    background-size: contain;
    position: relative;
    @media (max-width: ${theme.breakLg}) {
        max-width: none;
        background-size: 300%;
        background-position-y: 0%;
        background-position-x: 15%;
        display: block;
        flex: none;
        flex-direction: none;
    }
`;

function TitleBlock() {
    return (
        <section className={styles.sectionOne}>
            <h1>Test Title</h1>
        </section>
    );
}

function SectionOne() {
    return (
        <HeroSection>
            <MapContainer>
                <Container>
                    <CardDeck>
                        {locationConfig.map((loc, i) => {
                            return (
                                <LocationCard
                                    location={loc.id}
                                    title={loc.name}
                                    text={loc.info}
                                    key={i}
                                />
                            );
                        })}
                    </CardDeck>
                </Container>
            </MapContainer>
        </HeroSection>
    );
}

function SectionTwo() {
    return (
        <section className={styles.sectionGeneric}>
            <Container>
                <Card>
                    <Card.Body>Temp</Card.Body>
                </Card>
            </Container>
        </section>
    );
}

export { SectionOne, SectionTwo, TitleBlock };
