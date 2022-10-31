import { Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Carousel, RichText } from "~/components";
import { useColorValue } from "~/context";

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
      <RichText>{body}</RichText>
    </>
  );
};

export const HeroCardSlider = (props: HeroCardSliderProps) => {
  const { content, icon, ...rest } = props;
  const styles = useColorValue(
    { bg: "white", color: "dark.500" },
    {
      bg: "whiteAlpha.100",
      color: "white",
      css: { backdropFilter: "blur(2px)" },
    },
  );

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
      {...styles}
      {...rest}
    >
      <Carousel dotColor={styles.color}>
        {content.map(card => (
          <HeroCard content={card} key={card.title} />
        ))}
      </Carousel>
    </Flex>
  );
};
