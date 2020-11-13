import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@chakra-ui/react';
import { useColorValue } from 'site/context';

const ReactPlayer = dynamic(() => import('react-player'), {
  loading: () => (
    <Skeleton boxSize="100%" startColor="original.gray" endColor="original.tertiary" />
  ),
});

import type { IScreen } from './types';

export const Screen = (props: IScreen) => {
  const { url, ...rest } = props;
  const borderColor = useColorValue('original.dark', 'original.dark');
  return (
    <Box
      width={{ base: '100%', lg: '75%' }}
      minHeight={{ base: 48, lg: '2xl' }}
      zIndex={1}
      pos="relative"
      bg={borderColor}
      cursor="pointer"
      overflow="hidden"
      borderStyle="solid"
      borderRadius={{ base: '1rem', lg: '2rem' }}
      borderWidth={{ base: '0.2rem', lg: '0.8rem' }}
      borderColor={borderColor}
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
