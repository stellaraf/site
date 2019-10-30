import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Container, Card } from "react-bootstrap";
// import Globe from "components/pages/cloud/Globe";
import Map from "components/pages/cloud/Map";
import styles from "components/pages/cloud/styles.module.scss";
import styled from "styled-components";

const svgString = encodeURIComponent(renderToStaticMarkup(<Map />));
const dataUri = `url("data:image/svg+xml,${svgString}")`;
const MapContainer = styled.div`
    background: ${dataUri};
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
        <section className={styles.sectionGeneric}>
            <MapContainer>
                <Container>
                    <Card>
                        <Card.Body>Test</Card.Body>
                    </Card>
                </Container>
            </MapContainer>
        </section>
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
