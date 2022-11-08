import { useTheme } from "~/context";

interface UseBreakpointStringReturn {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

/**
 * Convenience hook for converting Chakra-UI Theme breakpoints (back) to standard media query string.
 */
export function useBreakpointString(): UseBreakpointStringReturn {
  const { breakpoints } = useTheme();
  const { md, lg, xl, "2xl": xxl } = breakpoints;
  return {
    sm: `(max-width: ${md})`,
    md: `(min-width: ${md}) and (max-width: ${lg})`,
    lg: `(min-width: ${lg}) and (max-width: ${xl})`,
    xl: `(min-width: ${xl}) and (max-width: ${xxl})`,
    xxl: `(min-width: ${xxl})`,
  };
}
