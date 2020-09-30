import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import { BsChevronRight } from '@meronex/icons/bs';
import { Button } from 'site/components';
import { useColorValue } from 'site/context';
import { useRender } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { HomeSectionProps } from './types';

export const HomeSection = forwardRef<HTMLElement, HomeSectionProps>((props, ref) => {
  const { section, index, ...rest } = props;
  const sectBorder = useColorValue(
    {},
    { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
  );
  const { title, subtitle, body, showButton, buttonText, buttonLink } = section;
  const renderedBody = useRender(body);
  const styles = useMultiStyleConfig('SyncedStyles', { variant: index });
  const rStyles = useResponsiveStyle();
  const padding = Object();
  if (index === 0) {
    padding.pt = '320px';
    padding.pb = 24;
  } else {
    padding.py = 16;
  }
  return (
    <Box
      ref={ref}
      as="section"
      overflow="hidden"
      // sx={styles.box}
      {...padding}
      {...sectBorder}
      {...rest}>
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
          // <Button href={buttonLink} leftIcon={<BsChevronRight />} sx={styles.button}>
          <Button href={buttonLink} leftIcon={<BsChevronRight />}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
});
