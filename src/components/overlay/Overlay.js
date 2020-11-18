import React, { Component } from "react";
import Universe from "components/stars";
// import styles from "components/overlay/styles.module.scss";

class Overlay extends Component {
    render(props) {
        return (
            <>
                <Universe />
                {this.props.children}
            </>
        );
    }
}

export default Overlay;
