import React from "react";
import styled from "styled-components";
import Particles from "react-particles-js";
import site from "config";

const Stars = styled(Particles)`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
`;

export default function() {
    return <Stars params={site.particles} />;
}
