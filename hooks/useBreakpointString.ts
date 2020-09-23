import { useTheme } from 'site/context';

/**
 * Convenience hook for converting Chakra-UI Theme breakpoints (back) to standard media query string.
 */
export function useBreakpointString() {
  const { breakpoints } = useTheme();
  const { md, lg, xl } = breakpoints;
  return {
    sm: `(max-width: ${md})`,
    md: `(min-width: ${md}) and (max-width: ${lg})`,
    lg: `(min-width: ${lg}) and (max-width: ${xl})`,
    xl: `(min-width: ${xl})`,
  };
}
