import * as React from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import { useResponsiveStyle } from 'site/styles';

import type { CTAProps } from './types';

export const CallToAction = (props: CTAProps) => {
  const styles = useMultiStyleConfig('SyncedStyles', { variant: 0 });
  const rStyles = useResponsiveStyle();
  return (
    <Box
      py={24}
      sx={styles.box}
      className="__actions"
      borderBottomWidth="1px"
      borderBottomColor="original.tertiary"
      {...rStyles}
      {...props}>
      <Flex justifyContent="space-between">
        <Heading as="h5" fontSize="2xl">
          Get Started
        </Heading>
      </Flex>
    </Box>
  );
};
