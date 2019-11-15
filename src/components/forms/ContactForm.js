import React, { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "components/forms/FormField";
import FormButton from "components/forms/FormButton";
import { SalesforceLead } from "components/forms/handlers";
import site from "config";
import styles from "components/forms/styles.module.scss";
import styled, { keyframes } from "styled-components";
import { pulse } from "react-animations";

const pulseAnimation = keyframes`${pulse}`;

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
    const [submitMsg, setSubmitMsg] = useState(undefined);

    return (
        <Formik
            initialStatus={"initial"}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                actions.setStatus("loading");
                SalesforceLead(values, response => {
                    actions.setStatus(response.status);
                    setSubmitMsg(site.contactForm.message[response.status]);
                    actions.setSubmitting(false);
                });
                setTimeout(actions.resetForm, site.contactForm.resetTimeout);
            }}
            initialValues={{
                contactName: "",
                contactCompany: "",
                contactEmail: "",
                contactPhone: "",
                contactSubject: "",
                contactMessage: ""
            }}>
            {({ handleBlur, handleChange, handleReset, handleSubmit, values, status }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <FormField
                            fieldStyle={{ as: Col, sm: 12, md: 6 }}
                            id={"contactName"}
                            label={"Name"}
                            name={"contactName"}
                            placeholder={"First & Last Name"}
                            value={values.contactName}
                            fieldEvents={{
                                onChange: handleChange,
                                onBlur: handleBlur,
                                onReset: handleReset
                            }}
                        />
                        <FormField
                            fieldStyle={{ as: Col, sm: 12, md: 6 }}
                            id={"contactCompany"}
                            label={"Company"}
                            name={"contactCompany"}
                            placeholder={"Company Name"}
                            value={values.contactCompany}
                            fieldEvents={{
                                onChange: handleChange,
                                onBlur: handleBlur,
                                onReset: handleReset
                            }}
                        />
                    </Form.Row>
                    <Form.Row>
                        <FormField
                            fieldStyle={{ as: Col, sm: 12, md: 6 }}
                            id={"contactEmail"}
                            label={"Email Address"}
                            name={"contactEmail"}
                            placeholder={"name@example.tld"}
                            value={values.contactEmail}
                            fieldEvents={{
                                onChange: handleChange,
                                onBlur: handleBlur,
                                onReset: handleReset
                            }}
                        />
                        <FormField
                            fieldStyle={{ as: Col, sm: 12, md: 6 }}
                            id={"contactPhone"}
                            label={"Phone Number"}
                            name={"contactPhone"}
                            placeholder={"(555) 867-5309 (Optional)"}
                            value={values.contactPhone}
                            fieldEvents={{
                                onChange: handleChange,
                                onBlur: handleBlur,
                                onReset: handleReset
                            }}
                        />
                    </Form.Row>
                    <Form.Row>
                        <FormField
                            fieldStyle={{ as: Col, sm: 12 }}
                            id={"contactSubject"}
                            label={"Subject"}
                            name={"contactSubject"}
                            placeholder={"Subject"}
                            value={values.contactSubject}
                            fieldEvents={{
                                onChange: handleChange,
                                onBlur: handleBlur,
                                onReset: handleReset
                            }}
                        />
                    </Form.Row>
                    <Form.Row>
                        <FormField
                            fieldStyle={{
                                as: Col,
                                sm: 12,
                                className: styles.contactMessageForm
                            }}
                            type={"textarea"}
                            id={"contactMessage"}
                            label={"Message"}
                            name={"contactMessage"}
                            placeholder={"How can we help you?"}
                            value={values.contactMessage}
                            fieldEvents={{
                                onChange: handleChange,
                                onBlur: handleBlur,
                                onReset: handleReset
                            }}
                        />
                    </Form.Row>
                    <FormButton status={status} message={submitMsg} />
                </Form>
            )}
        </Formik>
    );
}

const FormCard = styled(Card)`
    animation: 0.5s ${pulseAnimation};

    .invalid-feedback {
        text-align: left;
        margin-left: 0.25rem;
    }
`;

function ContactForm() {
    return (
        <FormCard className="contact-form">
            <Card.Body>
                <RawForm />
            </Card.Body>
        </FormCard>
    );
}
export default ContactForm;
