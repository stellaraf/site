import React, { Component } from "react";
import Universe from "components/stars";

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
