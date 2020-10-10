import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { SectionDivider } from 'site/components';
import { useColorValue } from 'site/context';
import { useResponsiveStyle } from 'site/styles';

import type { CTAProps } from './types';

export const CallToAction = (props: CTAProps) => {
  const showBorder = useColorValue(false, true);
  const rStyles = useResponsiveStyle();
  return (
    <>
      <Box py={24} className="__actions" {...rStyles} {...props}>
        <Flex justifyContent="space-between">
          <Heading as="h5" fontSize="2xl">
            Get Started
          </Heading>
        </Flex>
      </Box>
      {showBorder && <SectionDivider />}
    </>
  );
};
