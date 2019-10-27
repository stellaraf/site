import React from "react";
import { Button, Card, Col, Form, FormControl } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { SalesforceLead } from "components/forms/handlers";
import styles from "components/forms/styles.module.scss";

const phoneRegExp = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext| x | ext | ext.| ext. )\d{1,5}){0,1}$/;

const validationSchema = Yup.object({
    contactName: Yup.string()
        .min(2, "Must be between 2 and 64 characters")
        .max(64, "Must be between 2 and 64 characters")
        .required("Required"),
    contactCompany: Yup.string()
        .min(2, "Must be between 2 and 64 characters")
        .max(64, "Must be between 2 and 64 characters")
        .required("Required"),
    contactEmail: Yup.string()
        .email("Invalid email address")
        .max(128, "Must be 128 characters or less")
        .required("Required"),
    contactPhone: Yup.string().matches(phoneRegExp, "Invalid phone number"),
    contactSubject: Yup.string().max(128, "Must be 128 characters or less"),
    contactMessage: Yup.string()
        .max(1000, "Must be 1000 characters or less")
        .required("Required")
});

function RawForm() {
    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    console.log(
                        `Submitting: ${JSON.stringify(values, null, 2)}`
                    );
                    const response = SalesforceLead(values);
                    console.log(`Response: ${response}`);
                    if (response) {
                        setSubmitting(false);
                    }
                }, 400);
            }}
            // onSubmit={console.log}
            initialValues={{
                contactName: "",
                contactCompany: "",
                contactEmail: "",
                contactPhone: "",
                contactSubject: "",
                contactMessage: ""
            }}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            sm={12}
                            md={6}
                            controlId="contactName">
                            <Form.Label
                                id="contactName"
                                className={styles.contactLabel}>
                                Name
                            </Form.Label>
                            <FormControl
                                aria-label="Name"
                                aria-describedby="contactName"
                                placeholder="First & Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={
                                    touched.contactName && !errors.contactName
                                }
                                isInvalid={!!errors.contactName}
                                value={values.contactName}
                            />
                            {touched.contactName && errors.contactName ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.contactName}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={12}
                            md={6}
                            controlId="contactCompany">
                            <Form.Label
                                id="contactCompany"
                                className={styles.contactLabel}>
                                Company
                            </Form.Label>
                            <FormControl
                                aria-label="Company"
                                aria-describedby="contactCompany"
                                placeholder="Company Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={
                                    touched.contactCompany &&
                                    !errors.contactCompany
                                }
                                isInvalid={!!errors.contactCompany}
                                value={values.contactCompany}
                            />
                            {touched.contactCompany && errors.contactCompany ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.contactCompany}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            sm={12}
                            md={6}
                            controlId="contactEmail">
                            <Form.Label
                                id="contactEmail"
                                className={styles.contactLabel}>
                                Email Address
                            </Form.Label>
                            <FormControl
                                aria-label="Email Address"
                                aria-describedby="contactEmail"
                                placeholder="name@example.tld"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={
                                    touched.contactEmail && !errors.contactEmail
                                }
                                value={values.contactEmail}
                                isInvalid={!!errors.contactEmail}
                            />
                            {touched.contactEmail && errors.contactEmail ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.contactEmail}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={12}
                            md={6}
                            controlId="contactPhone">
                            <Form.Label
                                id="contactPhone"
                                className={styles.contactLabel}>
                                Phone Number
                            </Form.Label>
                            <FormControl
                                aria-label="Phone Number"
                                aria-describedby="contactPhone"
                                placeholder="(555) 867-5309 (Optional)"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={
                                    touched.contactPhone && !errors.contactPhone
                                }
                                value={values.contactPhone}
                                isInvalid={!!errors.contactPhone}
                            />
                            {touched.contactPhone && errors.contactPhone ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.contactPhone}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            sm={12}
                            md={12}
                            controlId="contactSubject">
                            <Form.Label
                                id="contactSubject"
                                className={styles.contactLabel}>
                                Subject
                            </Form.Label>
                            <FormControl
                                aria-label="Subject"
                                aria-describedby="contactSubject"
                                placeholder="Subject"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={
                                    touched.contactSubject &&
                                    !errors.contactSubject
                                }
                                value={values.contactSubject}
                                isInvalid={!!errors.contactSubject}
                            />
                            {touched.contactSubject && errors.contactSubject ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.contactSubject}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            sm={12}
                            className={styles.contactMessageCol}
                            controlId="contactMessage">
                            <Form.Label
                                id="contactMessage"
                                className={styles.contactLabel}>
                                Message
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                aria-label="Message"
                                aria-describedby="contactMessage"
                                className={styles.contactMessageForm}
                                placeholder="How can we help you?"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={
                                    touched.contactMessage &&
                                    !errors.contactMessage
                                }
                                isInvalid={!!errors.contactMessage}
                                value={values.contactMessage}
                            />
                            {touched.contactMessage && errors.contactMessage ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.contactMessage}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
}

function ContactForm() {
    return (
        <Card>
            <Card.Body>
                <RawForm />
            </Card.Body>
        </Card>
    );
}
export default ContactForm;
