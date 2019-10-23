import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { siteConfig } from "config";

class Copyright extends Component {
  render() {
    return (
      <Row
        style={{
          width: "100%",
          marginBottom: "0",
          paddingBottom: "0.5rem",
          paddingTop: "3rem",
          justifyContent: "center"
        }}
      >
        <p
          className="text-muted"
          style={{
            textAlign: "center",
            fontSize: "0.65rem",
            marginBottom: "0"
          }}
        >{`Copyright © ${new Date().getFullYear()} ${siteConfig.legalName}`}</p>
      </Row>
    );
  }
}
export default Copyright;
