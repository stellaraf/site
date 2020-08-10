export const BREAKPOINTS = {
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

function mediaQuery(breakpoint, direction) {
  const supportedBreaks = Object.keys(BREAKPOINTS[direction]);
  if (!supportedBreaks.includes(breakpoint)) {
    throw new Error(
      `Breakpoint ${breakpoint} invalid. Must be one of ${supportedBreaks.join(
        ", "
      )}`
    );
  }
  let size = BREAKPOINTS[direction][breakpoint];
  let query = `(${direction}-width: ${size})`;
  let rawQueryData = window.matchMedia(query);
  return rawQueryData.matches;
}

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
export default {
  /**
   *
   * @param {'xs'|'sm'|'md'|'lg'|'xl'} breakpoint
   */
  up: breakpoint => mediaBreak(breakpoint, "min"),
  /**
   *
   * @param {'xs'|'sm'|'md'|'lg'|'xl'} breakpoint
   */
  down: breakpoint => mediaBreak(breakpoint, "max")
};

const query = {
  /**
   *
   * @param {'xs'|'sm'|'md'|'lg'|'xl'} breakpoint
   */
  atLeast: breakpoint => mediaQuery(breakpoint, "min"),
  /**
   *
   * @param {'xs'|'sm'|'md'|'lg'|'xl'} breakpoint
   */
  atMost: breakpoint => mediaQuery(breakpoint, "max")
};

export { query };
