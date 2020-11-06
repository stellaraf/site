import { Box, Flex } from '@chakra-ui/core';
import { Content } from 'site/components';
import { useSlug, useDate, useRender } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { IDocsArticle } from 'site/types';

export const DocsArticle = (props: IDocsArticle) => {
  const { title, slug, body, showUpdatedDate, docsGroup, updatedAt, ...rest } = props;

  const updated = useDate(updatedAt);
  const rStyles = useResponsiveStyle();
  const renderedBody = useRender(body);
  const generatedSlug = useSlug(slug, [title]);

  return (
    <Box
      as="article"
      overflow="hidden"
      my={{ base: 4, lg: 16 }}
      px={{ base: 4, lg: 16, xl: 64 }}
      {...rStyles}
      {...rest}>
      <Flex h="100%" alignItems="center" justify="flex-start" flexWrap="nowrap">
        <Flex direction="column" textAlign="center" align="flex-start">
          <Content.Title id={generatedSlug}>{title}</Content.Title>
          {showUpdatedDate && <Content.UpdatedAt>{updated}</Content.UpdatedAt>}
        </Flex>
      </Flex>
      <Flex height="100%" align="center" direction="column">
        <Content.Body maxW="unset">{renderedBody}</Content.Body>
      </Flex>
    </Box>
  );
};
