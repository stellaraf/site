import { forwardRef } from "react";

import { Box, Heading } from "@chakra-ui/react";
import { TitleCase } from "use-title-case";

import type { ContentTitleProps } from "./types";

export const ContentTitle = forwardRef<HTMLHeadingElement, ContentTitleProps>((props, ref) => {
  const { id, children, ...rest } = props;
  return (
    <>
      <Box id={id} as="span" pos="relative" top={-130} visibility="hidden" />
      <Heading
        as="h3"
        ref={ref}
        fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
        textAlign={{ base: "left", md: "center" }}
        {...rest}
      >
        <TitleCase>{children}</TitleCase>
      </Heading>
    </>
  );
});

ContentTitle.displayName = "ContentTitle";
