import React, { Component, useState } from "react";
import {
    Button,
    Card,
    Col,
    Form,
    FormControl,
    InputGroup,
    Row
} from "react-bootstrap";
import classNames from "classnames";
import styles from "components/forms/styles.module.scss";

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = { validated: false };

        this.handleSubmit = event => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.setState({ validated: true });
        };
    }
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title className={styles.contactTitle}>
                        Contact
                    </Card.Title>
                    <Form
                        noValidate
                        validated={this.validated}
                        onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={4}
                                controlId="validate-first-name">
                                <Form.Label className={styles.contactLabel}>
                                    First Name
                                </Form.Label>
                                <FormControl
                                    aria-label="First Name"
                                    aria-describedby="contact-first-name"
                                    placeholder="First Name"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={4}
                                controlId="validate-last-name">
                                <Form.Label className={styles.contactLabel}>
                                    Last Name
                                </Form.Label>
                                <FormControl
                                    aria-label="Last Name"
                                    aria-describedby="contact-last-name"
                                    placeholder="Last Name"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={4}
                                controlId="validate-company">
                                <Form.Label className={styles.contactLabel}>
                                    Company Name
                                </Form.Label>
                                <FormControl
                                    aria-label="Company"
                                    aria-describedby="contact-company"
                                    placeholder="Company"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={6}
                                controlId="validate-email">
                                <Form.Label className={styles.contactLabel}>
                                    Email Address
                                </Form.Label>
                                <FormControl
                                    aria-label="Email"
                                    aria-describedby="contact-email"
                                    placeholder="name@example.tld"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={6}
                                controlId="validate-phone">
                                <Form.Label className={styles.contactLabel}>
                                    Phone Number
                                </Form.Label>
                                <FormControl
                                    aria-label="Phone"
                                    aria-describedby="contact-phone"
                                    placeholder="(555) 867-5309 (Optional)"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                sm={12}
                                controlId="validate-subject">
                                <Form.Label className={styles.contactLabel}>
                                    Subject
                                </Form.Label>
                                <FormControl
                                    aria-label="Subject"
                                    aria-describedby="contact-subject"
                                    placeholder="Subject"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                sm={12}
                                className={styles.contactMessageCol}
                                controlId="validate-message">
                                <Form.Label className={styles.contactLabel}>
                                    Message
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className={styles.contactMessageForm}
                                    placeholder="How can we help you?"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}
export default ContactForm;
