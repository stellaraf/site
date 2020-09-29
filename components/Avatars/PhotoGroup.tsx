import * as React from 'react';
import { useState } from '@hookstate/core';
import {
  Box,
  Divider,
  Flex,
  Image,
  Collapse,
  Button,
  SimpleGrid,
  Skeleton,
  Text,
} from '@chakra-ui/core';
import { useRender, useMobile } from 'site/hooks';
import { useColorValue } from 'site/context';

import type {
  PhotoProps,
  PhotoGroupProps,
  IPhotoWrapper,
  IGroupWrapper,
  IPhotoGroup,
} from './types';

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
 * Single Avatar & Bio
 */
const Photo = (props: PhotoProps) => {
  const { attrs, onClick, ...rest } = props;
  const photoBorder = useColorValue('whiteAlpha.400', 'blackAlpha.400');
  const { name, title, photo } = attrs;
  const ready = useState(false);
  const handleLoad = () => {
    ready.set(true);
  };
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
            _hover={{ transform: 'scale(1.25)' }}
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

const GroupWrapper = (props: IGroupWrapper) => {
  return (
    <SimpleGrid
      my={12}
      justifyContent="space-evenly"
      columns={{ base: 1, lg: 3 }}
      spacingX="80%"
      spacingY={16}
      {...props}
    />
  );
};

const PhotoGroupDesktop = (props: IPhotoGroup) => {
  const { handlers, isOpen, group, dividerColor, children, ...rest } = props;
  return (
    <>
      <GroupWrapper {...rest}>
        {group.map((g, i) => (
          <Photo key={i} attrs={g} onClick={handlers[i]} />
        ))}
      </GroupWrapper>
      <Collapse isOpen={isOpen} textAlign="center" px={8}>
        <Divider borderColor={dividerColor} />
        {children}
      </Collapse>
    </>
  );
};

const PhotoGroupMobile = (props: IPhotoGroup) => {
  const { handlers, isOpen, current, group, dividerColor, children, ...rest } = props;
  return (
    <>
      <GroupWrapper {...rest}>
        {group.map((g, i) => (
          <>
            <Photo key={i} attrs={g} onClick={handlers[i]} />
            <Collapse isOpen={isOpen && i === current} textAlign="center" px={8}>
              <Divider borderColor={dividerColor} />
              {children}
            </Collapse>
          </>
        ))}
      </GroupWrapper>
    </>
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
  const isMobile = useMobile();
  return (
    <>
      {isMobile ? (
        <PhotoGroupMobile
          handlers={handlers}
          isOpen={show.value}
          current={contentNum.value}
          dividerColor={dividerColor}
          group={group}>
          {renderedBio}
        </PhotoGroupMobile>
      ) : (
        <PhotoGroupDesktop
          handlers={handlers}
          isOpen={show.value}
          current={contentNum.value}
          dividerColor={dividerColor}
          group={group}>
          {renderedBio}
        </PhotoGroupDesktop>
      )}
    </>
  );
};
