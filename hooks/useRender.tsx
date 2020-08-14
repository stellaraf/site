import * as React from 'react';
import { useMemo } from 'react';
import { Box, Divider } from '@chakra-ui/core';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from 'site/components/Link';
import { H1, H2, H3, H4, H5, H6, P, BlockQuote, Ul, Ol, Li, Code } from 'site/components/RichText';

import type { RenderNode, RenderMark } from '@contentful/rich-text-react-renderer';
import type { Document, Inline } from '@contentful/rich-text-types';

const inline = (type: string, node: Inline): React.ReactNode => {
  return (
    <span key={node.data.target.sys.id}>
      type: {node.nodeType} id: {node.data.target.sys.id}
    </span>
  );
};

const renderNode: RenderNode = {
  [BLOCKS.PARAGRAPH]: (_, children) => <P>{children}</P>,
  [BLOCKS.DOCUMENT]: (_, children) => children,
  [BLOCKS.HEADING_1]: (_, children) => <H1>{children}</H1>,
  [BLOCKS.HEADING_2]: (_, children) => <H2>{children}</H2>,
  [BLOCKS.HEADING_3]: (_, children) => <H3>{children}</H3>,
  [BLOCKS.HEADING_4]: (_, children) => <H4>{children}</H4>,
  [BLOCKS.HEADING_5]: (_, children) => <H5>{children}</H5>,
  [BLOCKS.HEADING_6]: (_, children) => <H6>{children}</H6>,
  [BLOCKS.EMBEDDED_ENTRY]: (_, children) => <Box>{children}</Box>,
  [BLOCKS.UL_LIST]: (_, children) => <Ul>{children}</Ul>,
  [BLOCKS.OL_LIST]: (_, children) => <Ol>{children}</Ol>,
  [BLOCKS.LIST_ITEM]: (_, children) => <Li>{children}</Li>,
  [BLOCKS.QUOTE]: (_, children) => <BlockQuote>{children}</BlockQuote>,
  [BLOCKS.HR]: () => <Divider />,
  [INLINES.ASSET_HYPERLINK]: (node: Inline) => inline(INLINES.ASSET_HYPERLINK, node),
  [INLINES.ENTRY_HYPERLINK]: (node: Inline) => inline(INLINES.ENTRY_HYPERLINK, node),
  [INLINES.EMBEDDED_ENTRY]: (node: Inline) => inline(INLINES.EMBEDDED_ENTRY, node),
  [INLINES.HYPERLINK]: (node, children) => <Link href={node.data.uri}>{children}</Link>,
};

const renderMark: RenderMark = {
  [MARKS.BOLD]: (text: string) => <strong>{text}</strong>,
  [MARKS.ITALIC]: (text: string) => <em>{text}</em>,
  [MARKS.UNDERLINE]: (text: string) => <u>{text}</u>,
  [MARKS.CODE]: (text: string) => <Code>{text}</Code>,
};

export const useRender = (renderable: Document) => {
  return useMemo(() => documentToReactComponents(renderable, { renderNode, renderMark }), [
    renderable,
  ]);
};
