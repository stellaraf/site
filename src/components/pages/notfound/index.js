import React from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import theme from "styles/exports.module.scss";
import site from "config";
import bp from "utils/breakpoints";
import { Display } from "components/styled/text";

const NotFoundContainer = styled(Container)`
    text-align: center;
    margin-top: 20vh;
    ${bp.down("sm")} {
        margin-top: 15vh !important;
    }
`;
const Title = styled(Display.Title)`
    ${bp.down("sm")} {
        font-size: ${theme.display4Size};
    }
`;
const Subtitle = styled(Display.Subtitle)`
    ${bp.down("sm")} {
        font-size: ${theme.subDisplay4Size};
    }
`;

const Path = styled.span`
    color: ${theme.stSecondary};
`;

const BackButton = styled(Button)`
    position: relative;
    margin-top: 2vh;
    z-index: 100;
`;

const BackArrow = styled(FiArrowLeft)`
    margin-right: 0.5rem;
`;

export default function() {
    const { pathname: invalidPath } = useLocation();
    const history = useHistory();
    const handleClick = () => {
        history.goBack();
    };
    return (
        <NotFoundContainer>
            <Title>{site.notfound.title}</Title>
            <Subtitle>
                <Path>{invalidPath}</Path>
                {` ${site.notfound.subtitle}`}
            </Subtitle>
            <BackButton variant="outline-light" onClick={handleClick}>
                <BackArrow />
                {site.notfound.buttonText}
            </BackButton>
        </NotFoundContainer>
    );
}
