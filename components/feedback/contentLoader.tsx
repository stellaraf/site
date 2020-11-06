import { Box, SkeletonText, Skeleton } from '@chakra-ui/core';
import { useResponsiveStyle } from 'site/styles';

export const ContentLoader = (props: IContentLoader) => {
  const { ...rest } = props;
  const rStyles = useResponsiveStyle();
  return (
    <Box
      overflow="hidden"
      my={{ base: 4, lg: 16 }}
      px={{ base: 4, lg: 16, xl: 64 }}
      width="100%"
      {...rStyles}
      {...rest}>
      <SkeletonText mt={16} noOfLines={1} spacing={4} height="xl" width="25%" />
      <SkeletonText mt={4} noOfLines={4} spacing={4} />
      <Skeleton mt={8} mx="auto" height="xs" width={{ base: '100%', lg: '50%' }} />
      <SkeletonText mt={16} noOfLines={8} spacing={4} />
      <Skeleton mt={8} mx="auto" height="xs" width={{ base: '100%', lg: '50%' }} />
      <SkeletonText mt={16} noOfLines={6} spacing={4} />
    </Box>
  );
};
