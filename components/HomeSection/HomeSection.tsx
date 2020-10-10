import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { BsChevronRight } from '@meronex/icons/bs';
import { Button, SectionDivider } from 'site/components';
import { useColorValue } from 'site/context';
import { useRender } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { HomeSectionProps } from './types';

export const HomeSection = (props: HomeSectionProps) => {
  const { section, index, ...rest } = props;
  const showBorder = useColorValue(false, true);
  const { title, subtitle, body, showButton, buttonText, buttonLink } = section;
  const renderedBody = useRender(body);
  const rStyles = useResponsiveStyle();
  const padding = Object();
  if (index === 0) {
    padding.pt = '320px';
    padding.pb = 24;
  } else {
    padding.py = 16;
  }
  return (
    <>
      <Box as="section" overflow="hidden" {...padding} {...rest}>
        <Flex
          height="100%"
          overflow="hidden"
          py={16}
          alignItems="center"
          flexDir="column"
          textAlign={{ base: 'center', lg: 'justify' }}
          {...rStyles}>
          <Heading as="h3" fontSize={{ base: '3xl', lg: '4xl' }}>
            {title}
          </Heading>
          <Heading as="h4" fontSize={{ base: '1.5rem', lg: 'xl' }} fontWeight="light">
            {subtitle}
          </Heading>
          <Box
            my={16}
            maxW={[null, null, '60%']}
            whiteSpace="pre-line"
            fontSize="lg"
            textAlign={{ base: 'left', lg: 'justify' }}>
            {renderedBody}
          </Box>
          {showButton && (
            <Button href={buttonLink} leftIcon={<BsChevronRight />} variant="heroPrimary">
              {buttonText}
            </Button>
          )}
        </Flex>
      </Box>
      {showBorder && <SectionDivider />}
    </>
  );
};
