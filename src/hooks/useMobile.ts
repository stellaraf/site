import { useBreakpointValue } from "@chakra-ui/react";

export function useMobile(): boolean {
  const value = useBreakpointValue<boolean>({ base: true, md: true, lg: false, xl: false }, { ssr: false });
  return value ?? false;
}
