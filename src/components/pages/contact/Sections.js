import React, { Component } from "react";
import { ContactForm } from "components/forms";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { pageConfig } from "config";
import styles from "components/pages/contact/styles.module.scss";

const config = pageConfig.contact;

function TitleBlock() {
    const Section = styled.section`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-top: 3rem;
        margin-bottom: 4rem;
        text-align: center;
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

class SectionOne extends Component {
    render() {
        return (
            <section className={styles.sectionGeneric}>
                <Container>
                    <ContactForm />
                </Container>
            </section>
        );
    }
}

export { SectionOne, TitleBlock };
