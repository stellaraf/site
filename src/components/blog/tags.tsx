import NextLink from "next/link";

import { Tag, type TagProps, Wrap, WrapItem } from "@chakra-ui/react";

import type { ContentTags } from "~/queries";

interface TagsProps extends TagProps {
  tags: ContentTags;
}
export const Tags = (props: TagsProps) => {
  const { tags, ...rest } = props;
  if (tags.length == 0) {
    return <></>;
  }
  return (
    <Wrap my={2} spacing={4} display="flex" alignItems="center">
      {tags.map(({ tag }) => (
        <WrapItem key={tag}>
          <NextLink href={`/blog/tag/${tag.toLowerCase()}`}>
            <Tag {...rest}>{tag}</Tag>
          </NextLink>
        </WrapItem>
      ))}
    </Wrap>
  );
};
