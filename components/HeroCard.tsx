import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import type { Document } from '@contentful/rich-text-types';
import type { BoxProps, HeadingProps } from '@chakra-ui/core';
import { useRender } from '../hooks';
import { titleMe } from '../util';
import { useColorMode } from '../context';

interface HeroCardContent {
  title: string;
  body: Document;
}

interface RenderedHeroCardContent {
  Title: React.FC;
  Body: React.FC;
}

interface HeroCardProps {
  content: HeroCardContent;
  icon?: string;
  [k: string]: any;
}

const useHeroCardContent = ({ title, body }: HeroCardContent): RenderedHeroCardContent => {
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

export const HeroCard = ({ content, icon, ...props }: HeroCardProps) => {
  const { colorMode } = useColorMode();
  const { Title, Body } = useHeroCardContent(content);
  return (
    <Box
      p={8}
      w="6xl"
      h="sm"
      bg={cardBg[colorMode]}
      color={cardColor[colorMode]}
      borderRadius="md"
      boxShadow="2xl"
      {...props}>
      <Flex>
        <Title />
      </Flex>
      <Flex>
        <Body />
      </Flex>
    </Box>
  );
};
