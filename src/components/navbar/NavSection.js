import React from "react";
// import { Link } from "wouter";
import Link from "next/link";
import { Card, ListGroup } from "react-bootstrap";
import theme from "styles/exports.module.scss";
import styled from "styled-components";

const Section = {
  Wrapper: styled(Card)`
    background-color: transparent !important;
    border-color: ${theme.navCardBorderColor} !important ;
  `,
  Header: styled(Card.Header)`
    background-color: ${theme.navCardHeaderBackground} !important;
    border-bottom: ${theme.cardBorderWidth} solid ${theme.navCardBorderColor} !important;
  `,
  Title: styled.p`
    margin-bottom: unset !important;
    color: ${theme.navCardTitleColor} !important;
  `,
  Body: styled(Card.Body)``
};

const NavItem = styled(ListGroup.Item)`
  background-color: transparent !important;
  color: ${theme.navCardColor} !important;
  font-size: ${theme.fontSizeSm} !important;
  border: none !important;
  &:hover,
  &:active {
    background-color: ${theme.navCardBackground} !important;
    color: ${theme.navCardColor} !important;
    border-radius: ${theme.borderRadius} !important;
  }
`;

function NavSection({ menu, handleNavClick }) {
  return menu.sections.map((section, i) => {
    return (
      <Section.Wrapper key={i}>
        <Section.Header>
          <Section.Title>{section.title}</Section.Title>
        </Section.Header>
        <Section.Body>
          <ListGroup variant="flush">
            {section.items.map((item, i) => {
              return (
                <Link href={item.link} key={i}>
                  <NavItem action onClick={handleNavClick}>
                    {item.name}
                  </NavItem>
                </Link>
              );
            })}
          </ListGroup>
        </Section.Body>
      </Section.Wrapper>
    );
  });
}
export default NavSection;
