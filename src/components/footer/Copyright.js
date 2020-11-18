import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { siteConfig } from "config";
import styles from "components/footer/styles.module.scss";

class Copyright extends Component {
    render() {
        return (
            <Row className={styles.copyrightRow}>
                <Col>
                    <p
                        className={
                            styles.copyrightText
                        }>{`Copyright © ${new Date().getFullYear()} ${
                        siteConfig.legalName
                    }`}</p>
                </Col>
            </Row>
        );
    }
}
export default Copyright;
