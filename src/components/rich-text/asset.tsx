import NextImage from "next/image";

import { Image as ChakraImage, useDisclosure } from "@chakra-ui/react";

import { Backdrop, Modal, Video } from "~/components";

import type { ImageProps, VideoProps } from "@graphcms/rich-text-types";

const SVG_PATTERN = /^image\/svg.*/i;

export const ImageAsset = (props: Partial<ImageProps>) => {
  const { title, src = "", height = 0, width = 0, mimeType = "", altText, ...rest } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  // next/image doesn't support SVGs, as of 10.0.1 testing. Use native element for SVGs.
  let image = null;

  const isSVG = SVG_PATTERN.test(mimeType);

  if (isSVG) {
    image = (
      <ChakraImage
        src={src}
        boxSize="100%"
        _dark={{ filter: "invert(1)" }}
        alt={altText ?? title ?? "Unknown"}
      />
    );
  } else {
    image = (
      <NextImage src={src} width={width} height={height} alt={altText ?? title ?? "Unknown"} />
    );
  }

  return (
    <>
      <Modal
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
          maxWidth: "2xl",
          height: "unset",
          minWidth: { lg: "50%" },
        }}
        bodyProps={{
          pt: 2,
          py: "unset",
          px: "unset",
          textAlign: { base: "left", lg: "right" },
        }}
      />
      <Backdrop
        onClick={onOpen}
        borderColor={"blackAlpha.200"}
        _dark={{ borderColor: "whiteAlpha.300" }}
        title={altText}
        {...rest}
      >
        {image}
      </Backdrop>
    </>
  );
};

export const VideoAsset = (props: Partial<VideoProps>) => {
  const { title, src, ...rest } = props;

  return (
    <Backdrop {...rest}>
      <Video url={src ?? ""} enableControls />
    </Backdrop>
  );
};
