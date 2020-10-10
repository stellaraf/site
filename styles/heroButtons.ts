import { mode } from '@chakra-ui/theme-tools';

import type { Dict } from 'site/types';

export const heroButtons = {
  variants: {
    heroPrimary: (props: Dict) =>
      mode(
        {
          // bg: 'primary.500',
          bg:
            'linear-gradient(45deg,rgba(41,21,214,1) 0%,rgba(145,0,250,1) 51%,rgba(41,21,214,1) 100%)',
          color: 'white',
          boxShadow: 'md',
          transition: 'all 0.2s',
          backgroundSize: '200% auto',
          mx: 4,
          // _hover: { bg: 'primary.400' },
          _hover: {
            backgroundPosition: 'right bottom',
          },
        },
        {
          // bg: 'tertiary.400',
          bg:
            'linear-gradient(45deg,rgba(80, 216, 215,1) 0%,rgba(113, 108, 233,1) 51%,rgba(80, 216, 215,1) 100%)',
          backgroundSize: '200% auto',
          color: 'white',
          boxShadow: 'md',
          mx: 4,
          // _hover: { bg: 'tertiary.300', color: 'white' },
          _hover: { backgroundPosition: 'right bottom' },
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
