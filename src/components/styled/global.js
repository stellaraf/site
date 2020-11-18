import { createGlobalStyle } from "styled-components";
import theme from "styles/exports.module.scss";
import bp from "utils/breakpoints";

const GlobalStyle = createGlobalStyle`

    *::selection {
        color: ${theme.stDark};
        background-color: ${theme.stWhite};
    }
    *::-moz-selection {
        color: ${theme.stDark};
        background-color: ${theme.stWhite};
    }
    
    body {
        ${props => (props.mobileNavOpen ? "position: fixed !important;" : null)}
    }
    main {
        ${bp.up("md")} {
            margin-top: 86px;
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
