import { Heading, VStack, Wrap, WrapItem } from "@chakra-ui/react";

import { BlogPreview } from "./blog-preview";

import type { StackProps } from "@chakra-ui/react";
import type { BlogPosts as BlogPostsType } from "~/queries";

interface BlogPostsProps extends StackProps {
  blogPosts: BlogPostsType;
}

export const BlogPosts = (props: BlogPostsProps) => {
  const { blogPosts, children, ...rest } = props;

  return (
    <VStack
      py={24}
      minH="30vh"
      spacing={12}
      layerStyle="container"
      className="__st-blog-posts"
      {...rest}
    >
      {children}
      <Wrap
        spacing={8}
        justify="center"
        overflow="visible"
        direction={{ base: "column", md: "row" }}
      >
        {blogPosts.length === 0 ? (
          <Heading as="h4">No Posts Found</Heading>
        ) : (
          blogPosts.map(post => (
            <WrapItem key={post.title}>
              <BlogPreview {...post} />
            </WrapItem>
          ))
        )}
      </Wrap>
    </VStack>
  );
};
