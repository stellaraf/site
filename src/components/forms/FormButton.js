import React from "react";
import { Button, Spinner } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import styles from "components/forms/styles.module.scss";

function FormButton({ status, message }) {
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
            <Button type={"submit"} disabled>
                <FiAlertTriangle size={16} className={styles.formBtnStatus} />
                <span className={styles.formBtnStatusText}>Error</span>
            </Button>
            <Slide bottom duration={300}>
                <p className={styles.formError}>{message}</p>
            </Slide>
        </>
    );
    const contentSuccess = () => (
        <>
            <Button type={"submit"}>
                <FiCheck size={16} className={styles.formBtnStatus} />
                <span className={styles.formBtnStatusText}>Submitted</span>
            </Button>
            <Slide bottom duration={300}>
                <p className={styles.formSuccess}>{message}</p>
            </Slide>
        </>
    );
    const contentReady = () => <Button type={"submit"}>Submit</Button>;
    const contentDefault = () => (
        <Button type={"submit"} disabled>
            Submit
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
        case "initial":
            // btnContent = contentDefault();
            btnContent = contentReady();
            break;
        default:
            btnContent = contentDefault();
    }
    // switch (valid) {
    //     case true:
    //         btnContent = contentReady();
    //         break;
    //     default:
    //         btnContent = contentDefault();
    // }
    return btnContent;
}

export default FormButton;
