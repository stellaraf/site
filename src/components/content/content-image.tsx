import { Box, Image as ChakraImage } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import type { ContentImageProps } from "./types";

export const ContentImage = (props: ContentImageProps) => {
  const { src, boxSize = "xl", ...rest } = props;
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-150px" });
  return (
    <Box
      ref={ref}
      zIndex={1}
      opacity={+inView}
      boxSize={boxSize}
      transition="opacity 0.2s ease-in-out"
      {...rest}
    >
      <ChakraImage src={src} boxSize={boxSize} draggable={false} />
    </Box>
  );
};
