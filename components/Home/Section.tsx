import * as React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import { Button } from '../Button';
import { AngleSection } from '../AngleSection';

export const Section = ({
  icon,
  right = false,
  left = true,
  color = 'original.dark',
  title = 'You forgot a title',
  subtitle = 'You forgot a subtitle',
  button = 'You forgot button text',
  content = 'Placeholder content',
  ...props
}) => {
  let direction;
  if (right && !left) {
    direction = 'right';
  } else if (!right && left) {
    direction = 'left';
  } else if (right && left) {
    direction = 'right';
  } else {
    direction = 'left';
  }

  const spacingProps =
    left && !right ? { ml: 32, px: 4, textAlign: 'left' } : { mr: 32, px: 4, textAlign: 'right' };

  const titleSpace = left && !right ? { ml: '-1rem' } : { mr: '-1rem' };

  const Icon = props => (
    <Flex maxW="75%" {...spacingProps}>
      <Box as={icon} size="16rem" color="white" {...props} />
    </Flex>
  );

  return (
    <AngleSection color={color} {...props}>
      <Flex
        h="60vh"
        maxW="80%"
        pos="relative"
        mx="auto"
        my={8}
        px={4}
        flexDir="row"
        alignItems="center"
        justifyContent="center">
        {direction === 'left' && <Icon />}
        <Flex flex="1 0 auto" flexDir="column" {...spacingProps}>
          <Heading as="h3" fontSize="6xl" {...titleSpace}>
            {title}
          </Heading>
          <Heading as="h4" my={4} fontSize="4xl" fontWeight="medium" color="whiteAlpha.600">
            {subtitle}
          </Heading>
          <Text>{content}</Text>
          <Box my={8}>
            <Button leftIcon="chevron-right" variant="outline">
              {button}
            </Button>
          </Box>
        </Flex>
        {direction === 'right' && <Icon />}
      </Flex>
    </AngleSection>
  );
};
