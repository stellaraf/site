import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { Box, Skeleton, useDisclosure } from '@chakra-ui/core';
import { ModalWrapper } from 'site/components';
import { useColorValue } from 'site/context';

const ReactPlayer = dynamic(() => import('react-player'), {
  loading: () => (
    <Skeleton boxSize="100%" startColor="original.gray" endColor="original.tertiary" />
  ),
});

import type { TAsset, IAssetFields } from './types';

const ImageAsset = (props: IAssetFields) => {
  const { color, title, url, details, fileName, contentType, ...rest } = props;
  const { width = 0, height = 0 } = details.image ?? {};
  const { isOpen, onClose, onOpen } = useDisclosure();
  const image = (
    <NextImage src={'https:' + url} alt={title} width={width} height={height} layout="responsive" />
  );
  return (
    <>
      <ModalWrapper
        isCentered
        size="full"
        body={image}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        containerProps={{
          pl: 8,
          py: 8,
          pr: 12,
          maxWidth: '2xl',
          height: 'unset',
          minWidth: { lg: '50%' },
        }}
        bodyProps={{
          pt: 2,
          py: 'unset',
          px: 'unset',
          textAlign: { base: 'left', lg: 'right' },
        }}
      />
      <Box
        zIndex={1}
        pos="relative"
        boxShadow="xl"
        bg={color}
        cursor="pointer"
        overflow="hidden"
        borderStyle="solid"
        borderColor={color}
        mx="auto"
        width={{ base: '100%', lg: '50%' }}
        borderRadius={{ base: '1rem', lg: '2rem' }}
        borderWidth={{ base: '0.2rem', lg: '0.8rem' }}
        onClick={onOpen}
        {...rest}>
        {image}
      </Box>
    </>
  );
};

const VideoAsset = (props: IAssetFields) => {
  const { color, title, url, details, fileName, contentType, ...rest } = props;
  return (
    <Box
      zIndex={1}
      pos="relative"
      boxShadow="xl"
      bg={color}
      cursor="pointer"
      overflow="hidden"
      borderStyle="solid"
      borderColor={color}
      mx="auto"
      width={{ base: '100%', lg: '50%' }}
      borderRadius={{ base: '1rem', lg: '2rem' }}
      borderWidth={{ base: '0.2rem', lg: '0.8rem' }}
      {...rest}>
      <ReactPlayer
        controls
        url={url}
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

export const Asset = (props: TAsset) => {
  const { title, file } = props;
  const { contentType } = file;
  const borderColor = useColorValue('original.dark', 'original.light');

  let asset = null;
  if (contentType.match(/image/gi)?.length ?? 0 !== 0) {
    asset = <ImageAsset color={borderColor} title={title} {...file} />;
  } else if (contentType.match(/video/gi)?.length ?? 0 !== 0) {
    asset = <VideoAsset color={borderColor} title={title} {...file} />;
  }
  return asset;
};
