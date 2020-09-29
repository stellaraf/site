import * as React from 'react';
import { useState } from '@hookstate/core';
import { Box, Flex, Image, Button, Skeleton, Text, useBreakpointValue } from '@chakra-ui/core';
import { useColorValue } from 'site/context';

import type { IPhoto, IPhotoWrapper } from './types';

const PhotoWrapper = (props: IPhotoWrapper) => (
  <Box>
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      minWidth={1}
      maxWidth="100%"
      position="relative"
      {...props}
    />
  </Box>
);

/**
 * Single Avatar Photo
 */
export const Photo = (props: IPhoto) => {
  const { attrs, onClick, ...rest } = props;
  const photoBorder = useColorValue('whiteAlpha.400', 'blackAlpha.400');
  const { name, title, photo } = attrs;
  const ready = useState(false);
  const handleLoad = () => {
    ready.set(true);
  };
  const hover = useBreakpointValue({ base: {}, lg: { transform: 'scale(1.25)' } });
  return (
    <PhotoWrapper {...rest}>
      <Button
        variant="unstyled"
        height="100%"
        onClick={onClick}
        overflow="hidden"
        width={32}
        rounded="full">
        <Skeleton
          isLoaded={ready.value}
          height={32}
          width={32}
          rounded="full"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={photoBorder}>
          <Image
            fallbackSrc="https://via.placeholder.com/150"
            src={photo.url}
            alt={name}
            onLoad={handleLoad}
            rounded="full"
            width="100%"
            borderWidth="1px"
            borderStyle="solid"
            borderColor={photoBorder}
            transition="transform .15s ease 0s"
            _hover={hover}
          />
        </Skeleton>
      </Button>
      <Text mt={4} fontSize="sm" fontWeight="medium" opacity={0.8}>
        {name}
      </Text>
      <Text fontSize="xs" opacity="0.5">
        {title}
      </Text>
    </PhotoWrapper>
  );
};
