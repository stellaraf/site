import React from "react";
import styled from "styled-components";
import { Card, Container, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router";
import { FiArrowRight } from "react-icons/fi";

import { AngleSection } from "components/styled/sections";
// import bp from "utils/breakpoints";
import theme from "styles/exports.module.scss";
import site from "config";

// const RevealWrapper = styled.div`
//     display: flex !important;
//     flex-grow: 1 !important;
// `;

const Next = {
    Wrapper: styled(Card)`
        display: block !important;
        text-align: left;
        flex: 0 1 auto !important;
        flex-direction: column;
        width: ${theme.nextCardWidth};
        height: ${theme.nextCardHeight};
        background-color: ${theme.nextCardBackground} !important;
        color: ${theme.nextCardColor} !important;
        border: 1px solid ${theme.nextCardBorderColor} !important;
        &:hover {
            background-color: ${theme.nextCardBackgroundHover} !important;
            transition: color 0.15s ease-in-out,
                background-color 0.15s ease-in-out,
                border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    `,
    Top: styled.div`
        display: block;
        justify-content: space-between;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 3%;
        padding-top: 5%;
        max-height: 35%;
        height: 100%;
    `,
    Bottom: styled.div`
        display: block;
        padding-top: 6%;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 5%;
        max-height: 65%;
        height: 100%;
    `,
    Title: styled.h5`
        margin-bottom: 0.5rem;
        flex: 1 0 auto;
        color: ${theme.nextCardColor};
        width: 100%;
    `,
    Subtitle: styled.a`
        font-weight: ${theme.fontWeightBold};
        font-size: ${theme.fontSizeSm};
        width: 100%;
        color: ${theme.nextCardSubtitleColor};
        &:hover {
            text-decoration: none !important;
            color: ${theme.nextCardSubtitleColor} !important;
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
            background-color: rgba(0, 0, 0, 0);
        }
    `,
    Lead: styled.p`
        flex: 1 0 auto;
        color: ${theme.nextCardColor};
        width: 100%;
    `
};

// const StyledCard = styled(Card)`
//     background-color: ${theme.nextCardBackground} !important;
//     color: ${theme.nextCardColor} !important;
//     text-align: center;
//     flex-grow: 1;
//     justify-content: center;
//     min-height: ${theme.nextCardHeight};
//     height: 100%;
//     max-width: ${theme.nextCardWidth};
//     width: 100%;
//     border-color: ${theme.nextCardBorder};
//     border: 1px solid transparent !important;
//     ${bp.down("md")} {
//         min-height: ${theme.featureCardHeightSm};
//     }
//     &:hover {
//         background-color: ${theme.nextCardBackgroundHover} !important;
//         transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
//             border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//     }
// `;

// const NextTop = styled.div`
//     padding: ${theme.nextCardPaddingY} ${theme.nextCardPaddingX} !important;
// `;

// const NextBottom = styled.div`
//     padding-right: ${theme.nextCardPaddingX} !important;
//     padding-left: ${theme.nextCardPaddingX} !important;
//     padding-bottom: ${theme.nextCardPaddingY} !important;
// `;

// const NextCardRow = styled(CardDeck)`
//     justify-content: center !important;
//     width: 100%;
// `;

// const NextCardText = styled.a`
//     color: ${theme.nextCardColor} !important;
//     &:hover {
//         text-decoration: none !important;
//         color: unset !important;
//     }

//     &::after {
//         position: absolute;
//         top: 0;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         z-index: 1;
//         pointer-events: auto;
//         content: "";
//         background-color: rgba(0, 0, 0, 0);
//     }
// `;

function NextCard({
    title = "Placeholder Title",
    subtitle = "Placeholder Text",
    lead = "Placeholder Lead",
    link = "/"
}) {
    return (
        <Next.Wrapper>
            <Next.Top>
                <Next.Lead>
                    {lead}
                    <FiArrowRight style={{ marginLeft: "0.5rem" }} />
                </Next.Lead>
            </Next.Top>
            <Next.Bottom>
                <Next.Title>{title}</Next.Title>
                <LinkContainer to={link}>
                    <Next.Subtitle href={link}>{subtitle}</Next.Subtitle>
                </LinkContainer>
            </Next.Bottom>
        </Next.Wrapper>
    );
}

const SectionContainer = styled(Container)`
    min-height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const getNextPages = location => {
    const allPages = site.pages;
    const pages = [];
    for (let page in allPages) {
        if (
            allPages[page]["includeNext"] &&
            allPages[page]["link"] !== location
        ) {
            pages.push(allPages[page]);
        }
    }
    return pages;
};

// function NextSection(props) {
//     const location = useLocation();
//     const nextPages = getNextPages(location.pathname);
//     return (
//         <LineSection direction="leftUp" color={theme.stSecondary}>
//             <SectionContainer>
//                 <NextCardRow>
//                     {nextPages.map((page, i) => {
//                         return (
//                             <NextCard
//                                 key={i}
//                                 title={page.title}
//                                 subtitle={page.subtitle}
//                                 lead={page.nextLead}
//                                 link={page.link}
//                             />
//                         );
//                     })}
//                 </NextCardRow>
//             </SectionContainer>
//         </LineSection>
//     );
// }

const NextTitle = styled.h3`
    color: ${props => props.color};
    margin-top: 1vh;
    margin-bottom: 3vh;
`;

function NextSection(props) {
    const location = useLocation();
    const nextPages = getNextPages(location.pathname);
    return (
        <AngleSection
            directionTop="leftDown"
            directionBottom="rightUp"
            backgroundColor={theme.stSecondary}>
            <SectionContainer>
                <Row>
                    <Col sm={12}>
                        <NextTitle color={theme.stDark}>
                            Ready for more?
                        </NextTitle>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={4}>
                        {nextPages.map((page, i) => {
                            return (
                                <NextCard
                                    key={i}
                                    title={page.title}
                                    subtitle={page.subtitle}
                                    lead={page.nextLead}
                                    link={page.link}
                                />
                            );
                        })}
                    </Col>
                </Row>
            </SectionContainer>
        </AngleSection>
    );
}

export default NextSection;
