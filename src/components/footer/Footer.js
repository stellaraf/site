import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
// import { Link } from "wouter";
import Link from "next/link";
import styled from "styled-components";
import theme from "styles/exports.module.scss";
import site from "config";
import bp from "utils/breakpoints";
import { FaLinkedin, FaTwitter, FaFacebook, FaGithub } from "react-icons/fa";

const socialIcons = {
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Facebook: FaFacebook,
  Github: FaGithub
};

const FooterRow = styled(Row)`
  justify-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LogoRow = styled(FooterRow)`
  margin-left: 0 !important;
  margin-right: 0 !important;
`;

const LogoCol = styled(props => <Col {...props} />)`
  display: flex;
  justify-content: space-between;
  flex-grow: 1 !important;
  flex-shrink: 0 !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
`;

const LinkCol = styled(props => <Col {...props} />)`
  display: flex;
  align-self: flex-start;
  flex-grow: 0 !important;
  flex-shrink: 1 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  ${bp.up("md")} {
    &:first-of-type {
      padding-left: 15px !important;
      margin-left: 0;
    }
    &:last-of-type {
      padding-right: 15px !important;
      margin-right: 0;
    }
  }
`;

const FooterHr = styled(Container)`
  margin-top: 4vh;
  padding-top: 2vh;
  padding-left: 0 !important;
  padding-right: 0 !important;
  border-top: 1px solid ${theme.stSecondary};
`;

const CopyrightText = styled.p`
  font-size: ${theme.fontSizeSm};
  margin-bottom: 0;
  color: ${theme.stGray};
  width: 100%;
  ${bp.down("md")} {
    text-align: center;
  }
  ${bp.up("md")} {
    text-align: right;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding-left: 0;
  padding-right: 0;
`;

const FooterTitle = styled.p`
  color: ${theme.stWhite};
  font-size: ${theme.footerHeadingSize};
  padding: ${theme.inputBtnPaddingY} ${theme.inputBtnPaddingX};
`;

const StyledFooterButton = styled(Button)`
  && {
    color: ${theme.footerColor};
    font-weight: ${theme.fontWeightNormal};
    text-align: left;
    font-size: ${theme.fontSizeSm};
    :hover,
    :focus,
    :active {
      color: ${theme.footerColor};
    }
  }
`;

function FooterLink({ href, children, ...props }) {
  return (
    <Link href={href || ""} {...props}>
      <StyledFooterButton variant="link">{children}</StyledFooterButton>
    </Link>
  );
}

function FooterSection({ title, items }) {
  return (
    <FooterList>
      <li>
        <FooterTitle>{title}</FooterTitle>
      </li>
      {items.map((item, i) => {
        return (
          <li key={i} className="footer-link">
            <FooterLink href={item.link}>{item.name}</FooterLink>
          </li>
        );
      })}
    </FooterList>
  );
}

function FooterCol({ sections }) {
  return sections.map((section, i) => (
    <LinkCol key={i} md={3} sm={6}>
      <FooterSection key={i} title={section.title} items={section.items} />
    </LinkCol>
  ));
}

const StyledSocialList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding-inline-start: 0 !important;
  width: 100%;
  ${bp.down("md")} {
    justify-content: center;
  }
  ${bp.up("md")} {
    justify-content: start;
  }
`;
function SocialIcon({ platform, link }) {
  const ThisIcon = styled(socialIcons[platform])`
    color: ${theme.stWhite};
    &:hover {
      color: ${theme.stSecondary};
    }
  `;
  const anchorLabel = `Go to ${site.global.givenName} ${platform}`;
  return (
    <li>
      <Button
        href={link}
        variant="link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={anchorLabel}
        title={anchorLabel}
      >
        <ThisIcon />
      </Button>
    </li>
  );
}

const FooterWrapper = styled.nav`
  background-color: ${theme.footerBackground};
  color: ${theme.footerColor};
`;

function Footer() {
  return (
    <FooterWrapper
      className="navbar navbar-footer"
      style={{
        paddingTop: "3rem",
        paddingBottom: "1rem"
      }}
    >
      <Container>
        <FooterRow>
          <FooterCol sections={site.footer.sections} />
        </FooterRow>
        <FooterHr fluid={true}>
          <LogoRow>
            <LogoCol sm={12} md={6}>
              <StyledSocialList>
                {site.social.map((platform, i) => {
                  const MatchedIcon = socialIcons[platform.name];
                  return (
                    <SocialIcon
                      key={i}
                      iconName={MatchedIcon}
                      link={platform.link}
                      platform={platform.name}
                    />
                  );
                })}
              </StyledSocialList>
            </LogoCol>
            <LogoCol sm={12} md={6}>
              <CopyrightText>
                {`Copyright © ${new Date().getFullYear()} ${
                  site.global.legalName
                }`}
              </CopyrightText>
            </LogoCol>
          </LogoRow>
        </FooterHr>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
