import * as React from 'react';
import { useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useRender } from 'site/hooks';
import { titleMe } from 'site/util';
import { useColorMode } from 'site/context';
import type { Document } from '@contentful/rich-text-types';
import type { BoxProps, HeadingProps } from '@chakra-ui/core';
import type { AnimationProps } from 'react-spring';

interface CardContent {
  title: string;
  body: Document;
}

interface RenderedHeroCardContent {
  Title: React.FC;
  Body: React.FC;
}

interface CardProps {
  content: CardContent;
  style: AnimationProps;
}

interface CardContainerProps {
  content: CardContent[];
  icon?: string;
  [k: string]: any;
}

const useHeroCardContent = ({ title, body }: CardContent): RenderedHeroCardContent => {
  const renderedBody = useRender(body);
  const Title = (props: HeadingProps) => (
    <Heading as="h2" fontSize="xl" {...props}>
      {titleMe(title)}
    </Heading>
  );
  const Body = (props: BoxProps) => (
    <Box ml={2} {...props}>
      {renderedBody}
    </Box>
  );
  return { Title, Body };
};

const cardBg = { dark: 'whiteAlpha.100', light: 'white' };
const cardColor = { dark: 'white', light: 'original.dark' };

const Card = ({ content, style }: CardProps) => {
  const { Title, Body } = useHeroCardContent(content);
  return (
    <animated.div style={style}>
      <Flex>
        <Title />
      </Flex>
      <Flex>
        <Body />
      </Flex>
    </animated.div>
  );
};

const Dot = ({ active, color }) => {
  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      borderColor={color}
      borderRadius="50%"
      w={2}
      h={2}
      mx={1}
      bg={active ? color : 'transparent'}
    />
  );
};

export const HeroCards = ({ content, icon, ...props }: CardContainerProps) => {
  const [active, setActive] = useState(0);
  const { colorMode } = useColorMode();
  const transition = useTransition(content, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });
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
      {transition((style, item) => (
        <Card content={item} style={style} key={item.title} />
      ))}
      <Flex
        position="absolute"
        width="100%"
        bottom={8}
        alignItems="flex-end"
        justifyContent="center">
        {content.map((_, i) => (
          <Dot active={i === active} color={cardColor[colorMode]} />
        ))}
      </Flex>
    </Flex>
  );
};
