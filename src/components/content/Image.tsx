import { Box, Image as ChakraImage } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import type { IImage } from './types';

export const Image: React.FC<IImage> = (props: IImage) => {
  const { src, boxSize = 'xl', ...rest } = props;
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-150px' });
  return (
    <Box
      ref={ref}
      opacity={+inView}
      transition="opacity 0.2s ease-in-out"
      boxSize={boxSize}
      {...rest}
    >
      <ChakraImage src={src} boxSize={boxSize} />
    </Box>
  );
};
