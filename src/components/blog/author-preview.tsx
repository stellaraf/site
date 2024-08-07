import { Avatar, HStack, chakra } from "@chakra-ui/react";

import type { BlogPost } from "~/queries";

type AuthorProps = ArrayElement<BlogPost["authors"]>;

export const AuthorPreview = (props: AuthorProps) => {
  const { name, photo } = props;
  return (
    <HStack my={1}>
      <Avatar src={photo.url} size="xs" name={name} />
      <chakra.span fontSize="xs" fontWeight="normal">
        {name}
      </chakra.span>
    </HStack>
  );
};
