import { type MergeWithAs, type ChakraProps } from "@chakra-ui/react";

export type IconProps = MergeWithAs<
  React.ComponentProps<"svg">,
  ChakraProps,
  Record<string, unknown>,
  "svg"
>;

export type IconType = (props: IconProps) => JSX.Element;
