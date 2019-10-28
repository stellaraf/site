import React from "react";
import { Button, Spinner } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import styles from "components/forms/styles.module.scss";

function FormButton({ status, formError }) {
    const contentLoading = () => (
        <Button type={"submit"} disabled>
            <Spinner
                animation="border"
                as={"span"}
                size={"sm"}
                role="status"
                className={styles.formBtnStatus}
            />
            <span className={styles.formBtnStatusText}>Submitting...</span>
        </Button>
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
        <Button type={"submit"}>
            <FiCheck size={16} className={styles.formBtnStatus} />
            <span className={styles.formBtnStatusText}>Submitted</span>
        </Button>
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
            break;
        default:
            btnContent = <Button type={"submit"}>Submit</Button>;
    }
    return btnContent;
}

export default FormButton;
