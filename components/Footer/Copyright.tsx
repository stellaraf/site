import { Box } from '@chakra-ui/react';
import { useConfig } from 'site/context';
import type { BoxProps } from './types';

export const Copyright = (props: BoxProps) => {
  const { orgName } = useConfig();
  return (
    <Box
      mt={8}
      fontSize="sm"
      color="whiteAlpha.700"
      {...props}>{`Copyright © ${new Date().getFullYear()} ${orgName}`}</Box>
  );
};
