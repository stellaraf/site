import type { BoxProps, StackProps } from "@chakra-ui/react";

export interface CardBodyProps extends BoxProps {
  spacing?: StackProps["spacing"];
}

export type CardProps = StackProps;
