import { Box, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { forwardRef } from "~/util";

import type { ContentTitleProps } from "./types";

export const ContentTitle = forwardRef<HTMLHeadingElement, ContentTitleProps>((props, ref) => {
  const fnTitle = useTitleCase();
  const { id, children, ...rest } = props;
  return (
    <>
      <Box id={id} as="span" pos="relative" top={-130} visibility="hidden" />
      <Heading ref={ref} as="h3" fontSize={{ base: "3xl", lg: "4xl" }} {...rest}>
        {fnTitle(children)}
      </Heading>
    </>
  );
});
