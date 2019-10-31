import React from "react";
import { Card } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import withReveal from "react-reveal/withReveal";
import { getRevealProps } from "utils";
import { Image } from "components/svg";
import styled from "styled-components";
import styles from "components/pages/home/styles.module.scss";
// import theme from "styles/exports.module.scss";
import classNames from "classnames";

const RevealWrapper = styled.div`
    display: flex !important;
    flex-grow: 1 !important;
`;

function SectionCard({
    image,
    title = "Placeholder Title",
    text = "Placeholder Text",
    children,
    ...props
}) {
    const { revealProps, standardProps } = getRevealProps(props);
    const CardWrapper = withReveal(RevealWrapper, <Slide {...revealProps} />);

    return (
        <CardWrapper {...standardProps}>
            <Card className={styles.sectionCard}>
                <div className={styles.sectionCardTop}>
                    <Image name={image} />
                </div>
                <div className={styles.sectionCardBottom}>
                    {children || (
                        <>
                            <h5 className={styles.sectionCardTitle}>{title}</h5>
                            <p className={styles.sectionCardText}>{text}</p>
                        </>
                    )}
                </div>
            </Card>
        </CardWrapper>
    );
}

function HeroCard({
    align = "left",
    title = "Title",
    titleClass = "h5",
    text = "Text",
    children,
    ...props
}) {
    const { revealProps, standardProps } = getRevealProps(props);
    const CardWrapper = withReveal(RevealWrapper, <Slide {...revealProps} />);
    return (
        <CardWrapper {...standardProps}>
            <Card className={styles.mainCard} style={{ textAlign: align }}>
                <Card.Body className={styles.mainCardBody}>
                    <>
                        <p
                            className={classNames(
                                titleClass,
                                styles.mainCardTitle
                            )}>
                            {title}
                        </p>
                        <p className={styles.mainCardText}>{text}</p>
                    </>
                    {children}
                </Card.Body>
            </Card>
        </CardWrapper>
    );
}

export { SectionCard, HeroCard };
