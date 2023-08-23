import { VStack, Wrap, WrapItem } from "@chakra-ui/react";

import { AnimatedDiv } from "~/components";
import { useResponsiveStyle } from "~/hooks";

import { BlogPreview } from "./blog-preview";

import type { StackProps } from "@chakra-ui/react";
import type { BlogPosts as BlogPostsQuery } from "~/queries";

interface BlogPostsProps extends StackProps {
  blogPosts: BlogPostsQuery;
}

export const BlogPosts = (props: BlogPostsProps) => {
  const { blogPosts, ...rest } = props;
  const rStyles = useResponsiveStyle();
  return (
    <>
      <VStack py={24} spacing={12} className="__blogposts" minH="30vh" {...rStyles} {...rest}>
        <Wrap
          direction={{ base: "column", lg: "row" }}
          spacing={8}
          justify="center"
          overflow="visible"
        >
          {blogPosts.map((post, i) => (
            <WrapItem key={post.title}>
              <AnimatedDiv
                zIndex={1}
                animate={{ x: 0 }}
                key={post.title}
                initial={{ x: "100%" }}
                whileTap={{ y: "-3%" }}
                whileHover={{ y: "-3%" }}
                transition={{ delay: i * 0.075 }}
              >
                <BlogPreview {...post} />
              </AnimatedDiv>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </>
  );
};
