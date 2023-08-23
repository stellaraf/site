import type { BoxProps, CodeProps } from "@chakra-ui/react";

export type BlockQuoteProps = BoxProps & Pick<CodeProps, "colorScheme">;
