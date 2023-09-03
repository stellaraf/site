import { Box, Flex, isStyleProp, useColorModeValue } from "@chakra-ui/react";

import { useOpposingColor } from "~/hooks";

import type { Color, IconProps } from "./types";
import type { ChakraProps } from "@chakra-ui/react";

export const Icon = (props: IconProps) => {
  const { color: bgColor = "primary", size = 20, url, ...rest } = props;

  const restProps = Object.entries(rest).reduce<ChakraProps>((final, [key, value]) => {
    if (isStyleProp(key)) {
      // @ts-expect-error TS can't infer key type even when cast.
      final[key] = value;
    }
    return final;
  }, {} as ChakraProps);

  const bg = useColorModeValue<Color, Color>(
    bgColor === "black" ? "black" : bgColor === "white" ? "whiteAlpha.500" : `${bgColor}.500`,
    bgColor === "black" ? "white" : bgColor === "white" ? "white" : `${bgColor}.300`,
  );

  const color = useOpposingColor(bg);

  let mask = url;

  if (url.startsWith("//")) {
    mask = `https://${url}`;
  }

  return (
    <Flex
      bg={bg}
      width={size}
      height={size}
      color={color}
      align="center"
      minWidth={size}
      justify="center"
      overflow="hidden"
      borderRadius="full"
      {...restProps}
    >
      <Box
        css={{ mask: `url(${mask}) no-repeat center`, maskSize: "cover" }}
        backgroundColor={color}
        boxSize="50%"
      />
    </Flex>
  );
};
