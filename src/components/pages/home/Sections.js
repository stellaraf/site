import React from "react";
import { CardDeck, Container } from "react-bootstrap";
import { SectionCard } from "components/pages/home/Cards";
import { getDelay } from "utils";
import { FullWidthCard } from "components/styled/cards";
import styled from "styled-components";
import site from "config";

const CardRow = styled(CardDeck)`
    justify-content: space-between;
    align-items: start;
`;

const SectionOneWrapper = styled.section`
    min-height: 40vh;
    display: flex;
    margin-top: 5vh;
    margin-bottom: 5vh;
    flex-direction: column;
`;

function SectionOneRow() {
    const cards = site.pages.home.sections.sectionOne;
    const revealProps = {
        left: true,
        duration: 128,
        cascade: true
    };
    const sectionDelay = i => getDelay(i, cards.length);
    return (
        <CardRow>
            {cards.map((section, i) => {
                let CardWrapper = FullWidthCard(cards.length, i);
                return (
                    <CardWrapper key={i}>
                        <SectionCard
                            title={section.title}
                            text={section.text}
                            image={section.image}
                            link={section.link}
                            delay={sectionDelay(i)}
                            {...revealProps}
                        />
                    </CardWrapper>
                );
            })}
        </CardRow>
    );
}

function SectionOne(props) {
    return (
        <SectionOneWrapper className="infoSection">
            <Container>
                <SectionOneRow />
            </Container>
        </SectionOneWrapper>
    );
}

export { SectionOne };
