import { Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import type { ContentSubtitleProps } from "./types";

export const ContentSubtitle = (props: ContentSubtitleProps) => {
  const fnTitle = useTitleCase();
  const { children, ...rest } = props;
  return (
    <Heading
      as="h4"
      fontWeight="light"
      mt={{ base: 4, lg: 8 }}
      fontSize={{ base: "lg", lg: "xl" }}
      textAlign={{ base: "left", md: "center" }}
      {...rest}
    >
      {fnTitle(children)}
    </Heading>
  );
};
