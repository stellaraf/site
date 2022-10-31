import { chakra, Box, Flex } from "@chakra-ui/react";

import { Content, RichText } from "~/components";
import { useSlug, useDate } from "~/hooks";
import { shouldForwardProp } from "~/util";

import type { DocsPage } from "~/queries";

const Article = chakra("article", {
  shouldForwardProp,
  baseStyle: { overflow: "auto", zIndex: 1 },
});

export const DocsArticle = (props: React.PropsWithChildren<DocsPage>) => {
  const { slug, body, title, children, docsGroup, updatedAt, showUpdatedDate, ...rest } = props;

  const updated = useDate(updatedAt);

  const generatedSlug = useSlug(slug, [title]);

  return (
    <Article {...rest}>
      <Flex direction="column" align="flex-start">
        <Content.Title id={generatedSlug}>{title}</Content.Title>
        {showUpdatedDate && <Content.UpdatedAt time={updated} />}
      </Flex>
      <Box>
        <Content.Body maxW="unset">
          <RichText references={body.references}>{body.raw}</RichText>
        </Content.Body>
        {typeof children !== "undefined" && children}
      </Box>
    </Article>
  );
};
