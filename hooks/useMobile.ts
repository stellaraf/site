import { useBreakpointValue } from '@chakra-ui/react';

export function useMobile(): boolean {
  const value = useBreakpointValue({ base: true, md: true, lg: false, xl: false });
  return value ?? false;
}
