import * as React from 'react';
import { Carousel } from 'site/components/Carousel';
import { Flex, Heading } from '@chakra-ui/core';
import { useRender, useTitle } from 'site/hooks';
import { useColorMode } from 'site/context';
import type { Document } from '@contentful/rich-text-types';

interface CardContent {
  title: string;
  body: Document;
}

interface CardProps {
  content: CardContent;
}

interface CardContainerProps {
  content: CardContent[];
  icon?: string;
  [k: string]: any;
}

const cardBg = { dark: 'whiteAlpha.100', light: 'white' };
const cardColor = { dark: 'white', light: 'original.dark' };

const Card = ({ content }: CardProps) => {
  const { title, body } = content;
  const titleMe = useTitle();
  const renderedBody = useRender(body);
  return (
    <>
      <Flex>
        <Heading as="h2" fontSize="xl">
          {titleMe(title)}
        </Heading>
      </Flex>
      <Flex ml={2}>{renderedBody}</Flex>
    </>
  );
};

export const HeroCards = ({ content, icon, ...props }: CardContainerProps) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      p={8}
      w="6xl"
      h="sm"
      bg={cardBg[colorMode]}
      color={cardColor[colorMode]}
      borderRadius="md"
      boxShadow="2xl"
      position="relative"
      flexDir="column"
      {...props}>
      <Carousel dotColor={cardColor[colorMode]}>
        {content.map((card, i) => (
          <Card content={card} key={i} />
        ))}
      </Carousel>
    </Flex>
  );
};
