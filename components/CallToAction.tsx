import * as React from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import type { BoxProps } from '@chakra-ui/core';

export const CalltoAction = (props: BoxProps) => {
  const styles = useMultiStyleConfig('SyncedStyles', { variant: 0 });
  return (
    <Box
      className="__actions"
      py={24}
      px={24}
      borderBottomWidth="1px"
      borderBottomColor="original.tertiary"
      sx={styles.box}
      {...props}>
      <Flex justifyContent="space-between">
        <Heading as="h5" fontSize="2xl">
          Get Started
        </Heading>
      </Flex>
    </Box>
  );
};
