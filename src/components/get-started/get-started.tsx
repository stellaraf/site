import { useMemo } from "react";
import { Center, Heading, VStack, Divider } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { Button, Ripple } from "~/components";
import { useColorValue } from "~/context";
import { useRender, useOpposingColor, useIsDark, useGlow, useResponsiveStyle } from "~/hooks";

import type { GetStartedProps } from "./types";

export const GetStarted = (props: GetStartedProps) => {
  const { title, subtitle, body = null, buttonLink, buttonText, ...rest } = props;

  const rStyles = useResponsiveStyle();
  const isDarkMode = useColorValue(false, true);
  const bg = useColorValue("secondary.500", "purple.500");
  const rippleStart = useColorValue("secondary.200", "secondary.700");
  const color = useOpposingColor(bg);
  const isDark = useIsDark(bg);
  const glow = useGlow("purple.500", "purple.800");

  const fnTitle = useTitleCase();
  const renderedBody = useRender(body);

  const hasButton = useMemo(
    () => typeof buttonLink !== "undefined" && typeof buttonText !== "undefined",
    [buttonText, buttonLink],
  );

  const wrapperProps = useColorValue(
    { bg, boxShadow: undefined, my: { base: 4, lg: 16, xl: 64 } },
    { bg: glow.backgroundColor, boxShadow: glow.boxShadow, my: { base: 32, xl: 64 } },
  );

  return (
    <Center
      py={16}
      w="100%"
      minH="xs"
      as="section"
      pos="relative"
      overflow="hidden"
      px={{ base: 4, lg: 16, xl: 64 }}
      transition="box-shadow, background 0.2s ease-in-out"
      {...wrapperProps}
      {...rStyles}
      {...rest}
    >
      {!isDarkMode && <Ripple start={rippleStart} stop={bg} />}
      <VStack spacing={{ base: 4, lg: 8 }} color={color}>
        <VStack>
          <Heading as="h2" fontSize="2xl">
            {fnTitle(title)}
          </Heading>
          {subtitle && (
            <Heading as="h3" fontSize="lg" fontWeight="light">
              {fnTitle(subtitle)}
            </Heading>
          )}
        </VStack>
        {body && <Divider bg={color} />}
        {body && renderedBody}
        {hasButton && (
          <Button
            color={color}
            variant="outline"
            href={buttonLink}
            borderColor={color}
            _hover={{
              backgroundColor: isDark ? "blackAlpha.100" : "whiteAlpha.100",
            }}
          >
            {fnTitle(buttonText!)}
          </Button>
        )}
      </VStack>
    </Center>
  );
};
