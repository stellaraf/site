import React from "react";
import { Card, Col } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { slideInRight } from "react-animations";
import Flag from "components/pages/cloud/Flags";
import theme from "styles/exports.module.scss";

const slideInRightAnimation = keyframes`${slideInRight}`;

const LocCard = styled(Col)`
    display: flex;
    justify-content: center;
    animation: ${props => props.delay}ms ${slideInRightAnimation};

    & .card {
        display: block !important;
        text-align: left;
        flex: 0 1 auto !important;
        flex-direction: column;
        width: ${theme.locCardWidth};
        height: ${theme.locCardHeight};
        background-color: ${theme.locCardBackground} !important;
        box-shadow: rgba(0, 0, 0, 0.5) 0px, 5px, 30px, 0px;
        margin-top: 3vh;
    }

    & .card .loc-card-top {
        display: block;
        justify-content: space-between;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 10%;
        padding-top: 5%;
        max-height: 60%;
        height: 100%;
    }

    & .card .loc-card-bottom {
        display: flex;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 5%;
        max-height: 40%;
        height: 100%;
    }

    & .card .loc-card-top h5.loc-card-title {
        display: flex;
        align-self: center;
        align-items: center;
        margin-bottom: -0.5rem;
        flex: 1 0 auto;
        color: ${theme.locCardTitleColor};
        vertical-align: middle;
        width: 100%;
    }

    & .card .loc-card-top .loc-card-subtitle {
        display: block;
        font-weight: ${theme.fontWeightBold};
        font-size: ${theme.fontSizeSm};
        width: 100%;
        color: ${theme.locCardSubtitleColor};
    }

    & .card .loc-card-bottom .loc-card-text {
        font-size: ${theme.fontSizeSm};
        font-weight: ${theme.fontWeightLight};
        color: ${theme.locCardTextColor};
        margin-top: auto;
        margin-bottom: 0.5rem;
        align-self: end;
    }
`;

function LocationCard({ location, title, subtitle, text, flag, ...props }) {
    return (
        <LocCard {...props}>
            <Card>
                <div className="loc-card-top">
                    <h5 className="loc-card-title">
                        {title}
                        <Flag name={location} />
                    </h5>
                    <p className="loc-card-subtitle">{subtitle}</p>
                </div>
                <div className="loc-card-bottom">
                    {props.children || <p className="loc-card-text">{text}</p>}
                </div>
            </Card>
        </LocCard>
    );
}

export { LocationCard };
