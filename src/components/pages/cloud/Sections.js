import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Globe from "components/pages/cloud/Globe";
import Map from "components/pages/cloud/Map";
import styles from "components/pages/cloud/styles.module.scss";

class TitleBlock extends Component {
    render() {
        return (
            <section className={styles.sectionOne}>
                <h1>Test Title</h1>
            </section>
        );
    }
}

class SectionOne extends Component {
    render() {
        return (
            <section className={styles.sectionGeneric}>
                <Container fluid={true} className={styles.MapContainer}>
                    <Map />
                </Container>
            </section>
        );
    }
}

export { SectionOne, TitleBlock };
