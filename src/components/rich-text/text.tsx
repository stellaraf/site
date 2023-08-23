import { Box, useStyleConfig, Code as ChakraCode } from "@chakra-ui/react";

import { useCodeBlockStyle } from "~/components";
import { useColorValue } from "~/context";

import type { TextProps, CodeProps } from "@chakra-ui/react";

export const P = (props: TextProps) => {
  return (
    <Box className="st-content-p" my={8} sx={{ "&:first-of-type": { marginTop: 2 } }} {...props} />
  );
};

export const Code = (props: CodeProps) => {
  const scheme = useColorValue("gray", "tertiary");

  let ctx = useCodeBlockStyle();
  if (ctx === null) {
    ctx = { colorScheme: "gray", codeBlock: { colorScheme: scheme }, copyButton: {} };
  }
  const sx = useStyleConfig("Code", { colorScheme: ctx.codeBlock.colorScheme });

  return <ChakraCode fontSize="sm" colorScheme={scheme} px={1} sx={sx} {...props} />;
};
