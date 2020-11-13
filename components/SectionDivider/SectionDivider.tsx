import { Box, useToken } from '@chakra-ui/react';

import type { ISectionDivider } from './types';

export const SectionDivider = (props: ISectionDivider) => {
  const { left = true, right = false, straight = false, ...rest } = props;
  let transform = Object();
  if (!straight && right) {
    transform = { transform: 'rotate(3deg)' };
  } else if (!straight && left) {
    transform = { transform: 'rotate(-3deg)' };
  }
  const one = useToken('colors', 'tertiary.600');
  const two = useToken('colors', 'tertiary.700');
  const three = useToken('colors', 'tertiary.800');
  return (
    <Box
      pos="relative"
      height="1px"
      opacity={0.9}
      width="150%"
      overflow="hidden"
      bg="original.tertiary"
      {...transform}
      boxShadow={`0 0 10px 1px ${one}, 0 0 20px 2px ${two}, 0 0 30px 4px ${three}`}
      {...rest}
    />
  );
};
