import { Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import type { ContentSubtitleProps } from "./types";

export const ContentSubtitle = (props: ContentSubtitleProps) => {
  const fnTitle = useTitleCase();
  const { children, ...rest } = props;
  return (
    <Heading as="h4" fontSize={{ base: "1.5rem", lg: "xl" }} fontWeight="light" mt={8} {...rest}>
      {fnTitle(children)}
    </Heading>
  );
};
