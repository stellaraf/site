import NextLink from "next/link";

import { Flex, HStack, Button, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Card, CardBody } from "~/components";

import { AuthorPreview } from "./author-preview";
import { PublishedAt } from "./published-at";

import type { BlogPost } from "~/queries";

export const BlogPreview = (props: BlogPost) => {
  const { title, slug, description, publishedAt, overrideDate, authors } = props;

  const titleMe = useTitleCase();

  return (
    <NextLink href={`/blog/${slug}`} scroll={false}>
      <Button
        p={0}
        rounded="lg"
        display="flex"
        height="unset"
        flex="1 0 100%"
        borderWidth={0}
        variant="ghost"
        overflow="hidden"
        textAlign="unset"
        lineHeight="unset"
        borderColor="unset"
        verticalAlign="unset"
        flexDirection="column"
      >
        <Card width={{ base: "20rem", md: "18rem", xl: "sm" }} maxHeight={48} zIndex={1}>
          <CardBody spacing={4} textAlign="left" alignItems="flex-start">
            <Flex align="flex-start" justify="space-between" width="100%">
              <Flex flexDir="column" maxW="80%">
                <Heading fontSize={{ base: "md", md: "md" }} whiteSpace="pre-wrap">
                  {titleMe(title)}
                </Heading>
              </Flex>
            </Flex>
            <Heading as="h4" fontSize="sm" fontWeight="light" whiteSpace="pre-wrap">
              {description}
            </Heading>
            <Flex boxSize="100%" alignItems="flex-end" justifyContent="space-between">
              <HStack justifyContent="flex-start" alignItems="flex-end">
                {authors.map(author => (
                  <AuthorPreview key={author.name} {...author} />
                ))}
              </HStack>
              <Flex justifyContent="flex-end">
                <PublishedAt
                  time={overrideDate ?? publishedAt!}
                  fontSize="xs"
                  fontWeight="normal"
                />
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Button>
    </NextLink>
  );
};
