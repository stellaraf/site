const BREAKPOINTS = {
    min: {
        xs: "0px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px"
    },
    max: {
        xs: "0px",
        sm: "575.98px",
        md: "767.98px",
        lg: "991.98px",
        xl: "1199.98px"
    }
};

function mediaBreak(breakpoint, direction) {
    const supportedBreaks = Object.keys(BREAKPOINTS[direction]);
    if (!supportedBreaks.includes(breakpoint)) {
        throw new Error(
            `Breakpoint ${breakpoint} invalid. Must be one of ${supportedBreaks.join(
                ", "
            )}`
        );
    }
    let size = BREAKPOINTS[direction][breakpoint];
    return `@media (${direction}-width: ${size})`;
}

/**
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} breakpoint
 */
const up = breakpoint => mediaBreak(breakpoint, "min");
/**
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} breakpoint
 */
const down = breakpoint => mediaBreak(breakpoint, "max");

export default {
    up: up,
    down: down
};
