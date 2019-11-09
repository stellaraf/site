import React, { Component } from "react";
import { ContactForm } from "components/forms";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import site from "config";
import styles from "components/pages/contact/styles.module.scss";

const config = site.pages.contact;
const Section = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 96px;
    margin-bottom: 4rem;
    text-align: center;
`;
function TitleBlock() {
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
                <Container className="contact-form">
                    <ContactForm />
                </Container>
            </section>
        );
    }
}

export { SectionOne, TitleBlock };
