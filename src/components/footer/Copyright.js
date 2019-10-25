import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { siteConfig } from "config";
import styles from "components/footer/styles.module.scss";

class Copyright extends Component {
    render() {
        return (
            <Row className={styles.copyrightRow}>
                <p
                    className={
                        styles.copyrightText
                    }>{`Copyright © ${new Date().getFullYear()} ${
                    siteConfig.legalName
                }`}</p>
            </Row>
        );
    }
}
export default Copyright;
