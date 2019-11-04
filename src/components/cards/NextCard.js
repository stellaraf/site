import React from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import site from "config";
import theme from "styles/exports.module.scss";

const Next = {
    Wrapper: styled(Card)`
        display: block !important;
        text-align: left;
        flex: 0 1 auto !important;
        flex-direction: column;
        width: ${theme.nextCardWidth};
        height: ${theme.nextCardHeight};
        background-color: ${theme.nextCardBackground} !important;
    `,
    Top: styled.div`
        display: block;
        justify-content: space-between;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 10%;
        padding-top: 5%;
        max-height: 60%;
        height: 100%;
    `,
    Bottom: styled.div`
        display: flex;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 5%;
        max-height: 40%;
        height: 100%;
    `,
    Title: styled.h5`
        font-weight: ${theme.displayWeight};
        display: flex;
        align-self: center;
        align-items: center;
        margin-bottom: -0.5rem;
        flex: 1 0 auto;
        color: ${theme.locCardTitleColor};
        vertical-align: middle;
        width: 100%;
    `,
    Subtitle: styled.p`
        display: block;
        font-weight: ${theme.fontWeightBold};
        font-size: ${theme.fontSizeSm};
        width: 100%;
        color: ${theme.nextCardSubtitleColor};
    `,
    Text: styled.p`
        font-size: ${theme.fontSizeSm};
        font-weight: ${theme.fontWeightLight};
        color: ${theme.nextCardColor};
        margin-top: auto;
        margin-bottom: 0.5rem;
        align-self: end;
    `
};

const LeadText = styled.a`
    &:hover {
        text-decoration: none !important;
        color: unset !important;
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        pointer-events: auto;
        content: "";
    }
`;

function NextCard({ page }) {
    console.log(page);
    let pageAttrs = site.pages[page];
    console.log(pageAttrs);
    return (
        <Next.Wrapper>
            <Next.Top>
                <Next.Title>{pageAttrs.title}</Next.Title>
            </Next.Top>
            <Next.Bottom>
                <Next.Text>Test Text</Next.Text>
            </Next.Bottom>
        </Next.Wrapper>
    );
}

export default NextCard;
