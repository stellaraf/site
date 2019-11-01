import styled from "styled-components";
import theme from "styles/exports.module.scss";

const ThisCard = styled.div`
max-width: 100%;
flex: 0 0 100%;
position: relative;
width: 100%;
margin-top: ${props => props.marginTop};

& nth-of-type(n + ${props => props.actualPerRow + 1}) {
    margin-top: 2vh;
}
@media (min-width: ${theme.breakSm}) {
    flex: 0 0 100%;
    max-width: 100%;
}
@media (min-width: ${theme.breakMd}) {
    flex: 0 0 ${props => props.cardWidth * 2}%;
    max-width: ${props => props.cardWidth * 2}%;
    /* &: nth-of-type(n + ${props => props.actualPerRow / 2 + 1}) {
        margin-top: 2vh;
    } */
}
@media (min-width: ${theme.breakLg}) {
    flex: 0 0 ${props => props.cardWidth}%;
    max-width: ${props => props.cardWidth}%;
}
@media (min-width: ${theme.breakXl}) {
    flex: 0 0 ${props => props.cardWidth}%;
    max-width: ${props => props.cardWidth}%;
}
`;

/**
 *
 * @param {number} numCards Number of cards in the row
 * @param {number} maxPerRow Maximum number of cards per row
 * @param {number} maxSectionWidth Maximum width of parent container (assumed fluid/100%)
 */
function FullWidthCard(
    numCards,
    index,
    { maxPerRow = 4, maxSectionWidth = 100 } = {}
) {
    if (numCards > maxPerRow) {
        numCards = maxPerRow;
    }
    const cardWidth = ~~((maxSectionWidth * maxPerRow) / (numCards * 4));
    const actualPerRow = ~~(maxSectionWidth / cardWidth);
    const positionInRow = index + 1;

    let marginTop;
    if (positionInRow > actualPerRow) {
        marginTop = "2vh";
    } else {
        marginTop = "";
    }

    ThisCard.defaultProps = {
        cardWidth: cardWidth,
        marginTop: marginTop,
        actualPerRow: actualPerRow
    };

    return ThisCard;
}

export { FullWidthCard };
