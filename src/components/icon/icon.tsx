import { useMemo } from "react";
import { Box, Flex, isStyleProp } from "@chakra-ui/react";
import { DynamicIcon } from "~/components";
import { useColorValue } from "~/context";
import { useOpposingColor } from "~/hooks";

import type { ChakraProps } from "@chakra-ui/react";
import type { DynamicIconProps } from "~/components";
import type { IconProps } from "./types";

export const Icon = (props: IconProps) => {
  const { color: bgColor = "primary", size = 20, ...rest } = props;

  let icon: DynamicIconProps["icon"] | undefined;
  let url: string | undefined;

  if ("icon" in props) {
    icon = props.icon;
  } else {
    url = props.url;
  }

  const restProps = Object.entries(rest).reduce<ChakraProps>((final, [key, value]) => {
    if (isStyleProp(key)) {
      // @ts-expect-error TS can't infer key type even when cast.
      final[key] = value;
    }
    return final;
  }, {} as ChakraProps);

  const bg = useColorValue(`${bgColor}.500`, `${bgColor}.300`);
  const color = useOpposingColor(bg);

  const fromUrl = useMemo<boolean>(() => {
    if (typeof icon === "undefined" && typeof url === "string") {
      return true;
    }
    return false;
  }, [url, typeof icon]);

  if (fromUrl && url?.startsWith("//")) {
    url = `https://${url}`;
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
      {fromUrl ? (
        <Box css={{ mask: `url(${url}) no-repeat center` }} backgroundColor={color} boxSize="50%" />
      ) : (
        <DynamicIcon icon={icon!} boxSize="50%" />
      )}
    </Flex>
  );
};
