import { Box } from '@chakra-ui/react';
import { useColorValue } from 'site/context';
import { validProps } from 'site/util';

import type { IBackdrop } from './types';

export const Backdrop = (props: IBackdrop) => {
  const color = useColorValue('original.dark', 'original.light');
  return (
    <Box
      mx="auto"
      zIndex={1}
      bg={color}
      pos="relative"
      boxShadow="xl"
      cursor="pointer"
      overflow="hidden"
      borderStyle="solid"
      borderColor={color}
      width={{ base: '100%', lg: '75%', xl: '50%' }}
      borderRadius={{ base: '1rem', lg: '2rem' }}
      borderWidth={{ base: '0.2rem', lg: '0.4rem', xl: '0.8rem' }}
      {...validProps(props)}
    />
  );
};
