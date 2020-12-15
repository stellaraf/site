import { Box } from '@chakra-ui/react';
import { Video } from 'site/components';

import type { IScreen } from './types';

export const Screen = (props: IScreen) => {
  const { url, enableControls = false, ...rest } = props;

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
      <Video url={url} enableControls={enableControls} />
    </Box>
  );
};
