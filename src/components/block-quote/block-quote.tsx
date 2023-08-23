import { chakra, useStyleConfig } from "@chakra-ui/react";

import { useColorValue } from "~/context";
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
  const defaultScheme = useColorValue("blackAlpha", "tertiary");
  let ctx = useBlockQuoteStyle();
  if (ctx === null) {
    ctx = {
      colorScheme: "gray",
      blockQuote: { colorScheme: colorScheme ?? defaultScheme },
    };
  }

  const code = useStyleConfig("Code", {
    colorScheme: ctx.blockQuote.colorScheme,
  });

  const containerStyle = publicProps(code, "bg", "color");

  const borderColor = useColorValue(`${ctx.colorScheme}.200`, `${ctx.colorScheme}.600`);

  return <BaseBlockQuote borderLeftColor={borderColor} sx={containerStyle} {...rest} />;
};
