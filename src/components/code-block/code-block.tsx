import {
  Box,
  useClipboard,
  IconButton,
  useStyleConfig,
  useBreakpointValue,
} from "@chakra-ui/react";

import { DynamicIcon } from "~/components";
import { useColorValue } from "~/context";
import { reactChildText, publicProps } from "~/lib";

import { useCodeBlockStyle } from "./use-code-block-style";

import type { CodeBlockProps } from "./types";

export const CodeBlock = (props: CodeBlockProps) => {
  const { children, ...rest } = props;
  const defaultScheme = useColorValue("blackAlpha", "tertiary");
  const size = useBreakpointValue({ base: "md", lg: "sm" });

  let ctx = useCodeBlockStyle();

  if (ctx === null) {
    ctx = {
      colorScheme: "gray",
      codeBlock: { colorScheme: defaultScheme },
      copyButton: { colorScheme: defaultScheme, variant: "ghost" },
    };
  }

  const code = useStyleConfig("Code", {
    colorScheme: ctx.codeBlock.colorScheme,
  });

  const containerStyle = publicProps(code, "bg", "color");

  const btnSx = useStyleConfig("Button", {
    colorScheme: ctx.copyButton.colorScheme,
    variant: "ghost",
  });

  const copyValue = reactChildText(children);

  const { hasCopied, onCopy } = useClipboard(copyValue);

  const borderColor = useColorValue(`${ctx.colorScheme}.200`, `${ctx.colorScheme}.600`);

  return (
    <Box
      p={3}
      mt={5}
      border="1px"
      fontSize="sm"
      pos="relative"
      borderRadius="md"
      sx={containerStyle}
      borderColor={borderColor}
      {...rest}
    >
      <Box
        mr={12}
        as="pre"
        fontFamily="mono"
        whiteSpace="pre-wrap"
        minHeight={btnSx.h as number}
        css={{
          "& > code": { background: "unset", color: "unset", padding: 0 },
        }}
      >
        {children}
      </Box>
      <IconButton
        sx={btnSx}
        m={2}
        top={0}
        right={0}
        size={size}
        pos="absolute"
        aria-label="Copy to Clipboard"
        icon={
          <>
            <DynamicIcon
              icon={{ bi: "BiCheck" }}
              transition="all 0.2s ease"
              opacity={hasCopied ? 1 : 0}
              pos={hasCopied ? undefined : "absolute"}
            />

            <DynamicIcon
              icon={{ bi: "BiCopy" }}
              transition="all 0.2s ease"
              opacity={hasCopied ? 0 : 1}
              pos={hasCopied ? "absolute" : undefined}
            />
          </>
        }
        onClick={onCopy}
      />
    </Box>
  );
};
