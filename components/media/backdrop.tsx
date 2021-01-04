import { chakra } from '@chakra-ui/react';
import { useColorValue } from '~/context';
import { shouldForwardProp } from '~/util';

import type { IBackdrop } from './types';

const BackdropFactory = chakra('div', {
  shouldForwardProp,
  baseStyle: {
    mx: 'auto',
    zIndex: 1,
    pos: 'relative',
    boxShadow: 'xl',
    cursor: 'pointer',
    overflow: 'hidden',
    borderStyle: 'solid',
    width: { base: '100%', lg: '75%', xl: '50%' },
    borderRadius: { base: '1rem', lg: '2rem' },
    borderWidth: { base: '0.2rem', lg: '0.4rem', xl: '0.8rem' },
  },
});

export const Backdrop: React.FC<IBackdrop> = (props: IBackdrop) => {
  const color = useColorValue('dark.500', 'light.500');

  return <BackdropFactory bg={color} borderColor={color} {...props} />;
};
