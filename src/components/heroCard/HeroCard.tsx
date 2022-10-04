import { Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { Carousel } from "~/components";
import { useColorValue } from "~/context";
import { useRender } from "~/hooks";

import type { ICard, IHeroCards } from "./types";

const Card: React.FC<ICard> = (props: ICard) => {
  const { content } = props;
  const { title, body } = content;
  const titleMe = useTitleCase();
  const renderedBody = useRender(body);
  return (
    <>
      <Heading as="h2" fontSize="xl">
        {titleMe(title)}
      </Heading>
      {renderedBody}
    </>
  );
};

export const HeroCards: React.FC<IHeroCards> = (props: IHeroCards) => {
  const { content, icon, ...rest } = props;
  const styles = useColorValue(
    { bg: "white", color: "dark.500" },
    { bg: "whiteAlpha.100", color: "white", css: { backdropFilter: "blur(2px)" } },
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
        {content.map((card, i) => (
          <Card content={card} key={i} />
        ))}
      </Carousel>
    </Flex>
  );
};
