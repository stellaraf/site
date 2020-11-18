import React from "react";
import { Form } from "react-bootstrap";
import { ErrorMessage, useFormikContext } from "formik";
import styles from "components/forms/styles.module.scss";

function FormField({
    fieldStyle = undefined,
    id,
    label,
    name,
    placeholder,
    value,
    type = "input",
    fieldEvents = undefined,
    ...props
}) {
    const { errors, touched } = useFormikContext();
    return (
        <Form.Group id={id} {...fieldStyle}>
            <Form.Label id={`${id}-label`} className={styles.formLabel}>
                {label}
            </Form.Label>
            <Form.Control
                as={type}
                name={name}
                id={`${id}-field`}
                placeholder={placeholder}
                isValid={touched[name] && !errors[name]}
                isInvalid={touched[name] && errors[name]}
                aria-label={label}
                aria-describedby={`${id}-label`}
                value={value}
                {...fieldEvents}
                {...props}
            />
            <ErrorMessage
                name={name}
                component={Form.Control.Feedback}
                type={"invalid"}
            />
        </Form.Group>
    );
}
export default FormField;
