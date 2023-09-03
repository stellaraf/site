import { Heading, VStack, Wrap, WrapItem } from "@chakra-ui/react";

import { AnimatedDiv } from "~/components";

import { BlogPreview } from "./blog-preview";

import type { StackProps } from "@chakra-ui/react";
import type { BlogPosts as BlogPostsQuery } from "~/queries";

interface BlogPostsProps extends StackProps {
  blogPosts: BlogPostsQuery;
}

export const BlogPosts = (props: BlogPostsProps) => {
  const { blogPosts, children, ...rest } = props;

  return (
    <VStack
      py={24}
      minH="30vh"
      spacing={12}
      layerStyle="container"
      className="__blogposts"
      {...rest}
    >
      {children}
      <Wrap
        spacing={8}
        justify="center"
        overflow="visible"
        direction={{ base: "column", lg: "row" }}
      >
        {blogPosts.length === 0 ? (
          <Heading as="h4">No Posts Found</Heading>
        ) : (
          blogPosts.map((post, i) => (
            <WrapItem key={post.title}>
              <AnimatedDiv
                zIndex={1}
                key={post.title}
                animate={{ x: 0 }}
                initial={{ x: "100%" }}
                whileTap={{ y: "-3%" }}
                whileHover={{ y: "-3%" }}
                transition={{ delay: i * 0.075 }}
              >
                <BlogPreview {...post} />
              </AnimatedDiv>
            </WrapItem>
          ))
        )}
      </Wrap>
    </VStack>
  );
};
