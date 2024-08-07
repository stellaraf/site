import { Center, VStack, useColorModeValue } from "@chakra-ui/react";

import { AnimatedDiv } from "~/components";
import { useConfig } from "~/context";
import { useGlow, useOpposingColor, useRandomElement, useSSR } from "~/hooks";

import { Testimonial } from "./testimonial";

import type { CenterProps } from "@chakra-ui/react";

export const Testimonials = (props: CenterProps) => {
  const { testimonials } = useConfig();
  const testimonial = useRandomElement(testimonials);

  const bg = useColorModeValue("light.500", "blackSolid.500");
  const color = useOpposingColor(bg);
  const glow = useGlow("blackSolid.500", "blackSolid.500");

  // this can probably go away or change if/when this gets migrated to remix, and the data
  // fetching/randomization can take place at the server level scoped to only this component.
  const { isClient } = useSSR();

  return (
    <Center
      py={16}
      w="100%"
      minH="xs"
      as="section"
      bg="light.500"
      pos="relative"
      overflow="hidden"
      layerStyle="container"
      px={{ base: 4, lg: 16, xl: 64 }}
      my={{ base: 4, lg: 16, xl: 64 }}
      transition="box-shadow, background 0.2s ease-in-out"
      _dark={{
        my: { base: 32, xl: 64 },
        bg: glow.backgroundColor,
        boxShadow: glow.boxShadow,
      }}
      {...props}
    >
      <VStack
        color={color}
        borderRadius="md"
        spacing={{ base: 4, lg: 8 }}
        _light={{ bg: "white", boxShadow: "xl" }}
      >
        <AnimatedDiv zIndex={1} animate={{ x: 0 }} initial={{ x: "100%" }}>
          {isClient && <Testimonial {...testimonial} />}
        </AnimatedDiv>
      </VStack>
    </Center>
  );
};
