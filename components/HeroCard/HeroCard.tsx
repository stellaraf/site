import { Carousel } from 'site/components';
import { Flex, Heading } from '@chakra-ui/react';
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
  const styles = useColorValue(
    { bg: 'white', color: 'dark.500' },
    { bg: 'whiteAlpha.100', color: 'white', css: { backdropFilter: 'blur(2px)' } },
  );
  return (
    <Flex
      p={8}
      width="6xl"
      height="sm"
      boxShadow="2xl"
      flexDir="column"
      borderRadius="md"
      position="relative"
      zIndex={1}
      {...styles}
      {...rest}>
      <Carousel dotColor={styles.color}>
        {content.map((card, i) => (
          <Card content={card} key={i} />
        ))}
      </Carousel>
    </Flex>
  );
};
