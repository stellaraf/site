import { type MergeWithAs, type ChakraProps } from "@chakra-ui/react";

export type AsProps<T extends keyof JSX.IntrinsicElements> = MergeWithAs<
  React.ComponentProps<T>,
  ChakraProps,
  Record<string, unknown>,
  T
>;
