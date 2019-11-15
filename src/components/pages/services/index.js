import React from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { Display } from "components/styled/text";
import PageTitle from "hooks/PageTitle";
import bp from "utils/breakpoints";
import theme from "styles/exports.module.scss";
import site from "config";
import NextSection from "components/next";
import { InfoSections } from "components/pages/services/Sections";

const fadeInAnimation = keyframes`${fadeIn}`;

const TitleSection = styled.section`
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    margin-top: 96px;
    margin-bottom: 4rem;
    text-align: center;
    animation: 1s ${fadeInAnimation};
    ${bp.down("sm")} {
        margin-left: auto;
        margin-right: auto;
        margin-top: 96px;
        margin-bottom: 5vh;
        max-width: 90%;

        & > h1 {
            ${bp.up("lg")} {
                font-size: ${theme.display2Size};
            }
            ${bp.down("lg")} {
                font-size: ${theme.display3Size};
            }
            ${bp.down("sm")} {
                font-size: ${theme.display4Size};
            }
        }
    }
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.page = site.pages.services;
    }
    render() {
        return (
            <>
                <PageTitle page="Dedicated IT Services" />
                <TitleSection>
                    <Display.Title>{this.page.title}</Display.Title>
                    <Display.Subtitle>{this.page.subtitle}</Display.Subtitle>
                </TitleSection>
                <InfoSections />
                <NextSection directionBottom="leftUp" directionTop="rightDown" marginTop="0" />
            </>
        );
    }
}
