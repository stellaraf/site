import {
  Box,
  Code as ChakraCode,
  type CodeProps,
  type TextProps,
  useColorModeValue,
  useStyleConfig,
} from "@chakra-ui/react";

import { useCodeBlockStyle } from "~/components";

export const P = (props: TextProps) => {
  return (
    <Box
      my={8}
      zIndex={1}
      position="relative"
      className="st-content-p"
      sx={{ "&:first-of-type": { marginTop: 2 } }}
      {...props}
    />
  );
};

export const Code = (props: CodeProps) => {
  const scheme = useColorModeValue("gray", "tertiary");

  let ctx = useCodeBlockStyle();
  if (ctx === null) {
    ctx = { colorScheme: "gray", codeBlock: { colorScheme: scheme }, copyButton: {} };
  }
  const sx = useStyleConfig("Code", { colorScheme: ctx.codeBlock.colorScheme });

  return <ChakraCode fontSize="sm" colorScheme={scheme} px={1} sx={sx} {...props} />;
};
