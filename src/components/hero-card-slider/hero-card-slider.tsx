import { Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Carousel, RichText } from "~/components";

import type { HeroCardProps, HeroCardSliderProps } from "./types";

const HeroCard = (props: HeroCardProps) => {
  const { content } = props;
  const { title, body } = content;
  const fnTitle = useTitleCase();

  return (
    <>
      <Heading as="h2" fontSize="xl">
        {fnTitle(title)}
      </Heading>
      <RichText content={body} />
    </>
  );
};

export const HeroCardSlider = (props: HeroCardSliderProps) => {
  const { content, icon, ...rest } = props;

  return (
    <Flex
      p={8}
      zIndex={1}
      width="6xl"
      height="sm"
      boxShadow="2xl"
      flexDir="column"
      borderRadius="md"
      position="relative"
      bg="white"
      color="dark.500"
      _dark={{
        bg: "whiteAlpha.100",
        color: "white",
        backdropFilter: "blur(2px)",
      }}
      {...rest}
    >
      <Carousel color="dark.500" _dark={{ color: "white" }}>
        {content.map(card => (
          <HeroCard content={card} key={card.title} />
        ))}
      </Carousel>
    </Flex>
  );
};
