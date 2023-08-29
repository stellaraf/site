import { chakra, useStyleConfig } from "@chakra-ui/react";

import { publicProps } from "~/lib";
import { shouldForwardProp } from "~/theme";

import { useBlockQuoteStyle } from "./use-block-quote-style";

import type { BlockQuoteProps } from "./types";

const BaseBlockQuote = chakra("blockquote", {
  shouldForwardProp,
  baseStyle: {
    my: 8,
    p: 4,
    fontSize: "lg",
    fontFamily: "body",
    lineHeight: "tall",
    fontWeight: "light",
    borderLeftWidth: 8,
    position: "relative",
    borderRadius: "md",
    boxShadow: "md",
    borderLeftStyle: "solid",
  },
});

export const BlockQuote = (props: BlockQuoteProps) => {
  const { colorScheme, ...rest } = props;
  let ctx = useBlockQuoteStyle();
  if (ctx === null) {
    ctx = {
      colorScheme: "gray",
      blockQuote: {
        colorScheme: colorScheme ?? "blackAlpha",
        _dark: { colorScheme: colorScheme ?? "tertiary" },
      },
    };
  }

  const code = useStyleConfig("Code", {
    colorScheme: ctx.blockQuote.colorScheme,
  });

  const containerStyle = publicProps(code, "bg", "color");

  return (
    <BaseBlockQuote
      borderLeftColor={`${ctx.colorScheme}.200`}
      _dark={{ borderLeftColor: `${ctx.colorScheme}.600` }}
      sx={containerStyle}
      {...rest}
    />
  );
};
