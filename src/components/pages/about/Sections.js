import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FaLinkedin, FaTwitter, FaFacebook, FaGithub } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { AngleSection } from "components/styled/sections";
import { Display } from "components/styled/text";
import { Microsoft, VMware, Veeam } from "components/svg/VendorLogos";
import bp from "utils/breakpoints";
import site from "config";
import theme from "styles/exports.module.scss";

const socialIcons = {
    LinkedIn: FaLinkedin,
    Twitter: FaTwitter,
    Facebook: FaFacebook,
    Github: FaGithub
};

const SectionContainer = styled(Container)`
    min-height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    max-width: 80%;
    && {
        ${bp.down("sm")} {
            padding-left: 0px;
            padding-right: 0px;
            max-width: 90%;
        }
    }
    & p.about-text {
        font-size: ${theme.fontSizeLg};
    }

    & h3.about-heading {
        margin-bottom: 3vh;
    }

    & .exec-section-title {
        margin-top: 5vh;
    }
    & .exec-row {
        margin-top: 5vh;
        width: 100%;
    }

    & .exec-col:not(:first-child):not(:last-child) {
        ${bp.down("lg")} {
            margin-top: 2vh;
            margin-bottom: 2vh;
        }
    }

    & .card.exec-card {
        color: ${theme.contentCardColor};
        background-color: ${theme.contentCardBackground};
        box-shadow: ${theme.contentCardShadow};
        z-index: 100;
        height: 100%;
    }

    & .card.exec-card .card-footer,
    .card.exec-card .card-header,
    .card.exec-card .card-body {
        border: none;
        border-radius: ${theme.borderRadius};
    }

    & .card .card-body .avatar {
        display: flex;
        align-items: center;

        & img.avatar-img {
            flex-shrink: 0;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
        }

        & .avatar-text {
            margin-left: 0.75rem;
            text-align: left;
            & h6.avatar-name {
                // color: ${theme.stDark};
                margin-bottom: 0;
            }
            & span.avatar-title {
                color: ${theme.stGray};
            }
        }
    }
    & .card .card-body .bio {
        flex-grow: 1;
        margin-top: 1.5rem;
        text-align: left;
        line-height: 1.6;
        font-weight: ${theme.fontWeightLight};
        // color: ${theme.stGray};
    }
    & .card.exec-card .avatar-social {
        display: flex;
    }
`;

const StoryContainer = styled(Container)`
    margin-top: 2vh;
    margin-bottom: 2vh;
    & .story-border-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        background-color: ${theme.stSecondary};
    }

    & .about-vendor-row {
        margin-top: 5vh;
    }
    & .card {
        background-color: transparent;
        border: none;
    }
    & .card .card-header,
    .card .card-body,
    .card-footer {
        background-color: transparent;
        border: none;
    }

    & .card .card-header {
        display: flex;
        border-top: none;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
    }

    & .card .card-body {
        text-align: center;
    }

    & div.brand-container {
        display: flex;
        flex: 0 1 auto;
        align-items: center;
        justify-content: center;
        margin: 0.5rem 1rem;
        & svg.brand-icon {
            pointer-events: none;
            user-select: none;
        }
    }
`;

const ExecSection = styled(AngleSection)`
    & p.section-subtitle {
        font-size: ${theme.fontSizeLg};
    }

    & h3.section-title {
        margin-bottom: 3vh;
    }
`;

const StyledSocialList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    padding-inline-start: 0 !important;
    width: 100%;
    justify-content: flex-end;
`;

function SocialIcon({ iconName, link }) {
    const ThisIcon = styled(iconName)`
        margin-right: 1rem;
        color: ${theme.contentCardColor};
        &:hover {
            color: ${theme.stSecondary};
        }
    `;
    return (
        <li>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <ThisIcon />
            </a>
        </li>
    );
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.config = site.pages.about;
    }
    render() {
        return (
            <>
                <AngleSection
                    directionTop="flat"
                    directionBottom="flat"
                    backgroundColor="transparent"
                    marginBottom="0"
                    style={{ backgroundImage: theme.stSectionGradient1 }}>
                    <SectionContainer fluid>
                        <StoryContainer fluid>
                            <h3 className="about-heading">{this.config.profile.heading}</h3>
                            <p className="about-text">{this.config.profile.text}</p>
                            <Row className="about-vendor-row">
                                <Col sm={12} md={4}>
                                    <Card>
                                        <Card.Header>
                                            <div className="brand-container">
                                                <FiCheckCircle
                                                    size={32}
                                                    color={theme.stSecondary}
                                                />
                                            </div>
                                            <div className="brand-container">
                                                <VMware className="brand-icon" height={32} />
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            Most enterprises are coming from VMware, so we run our
                                            cloud on VMware to make migrating even easier!
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={12} md={4}>
                                    <Card>
                                        <Card.Header>
                                            <div className="brand-container">
                                                <FiCheckCircle
                                                    size={32}
                                                    color={theme.stSecondary}
                                                />
                                            </div>
                                            <div className="brand-container">
                                                <Veeam className="brand-icon" height={32} />
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            If you're a Veeam customer, like many VMware-native
                                            organizations, adding our backup services takes about 10
                                            seconds!
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={12} md={4}>
                                    <Card>
                                        <Card.Header>
                                            <div className="brand-container">
                                                <FiCheckCircle
                                                    size={32}
                                                    color={theme.stSecondary}
                                                />
                                            </div>
                                            <div className="brand-container">
                                                <Microsoft
                                                    className="brand-icon"
                                                    height={32}
                                                    text
                                                />
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            As much as we love Linux, Windows isn't going anywhere
                                            in today's enterprise technology landscape. That's why
                                            we provide pre-built Windows Server images for all
                                            Microsoft-supported versions.
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </StoryContainer>
                    </SectionContainer>
                </AngleSection>
                <ExecSection
                    directionBottom="flat"
                    directionTop="flat"
                    backgroundColor="transparent"
                    marginTop="0"
                    style={{
                        borderTop: theme.navbarBottomBorder,
                        backgroundImage: theme.stSectionGradient2
                    }}>
                    <SectionContainer fluid>
                        <div>
                            <Display.Title size={3} className="exec-section-title">
                                Leadership
                            </Display.Title>
                        </div>
                        <Row className="exec-row">
                            {this.config.leadership.map((exec, i) => {
                                return (
                                    <Col sm={12} md={12} lg={4} className="exec-col" key={i}>
                                        <Card className="exec-card">
                                            <Card.Body>
                                                <div className="avatar">
                                                    <img
                                                        src={`/assets/${exec.photo}`}
                                                        alt={exec.name}
                                                        className="avatar-img"
                                                    />
                                                    <div className="avatar-text">
                                                        <h6 className="avatar-name">{exec.name}</h6>
                                                        <span className="avatar-title">
                                                            {exec.title}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="bio">{exec.bio}</div>
                                            </Card.Body>
                                            <Card.Footer>
                                                <StyledSocialList>
                                                    {exec.social.map((platform, i) => {
                                                        const MatchedIcon =
                                                            socialIcons[platform.name];
                                                        return (
                                                            <SocialIcon
                                                                key={i}
                                                                iconName={MatchedIcon}
                                                                link={platform.link}
                                                            />
                                                        );
                                                    })}
                                                </StyledSocialList>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </SectionContainer>
                </ExecSection>
            </>
        );
    }
}
