import styled from "styled-components";

/**
 *
 * @param {number} numCards Number of cards in the row
 * @param {number} maxPerRow Maximum number of cards per row
 * @param {number} maxSectionWidth Maximum width of parent container (assumed fluid/100%)
 */
function FullWidthCard(
    numCards,
    { maxPerRow = 4, maxSectionWidth = 100 } = {}
) {
    if (numCards > maxPerRow) {
        numCards = maxPerRow;
    }
    const cardWidth = ~~((maxSectionWidth * maxPerRow) / (numCards * 4));

    const ThisCard = styled.div`
        flex: 0 0 ${cardWidth}%;
        max-width: ${cardWidth}%;
        position: relative;
        width: 100%;

        &: nth-of-type(n + ${maxPerRow + 1}) {
            margin-top: 2rem;
        };
    `;
    return ThisCard;
}

export { FullWidthCard };
