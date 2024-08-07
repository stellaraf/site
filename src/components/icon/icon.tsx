import { Box, chakra, isStyleProp, useColorModeValue } from "@chakra-ui/react";

import { useOpposingColor } from "~/hooks";

import { type Color, type IconProps, isElementIcon, isUrlIcon } from "./types";

import type { ChakraProps } from "@chakra-ui/react";

export const IconWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    width: 20,
    height: 20,
    alignItems: "center",
    minWidth: 20,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "full",
  },
});

function maskUrl(url: string): string {
  if (url && url.startsWith("//")) {
    return `https://${url}`;
  }
  return url;
}

export const Icon = (props: IconProps) => {
  const {
    color: lightColor = "primary",
    size = 20,
    url,
    icon,
    iconSize,
    _dark = { color: lightColor },
    noBackground = false,
    ...rest
  } = props;

  const { color: darkColor, ...darkRest } = _dark;

  const restProps = Object.entries({ ...rest, _dark: { ...darkRest } }).reduce<ChakraProps>(
    (final, [key, value]) => {
      if (isStyleProp(key)) {
        // @ts-expect-error TS can't infer key type even when cast.
        final[key] = value;
      }
      return final;
    },
    {} as ChakraProps,
  );

  const bg = useColorModeValue<Color, Color>(
    noBackground
      ? "white"
      : lightColor === "black"
        ? "black"
        : lightColor === "white"
          ? "whiteAlpha.500"
          : `${lightColor}.500`,
    noBackground
      ? "black"
      : darkColor === "black"
        ? "white"
        : darkColor === "white"
          ? "white"
          : `${darkColor}.300`,
  );

  const color = useOpposingColor(bg);

  return (
    <IconWrapper
      bg={noBackground ? undefined : bg}
      width={size}
      height={size}
      color={color}
      minWidth={size}
      {...restProps}
    >
      {isUrlIcon(props) && (
        <Box
          css={{ mask: `url(${maskUrl(props.url)}) no-repeat center`, maskSize: "cover" }}
          backgroundColor={color}
          boxSize="50%"
        />
      )}
      {isElementIcon(props) && <Box as={props.icon} boxSize={props.iconSize ?? "50%"}></Box>}
    </IconWrapper>
  );
};
