/* 

NOTE

This code was deprecated, but I didn't want to lose some of the logic I spent a shit ton of time building,
and this is the only place some of these little mini-modules I wrote (like getRevealProps) actually exist.

*/

// import React from "react";
// import { Card } from "react-bootstrap";
// import Slide from "react-reveal/Slide";
// import withReveal from "react-reveal/withReveal";
// import { LinkContainer } from "react-router-bootstrap";
// import UndrawServer from "react-undraw/dist/illustrations/UndrawServer";
// import UndrawMaintenance from "react-undraw/dist/illustrations/UndrawMaintenance";
// import UndrawStatusUpdate from "react-undraw/dist/illustrations/UndrawStatusUpdate";
// import { getRevealProps } from "utils";
// import styled from "styled-components";
// import styles from "components/pages/home/styles.module.scss";
// import classNames from "classnames";
// import theme from "styles/exports.module.scss";

// const RevealWrapper = styled.div`
//     display: flex !important;
//     flex-grow: 1 !important;
// `;
// const undrawProps = { primaryColor: theme.stSecondary, height: "90px" };
// const undrawMap = {
//     server: <UndrawServer {...undrawProps} />,
//     "status-update": <UndrawStatusUpdate {...undrawProps} />,
//     maintenance: <UndrawMaintenance {...undrawProps} />
// };

// function SectionCard({
//     image,
//     title = "Placeholder Title",
//     text = "Placeholder Text",
//     link,
//     ...props
// }) {
//     const { revealProps, standardProps } = getRevealProps(props);
//     const CardWrapper = withReveal(RevealWrapper, <Slide {...revealProps} />);
//     return (
//         <CardWrapper {...standardProps}>
//             <Card className={styles.sectionCard}>
//                 <div className={styles.sectionCardTop}>{undrawMap[image]}</div>
//                 <div className={styles.sectionCardBottom}>
//                     <h5 className={styles.sectionCardTitle}>{title}</h5>
//                     <LinkContainer to={link}>
//                         <a href="/" className={styles.sectionCardText}>
//                             {text}
//                         </a>
//                     </LinkContainer>
//                 </div>
//             </Card>
//         </CardWrapper>
//     );
// }

// function HeroCard({
//     align = "left",
//     title = "Title",
//     titleClass = "h5",
//     text = "Text",
//     children,
//     ...props
// }) {
//     const { revealProps, standardProps } = getRevealProps(props);
//     const CardWrapper = withReveal(RevealWrapper, <Slide {...revealProps} />);
//     return (
//         <CardWrapper {...standardProps}>
//             <Card className={styles.mainCard} style={{ textAlign: align }}>
//                 <Card.Body className={styles.mainCardBody}>
//                     <>
//                         <p
//                             className={classNames(
//                                 titleClass,
//                                 styles.mainCardTitle
//                             )}>
//                             {title}
//                         </p>
//                         <p className={styles.mainCardText}>{text}</p>
//                     </>
//                     {children}
//                 </Card.Body>
//             </Card>
//         </CardWrapper>
//     );
// }

// export { SectionCard, HeroCard };
