import type { BoxProps, CodeProps } from "@chakra-ui/react";

export interface CodeBlockProps extends BoxProps, Pick<CodeProps, "colorScheme"> {
  hideCopyButton?: boolean;
}
