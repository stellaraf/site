import { Admonition } from './Admonition';
import { ArticleButton } from './ArticleButton';
import { Table } from './Table';
import { Expandable } from './Expandable';
import { MarkdownBlock } from './Markdown';

import type {
  TArticleButton,
  TMarkdownBlock,
  TCustomBlocks,
  TAdmonition,
  TTableEntry,
  TExpandable,
} from 'site/types';
import type { ICustomBlock, ICustomBlockPre } from './types';

function parseTarget(props: ICustomBlockPre): ICustomBlock<TCustomBlocks> {
  const fallback = { sys: { contentType: { sys: { id: 'fallback' } } } };
  const target = props.data.target ?? fallback;
  const { id: blockType } = target.sys.contentType.sys;
  return { ...props.data.target!.fields, blockType };
}

function isAdmonition(target: ICustomBlock): target is ICustomBlock<TAdmonition> {
  return target.blockType === 'admonition';
}

function isArticleButton(target: ICustomBlock): target is ICustomBlock<TArticleButton> {
  return target.blockType === 'articleButton';
}

function isTable(target: ICustomBlock): target is ICustomBlock<TTableEntry> {
  return target.blockType === 'table';
}

function isExpandable(target: ICustomBlock): target is ICustomBlock<TExpandable> {
  return target.blockType === 'expandable';
}

function isMarkdownBlock(target: ICustomBlock): target is ICustomBlock<TMarkdownBlock> {
  return target.blockType === 'markdownBlock';
}

export const CustomBlock = (props: ICustomBlockPre) => {
  const target = parseTarget(props);

  if (isAdmonition(target)) {
    return <Admonition {...target} />;
  } else if (isArticleButton(target)) {
    return <ArticleButton {...target} />;
  } else if (isTable(target)) {
    return <Table {...target} />;
  } else if (isExpandable(target)) {
    return <Expandable {...target} />;
  } else if (isMarkdownBlock(target)) {
    return <MarkdownBlock {...target} />;
  } else {
    return <></>;
  }
};
