import { Center, Heading, VStack, Divider, useColorModeValue } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Button, Ripple, RichText, Content } from "~/components";
import { useOpposingColor, useColorWhenDark, useGlow } from "~/hooks";
import { is } from "~/lib";
import { ThemeColor } from "~/types";

import type { CalloutProps } from "./types";

export const Callout = (props: CalloutProps) => {
  const { title, subtitle, body = null, button, form, ...rest } = props;

  const isDarkMode = useColorModeValue(false, true);
  const colorScheme = useColorModeValue(ThemeColor.Secondary, ThemeColor.Purple);
  const bg = `${colorScheme}.500`;
  const rippleStart = useColorModeValue("secondary.200", "secondary.700");
  const color = useOpposingColor(bg);
  const buttonHoverBg = useColorWhenDark(bg, "blackAlpha.100", "whiteAlpha.100");
  const glow = useGlow("purple.500", "purple.800");

  const fnTitle = useTitleCase();

  return (
    <Center
      py={16}
      bg={bg}
      w="100%"
      minH="xs"
      as="section"
      pos="relative"
      overflow="hidden"
      layerStyle="container"
      my={{ base: 4, lg: 16, xl: 64 }}
      px={{ base: 4, lg: 16, xl: 64 }}
      transition="box-shadow, background 0.2s ease-in-out"
      _dark={{ bg: glow.backgroundColor, boxShadow: glow.boxShadow, my: { base: 32, xl: 64 } }}
      {...rest}
    >
      {!isDarkMode && <Ripple start={rippleStart} stop={bg} />}
      <VStack spacing={{ base: 4, lg: 8 }} color={color} w="full">
        <VStack>
          <Heading as="h2" fontSize={{ base: "xl", lg: "2xl" }}>
            {fnTitle(title)}
          </Heading>
          {subtitle && (
            <Heading as="h3" fontSize="lg" fontWeight="light">
              {fnTitle(subtitle)}
            </Heading>
          )}
        </VStack>
        {is(body) && <Divider bg={color} />}
        {is(body) && <RichText content={body} />}
        {is(button) && (
          <Button
            color={color}
            variant="outline"
            href={button.link ?? ""}
            borderColor={color}
            _hover={{ backgroundColor: buttonHoverBg }}
          >
            {fnTitle(button.text)}
          </Button>
        )}
        {is(form) && <Content.Form form={{ ...form, colorScheme }} color="body-fg" />}
      </VStack>
    </Center>
  );
};
