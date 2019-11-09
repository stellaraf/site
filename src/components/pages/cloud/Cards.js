import React from "react";
import { Card } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import withReveal from "react-reveal/withReveal";
import styled from "styled-components";

import Flag from "components/pages/cloud/Flags";
import { getRevealProps } from "utils";
import theme from "styles/exports.module.scss";
// import styles from "components/pages/cloud/styles.module.scss";

const Loc = {
    Wrapper: styled(Card)`
        display: block !important;
        text-align: left;
        flex: 0 1 auto !important;
        flex-direction: column;
        width: ${theme.locCardWidth};
        height: ${theme.locCardHeight};
        background-color: ${theme.locCardBackground} !important;
    `,
    Top: styled.div`
        display: block;
        justify-content: space-between;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 10%;
        padding-top: 5%;
        max-height: 60%;
        height: 100%;
    `,
    Bottom: styled.div`
        display: flex;
        padding-right: 6%;
        padding-left: 6%;
        padding-bottom: 5%;
        max-height: 40%;
        height: 100%;
    `,
    Title: styled.h5`
        display: flex;
        align-self: center;
        align-items: center;
        margin-bottom: -0.5rem;
        flex: 1 0 auto;
        color: ${theme.locCardTitleColor};
        vertical-align: middle;
        width: 100%;
    `,
    Subtitle: styled.p`
        display: block;
        font-weight: ${theme.fontWeightBold};
        font-size: ${theme.fontSizeSm};
        width: 100%;
        color: ${theme.locCardSubtitleColor};
    `,
    Text: styled.p`
        font-size: ${theme.fontSizeSm};
        font-weight: ${theme.fontWeightLight};
        color: ${theme.locCardTextColor};
        margin-top: auto;
        margin-bottom: 0.5rem;
        align-self: end;
    `
};

function LocationCard({ location, title, subtitle, text, flag, ...props }) {
    const { revealProps, standardProps } = getRevealProps(props);
    const Wrapper = withReveal(Loc.Wrapper, <Slide cascade {...revealProps} />);
    return (
        <Wrapper {...standardProps}>
            <Loc.Top>
                <Loc.Title>
                    {title}
                    <Flag name={location} />
                </Loc.Title>
                <Loc.Subtitle>{subtitle}</Loc.Subtitle>
            </Loc.Top>
            <Loc.Bottom>
                {props.children || <Loc.Text>{text}</Loc.Text>}
            </Loc.Bottom>
        </Wrapper>
    );
}

/* 
Function w/CSS Modules
*/

// const RevealWrapper = styled.div`
//     display: block !important;
//     flex-grow: unset !important;
// `;

// function LocationCard({ location, title, text, flag, ...props }) {
//     const { revealProps, standardProps } = getRevealProps(props);
//     const CardWrapper = withReveal(RevealWrapper, <Slide {...revealProps} />);
//     return (
//         <CardWrapper style={{ display: "block" }} {...standardProps}>
//             <Card className={styles.locationCard}>
//                 <div className={styles.locationCardTop}>
//                     <h5 className={styles.locationCardTitle}>{title}</h5>
//                     <Flag name={location} />
//                 </div>
//                 <div className={styles.locationCardBottom}>
//                     {props.children || (
//                         <p className={styles.locationCardText}>{text}</p>
//                     )}
//                 </div>
//             </Card>
//         </CardWrapper>
//     );
// }

/* 
Class w/CSS Modules & Inner Refs
*/

// const StyledRevealWrapper = styled.div`
//     display: block !important;
//     flex-grow: unset !important;
// `;

// const { revealProps, standardProps } = getRevealProps(props);
// const CardWrapper = withReveal(RevealWrapper, <Slide {...revealProps} />);

// function CardWrapper(revealProps) {
//     return withReveal(RevealWrapper, <Slide {...revealProps} />);
//}

// function RevealWrapper(props) {
//     return (
//         <StyledRevealWrapper
//             ref={props.LocCardRef}
//             className={props.className}
//             style={props.style}>
//             {props.children}
//         </StyledRevealWrapper>
//     );
// }

// class LocationCard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.LocCardRef = React.createRef();
//         this.location = this.props.location;
//         this.title = this.props.title;
//         this.text = this.props.text;
//         this.flag = this.props.flag;
//         this.children = this.props.children;
//         Object.assign(this, getRevealProps(props));
//         this.CardWrapper = withReveal(
//             RevealWrapper,
//             <Slide refProp={"this.LocCardRef"} {...this.revealProps} />
//         );
//     }
//     render() {
//         return (
//             <this.CardWrapper
//                 style={{ display: "block" }}
//                 {...this.standardProps}>
//                 <Card className={styles.locationCard}>
//                     <div className={styles.locationCardTop}>
//                         <h5 className={styles.locationCardTitle}>
//                             {this.title}
//                         </h5>
//                         <Flag name={this.location} />
//                     </div>
//                     <div className={styles.locationCardBottom}>
//                         {this.props.children || (
//                             <p className={styles.locationCardText}>
//                                 {this.text}
//                             </p>
//                         )}
//                     </div>
//                 </Card>
//             </this.CardWrapper>
//         );
//     }
// }
export { LocationCard };
