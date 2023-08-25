import { chakra, Box, Flex, HStack, Stack } from "@chakra-ui/react";

import { CodeBlock, Content, RichText } from "~/components";
import { useSlug } from "~/hooks";
import { shouldForwardProp } from "~/theme";

import { Author } from "./author";
import { PublishedAt } from "./published-at";
import { Share } from "./share";
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
        <Stack spacing={8} direction={{ base: "column", lg: "row" }}>
          <HStack>
            {authors.map(author => (
              <Author key={author.name} {...author} />
            ))}
          </HStack>
          <Tags fontSize="lg" tags={blogPostTags} />
          <Share url={`https://stellar.tech/blog/${slug}`} title={title} />
        </Stack>
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
      <Flex width="100%" flexDir="column" justifyContent="center" alignItems="center">
        <Share spacing={6} url={`https://stellar.tech/blog/${slug}`} title={title} />
      </Flex>
    </Article>
  );
};
