import * as React from 'react';
import { useState } from '@hookstate/core';
import { Box, Divider, Flex, Image, Collapse, Button, Text } from '@chakra-ui/core';
import { useRender } from 'site/hooks';
import { useColorValue } from 'site/context';

import type { PhotoProps, PhotoGroupProps, WrapperProps } from './types';

const Wrapper = (props: WrapperProps) => (
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
 * Single Avatar & Bio
 */
const Photo = (props: PhotoProps) => {
  const { attrs, onClick, ...rest } = props;
  const photoBorder = useColorValue('whiteAlpha.400', 'blackAlpha.400');
  const { name, title, photo } = attrs;
  return (
    <Wrapper {...rest}>
      <Button
        variant="unstyled"
        height="100%"
        onClick={onClick}
        overflow="hidden"
        width={32}
        rounded="full">
        <Image
          src={photo.url}
          alt={name}
          rounded="full"
          width="100%"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={photoBorder}
          transition="transform .15s ease 0s"
          _hover={{ transform: 'scale(1.25)' }}
        />
      </Button>
      <Text mt={4} fontSize="sm" fontWeight="medium" opacity={0.8}>
        {name}
      </Text>
      <Text fontSize="xs" opacity="0.5">
        {title}
      </Text>
    </Wrapper>
  );
};

/**
 * Group of N Avatars/Bios.
 */
export const PhotoGroup = (props: PhotoGroupProps) => {
  const { group, ...rest } = props;
  const dividerColor = useColorValue('gray.400', 'original.tertiary');
  const contentNum = useState(0);
  const show = useState(false);
  const handler = (num: number): void => {
    const currentShow = show.get();
    !currentShow && show.set(true);
    currentShow && num === contentNum.value && show.set(false);
    contentNum.set(num);
  };
  const handlers = group.map((_, i) => (_: any) => handler(i));
  const renderedBio = useRender(group[contentNum.value].bio);
  return (
    <>
      <Flex
        my={12}
        maxWidth="80%"
        flex="1 1 33.3333%"
        width="100%"
        height="100%"
        justifyContent="space-between"
        {...rest}>
        {group.map((g, i) => (
          <Photo key={i} attrs={g} onClick={handlers[i]} />
        ))}
      </Flex>
      <Collapse isOpen={show.value} textAlign="center" px={8}>
        <Divider borderColor={dividerColor} />
        {renderedBio}
      </Collapse>
    </>
  );
};
