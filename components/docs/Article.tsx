import { Box, Flex } from '@chakra-ui/core';
import { Content } from 'site/components';
import { useSlug, useDate, useRender } from 'site/hooks';
import { validProps } from 'site/util';

import type { IDocsArticle } from 'site/types';

export const DocsArticle = (props: IDocsArticle) => {
  const { title, slug, body, showUpdatedDate, docsGroup, updatedAt, children, ...rest } = props;

  const updated = useDate(updatedAt);
  const renderedBody = useRender(body);
  const generatedSlug = useSlug(slug, [title]);

  return (
    <Box as="article" overflow="auto" zIndex={1} {...validProps(rest)}>
      <Flex direction="column" align="flex-start">
        <Content.Title id={generatedSlug}>{title}</Content.Title>
        {showUpdatedDate && <Content.UpdatedAt>{updated}</Content.UpdatedAt>}
      </Flex>
      <Content.Body maxW="unset">{renderedBody}</Content.Body>
      {typeof children !== 'undefined' && children}
    </Box>
  );
};
