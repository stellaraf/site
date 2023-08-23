import { HStack, Tag } from "@chakra-ui/react";

import type { BlogPostTags } from "~/queries";

interface TagsProps {
  tags: BlogPostTags;
}
export const Tags = (props: TagsProps) => {
  if (props.tags.length == 0) {
    return <></>;
  }
  return (
    <HStack my={2}>
      {props.tags.map(({ tag }) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </HStack>
  );
};
