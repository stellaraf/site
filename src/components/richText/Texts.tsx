import { Box, Text, useToken, useStyleConfig, Code as ChakraCode } from "@chakra-ui/react";
import { useCodeBlockStyle } from "~/components";
import { useColorValue } from "~/context";

import type { IBlockQuote, ICode, IParagraph, IInline } from "./types";

export const P: React.FC<IParagraph> = (props: IParagraph) => (
  <Text my={8} css={{ "&:first-of-type": { marginTop: useToken("space", 2) } }} {...props} />
);

export const BlockQuote: React.FC<IBlockQuote> = (props: IBlockQuote) => {
  const bg = useColorValue("blackAlpha.100", "whiteAlpha.100");
  const border = useColorValue("blackAlpha.300", "whiteAlpha.300");
  return (
    <Box
      my={8}
      pb={4}
      pl={4}
      pt={2}
      fontSize="lg"
      as="blockquote"
      fontFamily="body"
      lineHeight="tall"
      fontWeight="light"
      borderLeftWidth={2}
      position="relative"
      backgroundColor={bg}
      borderLeftStyle="solid"
      borderLeftColor={border}
      {...props}
    />
  );
};

export const Code: React.FC<ICode> = (props: ICode) => {
  const scheme = useColorValue("gray", "tertiary");

  let ctx = useCodeBlockStyle();
  if (ctx === null) {
    ctx = { codeBlock: { colorScheme: scheme }, copyButton: {} };
  }
  const sx = useStyleConfig("Code", { colorScheme: ctx.codeBlock.colorScheme });
  return <ChakraCode fontSize="sm" colorScheme={scheme} px={1} sx={sx} {...props} />;
};

export const Inline: React.FC<IInline> = (props: IInline) => {
  const { node, ...rest } = props;
  return (
    <Box as="span" key={node.data.target.sys.id} {...rest}>
      type: {node.nodeType} id: {node.data.target.sys.id}
    </Box>
  );
};
