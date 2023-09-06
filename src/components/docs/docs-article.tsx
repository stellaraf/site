import { chakra, Box, Flex } from "@chakra-ui/react";

import { Content, RichText } from "~/components";
import { useSlug, useDate } from "~/hooks";
import { shouldForwardProp } from "~/theme";

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
      <Flex direction="column" align="flex-start" textAlign="left">
        <Content.Title textAlign="left" id={generatedSlug}>
          {title}
        </Content.Title>
        {showUpdatedDate && <Content.UpdatedAt time={updated} />}
      </Flex>
      <Box>
        <Content.Body textAlign="left" maxW="unset">
          <RichText content={body} />
        </Content.Body>
        {typeof children !== "undefined" && children}
      </Box>
    </Article>
  );
};
