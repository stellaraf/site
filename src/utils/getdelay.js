/**
 *
 * @param {number} thisElement Index of the element to find the delay of
 * @param {number} numElements The total number of elements in the block
 * @param {number} maxDelay Maximum delay in ms of all objects to be rendered
 * @param {boolean} slowFirst Slowest elements first
 */
function getDelay(
    thisElement,
    numElements,
    { maxDelay = 128, slowFirst = true } = {}
) {
    // Rounded divisor, i.e. number of times <numElements> can be divided into the max delay
    const divisor = ~~(maxDelay / numElements);
    // Function to create an array from a number, similar to python's range() function
    const range = n => [...Array(n).keys()];
    // Array of all delay points starting with the max delay
    let points = [maxDelay];
    // Starting max delay number, is reassigned at each iteration
    var newMax = maxDelay;
    // Create range from number of components/elements in block
    let repeat = range(numElements);
    repeat.slice(1).forEach(() => {
        /* Starting at the 2nd delay point, subtract the divisor from the max delay to
        yield this element's delay */
        let thisMax = newMax - divisor;
        // Reassign the max value to subtract from to the value just calculated
        newMax = thisMax;
        // Add the calculated value to the master array of delay points
        points.push(thisMax);
    });
    /* If slowFirst is set to false, i.e. slower elements should come last,
    reverse the order of the delay points array */
    if (slowFirst === false) {
        points = points.reverse();
    }
    return points[thisElement];
}
export default getDelay;
