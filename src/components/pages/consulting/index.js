import React from "react";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { Link } from "react-router-dom";
import { Display } from "components/styled/text";
import bp from "utils/breakpoints";
import theme from "styles/exports.module.scss";
import site from "config";
import NextSection from "components/next";
import { InfoSections } from "components/pages/consulting/Sections";

const fadeInAnimation = keyframes`${fadeIn}`;

const TitleSection = styled.section`
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    margin-top: 96px;
    margin-bottom: 4rem;
    text-align: center;
    animation: 1s ${fadeInAnimation};
    ${bp.down("md")} {
        margin-top: 96px;
        margin-bottom: 5vh;
        margin-left: auto;
        margin-right: auto;
        max-width: 90%;

        & > h1 {
            ${bp.up("lg")} {
                font-size: ${theme.display2Size};
            }
            ${bp.down("md")} {
                font-size: ${theme.display3Size};
            }
            ${bp.down("sm")} {
                font-size: ${theme.display4Size};
            }
        }
    }
    & p.title-text {
        margin-top: 5vh;
        font-size: ${theme.fontSizeLg};
    }
    & a {
        color: ${theme.stWhite};
        text-decoration: none;

        :hover {
            color: ${theme.stSecondary};
        }
    }
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.page = site.pages.consulting;
    }
    render() {
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{site.pages.consulting.title}</title>
                    <link rel="canonical" href="https://stellar.tech/consulting" />
                    <meta name="keywords" content={site.pages.consulting.tags} />
                    <meta name="robots" content="index,follow" />
                </Helmet>
                <TitleSection>
                    <Display.Title>{this.page.title}</Display.Title>
                    <Display.Subtitle>{this.page.subtitle}</Display.Subtitle>
                    <p className="title-text">
                        As engineers with enough expertise to{" "}
                        <Link to="/cloud">build our own cloud</Link>, we know a thing or two about
                        how to build IT infrastructure.{<br />} Here are some of the areas we're
                        dangerously good at.
                    </p>
                </TitleSection>
                <InfoSections />
                <NextSection marginTop="0" />
            </>
        );
    }
}
