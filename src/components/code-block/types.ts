import type { BoxProps, CodeProps } from "@chakra-ui/react";

export type CodeBlockProps = BoxProps & Pick<CodeProps, "colorScheme">;
