import React, { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Pulse from "react-reveal/Pulse";

import FormField from "components/forms/FormField";
import FormButton from "components/forms/FormButton";
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

async function sendData(data) {
    // const response = {
    //     status: "success",
    //     //content: "Major problems"
    //     content: "Success!"
    // };
    const response = SalesforceLead(data);
    return response;
}

function RawForm() {
    const [formError, setFormError] = useState(undefined);

    return (
        <Formik
            initialStatus={"initial"}
            validationSchema={validationSchema}
            onSubmit={async (
                values,
                { setSubmitting, resetForm, setStatus }
            ) => {
                // const updateForm = (
                //     submitting = false,
                //     status,
                //     resetTimeout
                // ) => {
                //     setSubmitting(submitting);
                //     setStatus(status);
                //     setTimeout(() => {
                //         resetForm();
                //         setStatus("initial");
                //     }, resetTimeout);
                // };
                setStatus("loading");
                // let sendData = new Promise((resolve, reject) => {
                //     const response = {
                //         status: "success",
                //         //content: "Major problems"
                //         content: "Success!"
                //     };
                //     // const response = SalesforceLead(values);
                //     if (response.status === "success") {
                //         resolve(response.content);
                //     } else if (response.status === "failure") {
                //         reject(response.content);
                //     } else if (response === undefined || response === null) {
                //         reject("No Response");
                //     }
                // });
                // const formSubmission = sendForm(values);
                const response = sendData(values);
                response.then(
                    res => {
                        console.info(res);
                        setStatus("submitted");
                        setSubmitting(false);
                        setTimeout(resetForm(), 2000);
                    },
                    rej => {
                        console.error(rej);
                        setStatus("error");
                        setFormError(rej);
                        setSubmitting(false);
                        setTimeout(resetForm(), 2000);
                    }
                );

                // setTimeout(() => {
                //     let errorMsg;
                //     if (
                //         response.status === undefined ||
                //         response.status === null
                //     ) {
                //         errorMsg = "No Response";
                //         console.error(errorMsg);
                //         setFormError(errorMsg);
                //         updateForm();
                //     } else if (response.status === "failure") {
                //         errorMsg = response.content;
                //         setFormError(errorMsg);
                //         updateForm();
                //     } else {
                //         console.info(response.content);
                //         updateForm({
                //             status: "submitted",
                //             resetTimeout: 300
                //         });
                //     }
                // }, 5000);
            }}
            initialValues={{
                contactName: "",
                contactCompany: "",
                contactEmail: "",
                contactPhone: "",
                contactSubject: "",
                contactMessage: ""
            }}>
            {({
                handleBlur,
                handleChange,
                handleReset,
                handleSubmit,
                values,
                status
            }) => (
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
                    <FormButton status={status} errorMsg={formError} />
                </Form>
            )}
        </Formik>
    );
}

function ContactForm() {
    return (
        <Pulse duration={300}>
            <Card>
                <Card.Body>
                    <RawForm />
                </Card.Body>
            </Card>
        </Pulse>
    );
}
export default ContactForm;
