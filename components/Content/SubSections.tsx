import * as React from 'react';
import { useCallback } from 'react';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/core';
import { Button, Icon } from 'site/components';
import { useRender, useTitle } from 'site/hooks';
import { useColorValue } from 'site/context';

import type { RenderedSubSectionProps, SubSectionGroupProps } from './types';

const SubSection = (props: RenderedSubSectionProps) => {
  const { title, body, icon, iconColor = 'primary', buttonLink, buttonText } = props;
  const titleMe = useTitle();
  const boxProps = useColorValue(
    { bg: 'white', boxShadow: 'xl' },
    { bg: 'whiteAlpha.50', css: { backdropFilter: 'blur(2px)' } },
  );
  const hasButton = useCallback(
    () => typeof buttonLink !== 'undefined' && typeof buttonText !== 'undefined',
    [buttonText, buttonLink],
  );
  return (
    <Flex
      {...boxProps}
      p={8}
      direction="column"
      justify="space-between"
      borderRadius="md"
      zIndex={1}>
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Heading as="h4" fontSize="lg" mb={4}>
            {titleMe(title)}
          </Heading>
          {icon && <Icon size={12} icon={icon} color={iconColor} />}
        </Flex>
        <Box whiteSpace="pre-line" fontSize="lg" textAlign={{ base: 'left', lg: 'justify' }}>
          {body}
        </Box>
      </Flex>
      {hasButton() && (
        <Flex align="center" justify={{ base: 'flex-start', lg: 'flex-end' }}>
          <Button size="sm" colorScheme={iconColor} variant="outline" href={buttonLink}>
            {typeof buttonText !== 'undefined' && titleMe(buttonText)}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export const SubSections = (props: SubSectionGroupProps) => {
  const { sections, ...rest } = props;

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} my={16} {...rest}>
      {sections.map((s, i) => {
        const { body, icon, ...otherProps } = s;
        const renderedBody = useRender(body);
        return <SubSection key={i} body={renderedBody} icon={icon?.file.url} {...otherProps} />;
      })}
    </SimpleGrid>
  );
};
