import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@chakra-ui/core';
import { useColorValue } from 'site/context';

const ReactPlayer = dynamic(() => import('react-player'));

import type { IScreen } from './types';

export const Screen = (props: IScreen) => {
  const { url, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const borderColor = useColorValue('original.dark', 'original.dark');
  const handleReady = () => {
    !loaded && setLoaded(true);
  };
  return (
    <Box
      w="75%"
      minHeight="2xl"
      zIndex={1}
      pos="relative"
      bg={borderColor}
      cursor="pointer"
      overflow="hidden"
      borderStyle="solid"
      borderRadius="2rem"
      borderWidth="0.8rem"
      borderColor={borderColor}
      boxShadow="xl"
      {...rest}>
      <Skeleton
        boxSize="100%"
        isLoaded={loaded}
        startColor="original.gray"
        endColor="original.tertiary">
        <ReactPlayer
          loop
          muted
          playing
          controls
          onReady={handleReady}
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
      </Skeleton>
    </Box>
  );
};
