import { createGlobalStyle } from "styled-components";
import bp from "utils/breakpoints";

const GlobalStyle = createGlobalStyle`
    body {
        ${props => (props.mobileNavOpen ? "position: fixed !important;" : null)}
    }
    main {
        ${bp.up("md")} {
            margin-top: 128px;
        }
        ${bp.down("md")} {
            margin-top: 86px;
        }
    }

    .hidden {
        pointer-events: none !important;
        visibility: hidden !important;
        display: none !important;
    }
`;

export default GlobalStyle;
