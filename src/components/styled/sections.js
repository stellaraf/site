import styled from "styled-components";
import theme from "styles/exports.module.scss";

const HeroContainer = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: ${theme.breakSm}) {
        max-width: ${theme.containerMaxWidthSm};
    }
    @media (min-width: ${theme.breakMd}) {
        max-width: ${theme.containerMaxWidthMd};
    }
    @media (min-width: ${theme.breakLg}) {
        max-width: ${theme.containerMaxWidthLg};
    }
    @media (min-width: ${theme.breakXl}) {
        max-width: ${theme.containerMaxWidthXl};
    }
`;

const HeroSection = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    align-self: center;
    margin-top: 3rem;
    margin-bottom: 4rem;
    @media (min-width: ${theme.breakSm}) {
        // max-width: ${theme.containerMaxWidthSm};
        height: 100vh;
        padding-top: 60px;
    }
    @media (min-width: ${theme.breakMd}) {
        // max-width: ${theme.containerMaxWidthMd};
        height: 80vh;
    }
    @media (min-width: ${theme.breakLg}) {
        // max-width: ${theme.containerMaxWidthLg};
        height: 50vh;
    }
    @media (min-width: ${theme.breakXl}) {
        // max-width: ${theme.containerMaxWidthXl};
        height: 40vh;
    }
`;

export { HeroContainer, HeroSection };
