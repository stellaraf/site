import { Box, Flex, SkeletonText, Skeleton } from '@chakra-ui/react';
import { Content } from 'site/components';
import { validProps } from 'site/util';

import type { IContentLoader } from './types';

export const ContentLoader = (props: IContentLoader) => {
  return (
    <Box
      as="article"
      overflow="hidden"
      zIndex={1}
      minW={{ base: '90vw', lg: '80vw' }}
      {...validProps(props)}>
      <Flex direction="column" align="flex-start">
        <Skeleton mt={16} noOfLines={1} height="2rem" width="25%" />
      </Flex>
      <Content.Body>
        <SkeletonText mt={4} noOfLines={4} spacing={4} />
        <Skeleton mt={8} mx="auto" height="xs" width={{ base: '100%', lg: '50%' }} />
        <SkeletonText mt={16} noOfLines={8} spacing={4} />
        <Skeleton mt={8} mx="auto" height="xs" width={{ base: '100%', lg: '50%' }} />
        <SkeletonText mt={16} noOfLines={6} spacing={4} />
      </Content.Body>
    </Box>
  );
};
