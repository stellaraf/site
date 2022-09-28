import { useMemo } from 'react';
import { Divider } from '@chakra-ui/react';
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
  Li,
  Ol,
  Td,
  Th,
  Ul,
  Code,
  Link,
  Asset,
  Table,
  Inline,
  BlockQuote,
  CustomBlock,
} from '~/components';

import type { Document } from '@contentful/rich-text-types';
import type { RenderNode, RenderMark } from '@contentful/rich-text-react-renderer';

type Keys = BLOCKS | INLINES;

type OverrideProps = {
  [k in Keys]?: Dict;
};

/* eslint react/display-name: 0 */
const renderMark = {
  [MARKS.BOLD]: text => <strong>{text}</strong>,
  [MARKS.ITALIC]: text => <em>{text}</em>,
  [MARKS.UNDERLINE]: text => <u>{text}</u>,
  [MARKS.CODE]: text => <Code>{text}</Code>,
} as RenderMark;

const overrides = {
  [BLOCKS.PARAGRAPH]: {},
  [BLOCKS.DOCUMENT]: {},
  [BLOCKS.HEADING_1]: {},
  [BLOCKS.HEADING_2]: {},
  [BLOCKS.HEADING_3]: {},
  [BLOCKS.HEADING_4]: {},
  [BLOCKS.HEADING_5]: {},
  [BLOCKS.HEADING_6]: {},
  [BLOCKS.EMBEDDED_ENTRY]: {},
  [BLOCKS.EMBEDDED_ASSET]: {},
  [BLOCKS.UL_LIST]: {},
  [BLOCKS.OL_LIST]: {},
  [BLOCKS.LIST_ITEM]: {},
  [BLOCKS.QUOTE]: {},
  [BLOCKS.HR]: {},
  [BLOCKS.TABLE]: {},
  [BLOCKS.TABLE_CELL]: {},
  [BLOCKS.TABLE_HEADER_CELL]: {},
  [BLOCKS.TABLE_ROW]: {},
  [INLINES.ASSET_HYPERLINK]: {},
  [INLINES.ENTRY_HYPERLINK]: {},
  [INLINES.EMBEDDED_ENTRY]: {},
  [INLINES.HYPERLINK]: {},
} as OverrideProps;

export function useRender(
  renderable?: Document | null,
  deps: unknown[] = [],
  exclude: string[] = [],
  props?: OverrideProps,
): React.ReactNode | null {
  if (deps.length === 0) {
    deps = [renderable];
  }

  if (!renderable) {
    return useMemo(() => null, deps);
  }

  if (exclude.length !== 0) {
    for (const ex of exclude) {
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
  const o = {
    ...overrides,
    ...props,
  };
  const renderNode = {
    [BLOCKS.PARAGRAPH]: (_, children) => <P {...o[BLOCKS.PARAGRAPH]}>{children}</P>,
    [BLOCKS.DOCUMENT]: (_, children) => children,
    [BLOCKS.HEADING_1]: (_, children) => <H1 {...o[BLOCKS.HEADING_1]}>{children}</H1>,
    [BLOCKS.HEADING_2]: (_, children) => <H2 {...o[BLOCKS.HEADING_2]}>{children}</H2>,
    [BLOCKS.HEADING_3]: (_, children) => <H3 {...o[BLOCKS.HEADING_3]}>{children}</H3>,
    [BLOCKS.HEADING_4]: (_, children) => <H4 {...o[BLOCKS.HEADING_4]}>{children}</H4>,
    [BLOCKS.HEADING_5]: (_, children) => <H5 {...o[BLOCKS.HEADING_5]}>{children}</H5>,
    [BLOCKS.HEADING_6]: (_, children) => <H6 {...o[BLOCKS.HEADING_6]}>{children}</H6>,
    [BLOCKS.EMBEDDED_ENTRY]: block => <CustomBlock {...block} {...o[BLOCKS.EMBEDDED_ENTRY]} />,
    [BLOCKS.EMBEDDED_ASSET]: node => (
      <Asset {...node.data.target.fields} {...o[BLOCKS.EMBEDDED_ASSET]} />
    ),
    [BLOCKS.UL_LIST]: (_, children) => <Ul {...o[BLOCKS.UL_LIST]}>{children}</Ul>,
    [BLOCKS.OL_LIST]: (_, children) => <Ol {...o[BLOCKS.OL_LIST]}>{children}</Ol>,
    [BLOCKS.LIST_ITEM]: (_, children) => <Li {...o[BLOCKS.LIST_ITEM]}>{children}</Li>,
    [BLOCKS.QUOTE]: (_, children) => <BlockQuote {...o[BLOCKS.QUOTE]}>{children}</BlockQuote>,
    [BLOCKS.HR]: () => <Divider {...o[BLOCKS.HR]} />,
    [INLINES.ASSET_HYPERLINK]: node => <Inline type={INLINES.ASSET_HYPERLINK} node={node} />,
    [INLINES.ENTRY_HYPERLINK]: node => <Inline type={INLINES.ENTRY_HYPERLINK} node={node} />,
    [INLINES.EMBEDDED_ENTRY]: node => <Inline type={INLINES.EMBEDDED_ENTRY} node={node} />,
    [INLINES.HYPERLINK]: (node, children) => (
      <Link href={node.data.uri} {...o[INLINES.HYPERLINK]}>
        {children}
      </Link>
    ),
    [BLOCKS.TABLE]: (_, children) => <Table {...o[BLOCKS.TABLE]}>{children}</Table>,
    [BLOCKS.TABLE_CELL]: (_, children) => <Td {...o[BLOCKS.TABLE_CELL]}>{children}</Td>,
    [BLOCKS.TABLE_HEADER_CELL]: (_, children) => (
      <Th {...o[BLOCKS.TABLE_HEADER_CELL]}>{children}</Th>
    ),
  } as RenderNode;

  return useMemo(() => documentToReactComponents(renderable, { renderNode, renderMark }), deps);
}
