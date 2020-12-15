import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@chakra-ui/react';

const ReactPlayer = dynamic(() => import('react-player'), {
  loading: () => <Skeleton boxSize="100%" startColor="gray.500" endColor="tertiary.500" />,
});

import type { IScreen } from './types';

export const Screen = (props: IScreen) => {
  const { url, ...rest } = props;
  return (
    <Box
      width={{ base: '100%', lg: '75%' }}
      minHeight={{ base: 48, lg: '2xl' }}
      zIndex={1}
      pos="relative"
      bg="dark.500"
      cursor="pointer"
      overflow="hidden"
      borderStyle="solid"
      borderRadius={{ base: '1rem', lg: '2rem' }}
      borderWidth={{ base: '0.2rem', lg: '0.8rem' }}
      borderColor="dark.500"
      boxShadow="xl"
      {...rest}>
      <ReactPlayer
        loop
        muted
        playing
        controls
        url={url}
        volume={0}
        width="100%"
        height="100%"
        style={{ borderRadius: '1.6rem' }}
        config={{
          file: {
            attributes: {
              controlsList: ['nodownload', 'nofullscreen'],
            },
          },
        }}
      />
    </Box>
  );
};
