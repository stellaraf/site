import * as React from 'react';
import { Box } from '@chakra-ui/core';
import { useTheme } from 'site/context';

import type { ISectionDivider } from './types';

export const SectionDivider = (props: ISectionDivider) => {
  const { left = true, right = false, straight = false, ...rest } = props;
  const { colors } = useTheme();
  const { primary, secondary, tertiary } = colors.original;
  let transform = Object();
  if (!straight && left) {
    transform = { transform: 'rotate(-3deg)' };
  } else if (!straight && right) {
    transform = { transform: 'rotate(3deg)' };
  }
  return (
    <Box
      pos="relative"
      height="1px"
      width="100%"
      overflow="hidden"
      bg="tertiary.200"
      {...transform}
      // transform="rotate(-3deg)"
      // boxShadow="0 0 15px #4CC9F0, 0 0 25px #2b3c8f, 0 0 35px #2a174a"
      boxShadow={`0 0 15px ${tertiary}, 0 0 25px ${primary}, 0 0 35px ${secondary}`}
      {...rest}
    />
  );
};
