import { useMemo } from 'react';
import { Divider } from '@chakra-ui/core';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  P,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Ul,
  Ol,
  Li,
  Link,
  Code,
  Asset,
  Inline,
  BlockQuote,
  CustomBlock,
} from 'site/components';

import type { Document, Block } from '@contentful/rich-text-types';
import type { RenderNode, RenderMark } from '@contentful/rich-text-react-renderer';

const renderNode = {
  [BLOCKS.PARAGRAPH]: (_, children) => <P>{children}</P>,
  [BLOCKS.DOCUMENT]: (_, children) => children,
  [BLOCKS.HEADING_1]: (_, children) => <H1>{children}</H1>,
  [BLOCKS.HEADING_2]: (_, children) => <H2>{children}</H2>,
  [BLOCKS.HEADING_3]: (_, children) => <H3>{children}</H3>,
  [BLOCKS.HEADING_4]: (_, children) => <H4>{children}</H4>,
  [BLOCKS.HEADING_5]: (_, children) => <H5>{children}</H5>,
  [BLOCKS.HEADING_6]: (_, children) => <H6>{children}</H6>,
  [BLOCKS.EMBEDDED_ENTRY]: block => <CustomBlock {...block} />,
  [BLOCKS.EMBEDDED_ASSET]: node => <Asset {...node.data.target.fields} />,
  [BLOCKS.UL_LIST]: (_, children) => <Ul>{children}</Ul>,
  [BLOCKS.OL_LIST]: (_, children) => <Ol>{children}</Ol>,
  [BLOCKS.LIST_ITEM]: (_, children) => <Li>{children}</Li>,
  [BLOCKS.QUOTE]: (_, children) => <BlockQuote>{children}</BlockQuote>,
  [BLOCKS.HR]: () => <Divider />,
  [INLINES.ASSET_HYPERLINK]: node => <Inline type={INLINES.ASSET_HYPERLINK} node={node} />,
  [INLINES.ENTRY_HYPERLINK]: node => <Inline type={INLINES.ENTRY_HYPERLINK} node={node} />,
  [INLINES.EMBEDDED_ENTRY]: node => <Inline type={INLINES.EMBEDDED_ENTRY} node={node} />,
  [INLINES.HYPERLINK]: (node, children) => <Link href={node.data.uri}>{children}</Link>,
} as RenderNode;

const renderMark = {
  [MARKS.BOLD]: text => <strong>{text}</strong>,
  [MARKS.ITALIC]: text => <em>{text}</em>,
  [MARKS.UNDERLINE]: text => <u>{text}</u>,
  [MARKS.CODE]: text => <Code>{text}</Code>,
} as RenderMark;

export function useRender(renderable?: Document | null, deps: any[] = [], exclude: string[] = []) {
  if (!renderable) {
    return null;
  }
  if (deps.length === 0) {
    deps = [renderable];
  }
  if (exclude.length !== 0) {
    for (let ex of exclude) {
      const pattern = new RegExp(ex, 'gi');
      if ('content' in renderable && renderable.content.constructor.name === 'Array') {
        for (const [idx, content] of Object.entries(renderable.content)) {
          let contentType = null;
          const entryType = content.data?.target?.sys?.type as string | null;
          if (entryType === 'Entry') {
            contentType = content.data?.target?.sys?.contentType?.sys?.id as string | null;
          } else if (entryType === 'Asset') {
            contentType = content.data?.target?.fields?.file?.contentType as string | null;
          }
          if ((typeof contentType === 'string' && contentType.match(pattern)?.length) ?? 0 !== 0) {
            renderable?.content?.splice(Number(idx));
          }
        }
      }
    }
  }
  return useMemo(() => documentToReactComponents(renderable, { renderNode, renderMark }), deps);
}
