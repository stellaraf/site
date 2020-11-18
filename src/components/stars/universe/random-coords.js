import site from "config";
const config = site.stars;

const range = n => [...Array(n).keys()];

function getCoord(min, max) {
    let rangeMin = Math.ceil(min);
    let rangeMax = Math.floor(max) + 1;
    let coord = Math.random() * (rangeMax - rangeMin) + rangeMin;
    return coord;
}

function getDepth(min, max) {
    let rangeMin = Math.floor(min);
    let rangeMax = Math.floor(max) + 1;
    let depth = ~~(Math.random() * (rangeMax - rangeMin) + rangeMin);
    return depth;
}

function makeCoord(x, y, depth) {
    return {
        x: x,
        y: y,
        depth: depth
    };
}

function buildCoords(numStars) {
    let coordRange = range(numStars);
    var coords = [];
    coordRange.forEach(coord => {
        let x = getCoord(config.min, config.max);
        let y = getCoord(config.min, config.max);
        let depth = getDepth(0, config.depth);
        coords.push(makeCoord(x, y, depth));
    });
    return coords;
}

export default buildCoords;
