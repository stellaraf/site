import * as React from 'react';
import { Carousel } from 'site/components/Carousel';
import { Flex, Heading } from '@chakra-ui/core';
import { useRender, useTitle } from 'site/hooks';
import { useColorValue } from 'site/context';

import type { CardProps, CardContainerProps } from './types';

const Card = (props: CardProps) => {
  const { content } = props;
  const { title, body } = content;
  const titleMe = useTitle();
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

export const HeroCards = (props: CardContainerProps) => {
  const { content, icon, ...rest } = props;
  const bg = useColorValue('white', 'whiteAlpha.100');
  const color = useColorValue('original.dark', 'white');
  return (
    <Flex
      p={8}
      bg={bg}
      width="6xl"
      height="sm"
      color={color}
      boxShadow="2xl"
      flexDir="column"
      borderRadius="md"
      position="relative"
      {...rest}>
      <Carousel dotColor={color}>
        {content.map((card, i) => (
          <Card content={card} key={i} />
        ))}
      </Carousel>
    </Flex>
  );
};
