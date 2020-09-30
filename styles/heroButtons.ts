import { mode } from '@chakra-ui/theme-tools';

import type { Dict } from 'site/types';

export const heroButtons = {
  variants: {
    heroPrimary: (props: Dict) =>
      mode(
        {
          bg: 'primary.500',
          color: 'white',
          boxShadow: 'md',
          mx: 4,
          _hover: { bg: 'primary.400' },
        },
        {
          bg: 'tertiary.400',
          color: 'white',
          boxShadow: 'md',
          mx: 4,
          _hover: { bg: 'tertiary.300', color: 'white' },
        },
      )(props),
    heroSecondary: (props: Dict) =>
      mode(
        { bg: 'light.50', color: 'black', boxShadow: 'md', mx: 4, _hover: { bg: 'blackAlpha.50' } },
        {
          bg: 'transparent',
          borderColor: 'white',
          borderWidth: '1px',
          boxShadow: 'md',
          mx: 4,
          _hover: { bg: 'whiteAlpha.100' },
        },
      )(props),
  },
};
