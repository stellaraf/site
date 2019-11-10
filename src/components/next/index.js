import React from "react";
import styled from "styled-components";
import { Card, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { useLocation } from "react-router";

import { AngleSection } from "components/styled/sections";
// import bp from "utils/breakpoints";
import theme from "styles/exports.module.scss";
import site from "config";

const getNextPages = location => {
    const allPages = site.pages;
    const pages = [];
    for (let page in allPages) {
        if (allPages[page]["includeNext"] && allPages[page]["link"] !== location) {
            pages.push(allPages[page]);
        }
    }
    return pages;
};

const StyledCard = styled(Card)`
    display: block !important;
    position: relative;
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
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    & > .next-card-text {
        display: block;
        padding-left: 6%;
        padding-bottom: 6%;
        padding-top: 6%;
        padding-right: 32px;
        height: 100%;
    }

    & > .next-card-icon {
        position: absolute;
        width: 32px;
        top: 0;
        right: 0;
        padding-top: 71.5px;
        padding-bottom: 71.5px;
    }

    & > .next-card-top {
        display: block;
        justify-content: space-between;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 3%;
        padding-top: 5%;
        max-height: 35%;
        height: 100%;
    }

    & > .next-card-bottom {
        display: block;
        padding-top: 6%;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 5%;
        max-height: 65%;
        height: 100%;
    }

    & h5.next-card-title {
        margin-bottom: 0.5rem;
        flex: 1 0 auto;
        color: ${theme.nextCardColor};
        width: 100%;
    }

    & a.next-card-subtitle {
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
    }

    & p.next-card-lead {
        flex: 1 0 auto;
        color: ${theme.nextCardColor};
        width: 100%;
    }
`;

function NextCard({
    title = "Placeholder Title",
    subtitle = "Placeholder Text",
    lead = "Placeholder Lead",
    link = "/"
}) {
    return (
        <StyledCard>
            <div className="next-card-text">
                <p className="next-card-lead">{lead}</p>
                <h5 className="next-card-title">{title}</h5>
                <Link className="next-card-subtitle" to={link}>
                    {subtitle}
                </Link>
            </div>
            <div className="next-card-icon">
                <FiChevronRight style={{ width: "32px", height: "32px" }} color={theme.stDark} />
            </div>
        </StyledCard>
    );
}

// function NextCard({
//     title = "Placeholder Title",
//     subtitle = "Placeholder Text",
//     lead = "Placeholder Lead",
//     link = "/"
// }) {
//     return (
//         <StyledCard>
//             <div className="next-card-top">
//                 <p className="next-card-lead">
//                     {lead}
//                     <FiArrowRight style={{ marginLeft: "0.5rem" }} />
//                 </p>
//             </div>
//             <div className="next-card-bottom">
//                 <h5 className="next-card-title">{title}</h5>
//                 <Link className="next-card-subtitle" to={link}>
//                     {subtitle}
//                 </Link>
//             </div>
//         </StyledCard>
//     );
// }

const SectionContainer = styled(Container)`
    min-height: 25vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h3.next-section-title {
        color: ${theme.stDark};
        margin-top: 1vh;
        margin-bottom: 3vh;
    }
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
                        <h3 className="next-section-title">{site.global.nextSectionTitle}</h3>
                    </Col>
                </Row>
                <Row>
                    {nextPages.map((page, i) => {
                        return (
                            <Col sm={12} md={6} key={i}>
                                <NextCard
                                    title={page.title}
                                    subtitle={page.subtitle}
                                    lead={page.nextLead}
                                    link={page.link}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </SectionContainer>
        </AngleSection>
    );
}

export default NextSection;
