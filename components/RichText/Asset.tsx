import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { Image as ChakraImage, Skeleton, useDisclosure } from '@chakra-ui/react';
import { Backdrop, ModalWrapper } from 'site/components';
import { useColorValue } from 'site/context';

const ReactPlayer = dynamic(() => import('react-player'), {
  loading: () => <Skeleton boxSize="100%" startColor="gray.500" endColor="tertiary.500" />,
});

import type { TAsset, IAssetFields } from './types';

const ImageAsset = (props: IAssetFields) => {
  const { color, title, url, details, fileName, contentType, ...rest } = props;
  const { width = 0, height = 0 } = details.image ?? {};
  const { isOpen, onClose, onOpen } = useDisclosure();
  const css = useColorValue({}, { filter: 'invert(1)' });
  /**
   * Override the background/border colors if SVG. Since SVG's won't have a background, it looks
   * better to make the background match the color mode.
   */
  let bg = useColorValue('dark.500', 'light.500');
  let svgBg = useColorValue('white', 'black');

  // next/image doesn't support SVGs, as of 10.0.1 testing. Use native element for SVGs.
  let image = null;

  if (contentType.match(/image\/svg.*/gi)) {
    image = <ChakraImage src={url} alt={title} boxSize="100%" css={css} />;
    bg = svgBg;
  } else {
    image = (
      <NextImage
        src={'https:' + url}
        alt={title}
        width={width}
        height={height}
        layout="responsive"
      />
    );
  }

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
      <Backdrop onClick={onOpen} bg={bg} borderColor={bg} {...rest}>
        {image}
      </Backdrop>
    </>
  );
};

const VideoAsset = (props: IAssetFields) => {
  const { color, title, url, details, fileName, contentType, ...rest } = props;
  return (
    <Backdrop {...rest}>
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
    </Backdrop>
  );
};

export const Asset = (props: TAsset) => {
  const { title, file } = props;
  const { contentType } = file;
  const borderColor = useColorValue('dark.500', 'light.500');

  let asset = null;
  if (contentType.match(/image/gi)?.length ?? 0 !== 0) {
    asset = <ImageAsset color={borderColor} title={title} {...file} />;
  } else if (contentType.match(/video/gi)?.length ?? 0 !== 0) {
    asset = <VideoAsset color={borderColor} title={title} {...file} />;
  }
  return asset;
};
