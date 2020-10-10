import * as React from 'react';
import { memo } from 'react';
import { Box } from '@chakra-ui/core';
import { FaTimes as Clear } from '@meronex/icons/fa';
import { useColorValue } from 'site/context';

import type { IIndicator } from './types';

const _ClearIcon = (props: IIndicator) => {
  const { innerProps } = props;

  const color = useColorValue('gray.200', 'whiteAlpha.200');
  return (
    <Box {...innerProps}>
      <Box as={Clear} mx={2} color={color} className="__rs-icon" transition="all 0.2s" />
    </Box>
  );
};

export const ClearIcon = memo(
  _ClearIcon,
  // Only re-render if the options have changed.
  (prev, next) => prev.options.length === next.options.length,
);
