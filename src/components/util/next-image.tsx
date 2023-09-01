import NextImage, { type ImageProps } from "next/image";

import { chakra, type ChakraComponent } from "@chakra-ui/react";

const NEXT_IMAGE_PROPS: string[] = [
  "alt",
  "blurDataURL",
  "fill",
  "height",
  "layout",
  "lazyBoundary",
  "lazyRoot",
  "loader",
  "loading",
  "objectPosition",
  "onLoadingComplete",
  "placeholder",
  "priority",
  "quality",
  "src",
  "style",
  "unoptimized",
  "width",
];

const shouldForwardProp = (prop: string): boolean => NEXT_IMAGE_PROPS.includes(prop);

export const ChakraNextImage: ChakraComponent<"img", Omit<ImageProps, "objectFit">> = chakra(
  NextImage,
  {
    shouldForwardProp,
  },
);
