import NextImage from "next/image";

import { Image as ChakraImage, useDisclosure } from "@chakra-ui/react";

import { Backdrop, Modal, Video } from "~/components";
import { useColorValue } from "~/context";

import type { ImageProps, VideoProps } from "@graphcms/rich-text-types";

const SVG_PATTERN = /^image\/svg.*/i;

export const ImageAsset = (props: Partial<ImageProps>) => {
  const { title, src = "", height = 0, width = 0, mimeType = "", ...rest } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const css = useColorValue({}, { filter: "invert(1)" });

  // Override the background/border colors if SVG. Since SVG's won't have a background, it looks
  // better to make the background match the color mode.
  let bg = useColorValue("dark.500", "light.500");
  const svgBg = useColorValue("white", "black");

  // next/image doesn't support SVGs, as of 10.0.1 testing. Use native element for SVGs.
  let image = null;

  if (SVG_PATTERN.test(mimeType)) {
    image = <ChakraImage src={src} alt={title} boxSize="100%" css={css} />;
    bg = svgBg;
  } else {
    image = <NextImage src={src} width={width} height={height} alt={title ?? "Unknown"} />;
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
      <Backdrop onClick={onOpen} bg={bg} borderColor={bg} {...rest}>
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
