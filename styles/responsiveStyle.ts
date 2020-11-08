import { useBreakpointValue } from '@chakra-ui/core';
import type { BoxProps } from '@chakra-ui/core';

export function useResponsiveStyle(): BoxProps {
  const px = useBreakpointValue({ base: 4, md: 4, lg: 16, xl: 24 });
  return { px };
}
