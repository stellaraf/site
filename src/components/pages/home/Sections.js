import React from "react";
import { CardDeck, Container } from "react-bootstrap";
import { SectionCard } from "components/pages/home/Cards";
import { getDelay } from "utils";
import { FullWidthCard } from "components/styled/cards";
import styles from "components/pages/home/styles.module.scss";
import classNames from "classnames";
import { homeConfig } from "config";

function SectionOneRow() {
    const cards = homeConfig.sections.sectionOne;
    const revealProps = {
        left: true,
        duration: 128,
        cascade: true
    };
    const sectionDelay = i => getDelay(i, cards.length);
    const NewCard = FullWidthCard(cards.length);
    return (
        <CardDeck className={styles.sectionCardRow}>
            {cards.map((section, i) => (
                <NewCard key={i}>
                    <SectionCard
                        title={section.title}
                        text={section.text}
                        image={section.image}
                        delay={sectionDelay(i)}
                        {...revealProps}
                    />
                </NewCard>
            ))}
        </CardDeck>
    );
}

function SectionOne(props) {
    console.log(props.size);
    return (
        <section className={classNames(styles.heroSection, "infoSection")}>
            <Container>
                <SectionOneRow />
            </Container>
        </section>
    );
}

export { SectionOne };
