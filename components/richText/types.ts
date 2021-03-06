import type {
  BoxProps,
  ListProps,
  ListItemProps,
  TextProps,
  CodeProps,
  HeadingProps as ChakraHeadingProps,
} from '@chakra-ui/react';
import { INLINES } from '@contentful/rich-text-types';

import type { Asset } from 'contentful';
import type { Link, Block as BlockNode, Inline as InlineNode } from '@contentful/rich-text-types';
import type { TTableEntry, TCustomBlocks, TAdmonition } from '~/types';

export interface IBlockQuote extends BoxProps {}

export interface ICode extends CodeProps {}

export type HeadingProps = ChakraHeadingProps;

export type UlProps = ListProps;
export type OlProps = ListProps;
export type LiProps = ListItemProps;

export interface IParagraph extends TextProps {}

export interface BaseHeadingProps extends ChakraHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export type THeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TCustomBlockTypes =
  | 'markdownBlock'
  | 'articleButton'
  | 'admonition'
  | 'expandable'
  | 'table'
  | string;

type TContentType<T = TCustomBlocks> = {
  contentType: { sys: { id: T; linkType: 'ContentType'; type: 'Link' } };
};

export type ICustomBlockPre = {
  data: {
    target?: {
      sys: Link<TCustomBlockTypes>['sys'] & TContentType<TCustomBlockTypes>;
      fields: TCustomBlocks;
    };
  };
};

export type ICustomBlock<T extends TCustomBlocks = TCustomBlocks> = T & {
  blockType: TCustomBlockTypes;
};

export interface ITd extends BoxProps {
  isHeader?: boolean;
}

export interface ITableCell extends ITd {
  children: string;
}

export interface ITableHeader extends BoxProps {}

export interface ITableMain extends BoxProps {}

export interface IInline extends BoxProps {
  type: INLINES;
  node: InlineNode | BlockNode;
}

export type TAsset = Asset['fields'];

type TAssetFields = Asset['fields']['file'];

export interface IAssetFields extends TAssetFields, BoxProps {
  title: TAsset['title'];
}

export interface IMarkdown {
  children: string;
}

export interface IAdmonitionIcon {
  type: TAdmonition['type'];
}

export type TTableData = Pick<TTableEntry['data'], 'tableData'>;
