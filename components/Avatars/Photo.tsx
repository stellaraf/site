import { Flex, Image, Button, Text, useBreakpointValue } from '@chakra-ui/core';
import { useColorValue } from 'site/context';
import { useAvatar } from './Avatars';
import { useCurrent } from './state';

import type { IPhoto, IPhotoWrapper } from './types';

export const PhotoWrapper = (props: IPhotoWrapper) => (
  <Flex
    minWidth={40}
    maxWidth="100%"
    flexDir="column"
    textAlign="center"
    alignItems="center"
    position="relative"
    justifyContent="center"
    {...props}
  />
);

/**
 * Single Avatar Photo
 */
export const Photo = (props: IPhoto) => {
  const { index, onOpen, ...rest } = props;
  const photoBorder = useColorValue('whiteAlpha.400', 'blackAlpha.400');
  const { bios } = useAvatar();
  const current = useCurrent();
  const hover = useBreakpointValue({ base: {}, lg: { transform: 'scale(1.25)' } });
  const handleClick = () => {
    current.set(index);
    onOpen();
  };
  return (
    <PhotoWrapper {...rest}>
      <Button
        boxSize={32}
        rounded="full"
        overflow="hidden"
        variant="unstyled"
        onClick={handleClick}>
        <Image
          width="100%"
          rounded="full"
          minHeight={32}
          _hover={hover}
          objectFit="cover"
          borderWidth="1px"
          borderStyle="solid"
          alt={bios[index].name}
          borderColor={photoBorder}
          src={bios[index].photo.file.url}
          transition="transform .15s ease 0s"
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Button>
      <Text mt={4} fontSize="sm" fontWeight="medium" opacity={0.8}>
        {bios[index].name}
      </Text>
      <Text fontSize="xs" opacity="0.5">
        {bios[index].title}
      </Text>
    </PhotoWrapper>
  );
};
