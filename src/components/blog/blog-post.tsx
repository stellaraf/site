import { chakra, Box, Flex, HStack } from "@chakra-ui/react";

import { CodeBlock, Content, RichText } from "~/components";
import { useSlug } from "~/hooks";
import { shouldForwardProp } from "~/theme";

import { Author } from "./author";
import { PublishedAt } from "./published-at";
import { Tags } from "./tags";

import type { BlogPost } from "~/queries";

const Article = chakra("article", {
  shouldForwardProp,
  baseStyle: { overflow: "auto", zIndex: 1, my: { base: 8, lg: 0 } },
});

export const BlogPostContent = (props: React.PropsWithChildren<BlogPost>) => {
  const {
    slug,
    body,
    title,
    description,
    children,
    overrideDate,
    publishedAt,
    authors,
    blogPostTags,
    ...rest
  } = props;

  const generatedSlug = useSlug(slug, [title]);

  return (
    <Article {...rest}>
      <Flex direction="column" align="flex-start">
        <PublishedAt time={overrideDate ?? publishedAt!} />
        <Content.Title id={generatedSlug}>{title}</Content.Title>
        <Content.Subtitle my={2}>{description}</Content.Subtitle>
        <HStack spacing={8}>
          <HStack>
            {authors.map(author => (
              <Author key={author.name} {...author} />
            ))}
          </HStack>
          <Tags tags={blogPostTags} />
        </HStack>
      </Flex>
      <Box>
        <Content.Body maxW="unset">
          <RichText
            content={body}
            overrides={{
              code_block: ({ children }) => <CodeBlock hideCopyButton>{children}</CodeBlock>,
            }}
          />
        </Content.Body>
        {typeof children !== "undefined" && children}
      </Box>
    </Article>
  );
};
