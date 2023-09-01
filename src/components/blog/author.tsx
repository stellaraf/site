import NextLink from "next/link";

import { Avatar, chakra, VStack, HStack } from "@chakra-ui/react";
import queryString from "query-string";

import type { BlogPost } from "~/queries";

type AuthorProps = ArrayElement<BlogPost["authors"]>;

export const Author = (props: AuthorProps) => {
  const { name, title, photo } = props;
  return (
    <NextLink href={queryString.stringifyUrl({ url: "/about", query: { e: name } })}>
      <HStack my={2}>
        <Avatar src={photo.url} size="sm" name={name} />
        <VStack alignItems="flex-start" spacing="0">
          <chakra.span fontSize="sm" fontWeight="bold">
            {name}
          </chakra.span>
          <chakra.span fontSize="xs" opacity={0.5}>
            {title}
          </chakra.span>
        </VStack>
      </HStack>
    </NextLink>
  );
};
