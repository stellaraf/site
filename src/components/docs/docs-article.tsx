import { chakra, Box, Flex } from "@chakra-ui/react";

import { Content } from "~/components";
import { useSlug, useDate, useRender } from "~/hooks";
import { shouldForwardProp } from "~/util";

import type { IDocsArticle } from "~/types";

const Article = chakra("article", {
  shouldForwardProp,
  baseStyle: { overflow: "auto", zIndex: 1 },
});

export const DocsArticle = (props: IDocsArticle) => {
  const { slug, body, title, children, docsGroup, updatedAt, showUpdatedDate, ...rest } = props;

  const updated = useDate(updatedAt);
  const renderedBody = useRender(body);
  const generatedSlug = useSlug(slug, [title]);

  return (
    <Article {...rest}>
      <Flex direction="column" align="flex-start">
        <Content.Title id={generatedSlug}>{title}</Content.Title>
        {showUpdatedDate && <Content.UpdatedAt>{updated}</Content.UpdatedAt>}
      </Flex>
      <Box>
        <Content.Body maxW="unset">{renderedBody}</Content.Body>
        {typeof children !== "undefined" && children}
      </Box>
    </Article>
  );
};
