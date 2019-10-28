import React from "react";
import { Button, Spinner } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import styles from "components/forms/styles.module.scss";

function FormButton({ status, formError }) {
    const contentLoading = () => (
        <>
            <Spinner
                animation="border"
                as={"span"}
                size={"sm"}
                role="status"
                className={styles.formBtnStatus}
            />
            <span className={styles.formBtnStatusText}>Submitting...</span>
        </>
    );
    const contentError = () => (
        <>
            <Button type="submit">
                <FiAlertTriangle size={16} className={styles.formBtnStatus} />
                <span className={styles.formBtnStatusText}>Error</span>
            </Button>
            <Slide bottom duration={300}>
                <p className={styles.formError}>{formError}</p>
            </Slide>
        </>
    );
    const contentSuccess = () => (
        <>
            <FiCheck size={16} className={styles.formBtnStatus} />
            <span className={styles.formBtnStatusText}>Submitted</span>
        </>
    );
    let btnContent;
    switch (status) {
        case "loading":
            btnContent = contentLoading();
            break;
        case "submitted":
            btnContent = contentSuccess();
            break;
        case "error":
            btnContent = contentError();
            return contentError();
        default:
            btnContent = "Submit";
    }
    return <Button type="submit">{btnContent}</Button>;
}

export default FormButton;
