import React from "react";
import styled from "styled-components";
import PageTitle from "hooks/PageTitle";
import { Display } from "components/styled/text";
import bp from "utils/breakpoints";
import theme from "styles/exports.module.scss";
import site from "config";

const TitleSection = styled.section`
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    margin-top: 96px;
    margin-bottom: 4rem;
    text-align: center;
    ${bp.down("md")} {
        margin-top: 96px;
        margin-bottom: 1rem;

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
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.page = site.pages.about;
    }
    render() {
        return (
            <>
                <PageTitle page="What Makes Us so Stellar?" />
                <TitleSection>
                    <Display.Title>{this.page.title}</Display.Title>
                    <Display.Subtitle>{this.page.subtitle}</Display.Subtitle>
                </TitleSection>
            </>
        );
    }
}
