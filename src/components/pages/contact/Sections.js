import React, { Component } from "react";
import { ContactForm } from "components/forms";
import { Container } from "react-bootstrap";
import styles from "components/pages/contact/styles.module.scss";

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
                <Container>
                    <ContactForm />
                </Container>
            </section>
        );
    }
}

export { SectionOne, TitleBlock };
