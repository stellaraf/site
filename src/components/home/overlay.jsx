import React, { Component } from "react";
import styles from "components/home/styles.module.scss";
import Universe from "components/stars";

class Overlay extends Component {
  render(props) {
    return (
      <div className={styles.overlayBackground}>
        <Universe />
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;
