/**
 * Returns an array with arrays of the given size.
 *
 * @param allCards {Array} array to split
 * @param maxRowSize {Integer} Size of every group
 */
function buildCardRows(allCards, maxRowSize = 4) {
    const arrayLength = allCards.length;
    let index = 0;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += maxRowSize) {
        const thisRow = allCards.slice(index, index + maxRowSize);
        tempArray.push(thisRow);
    }

    return tempArray;
}
export default buildCardRows;
