import type {
  TAdmonition,
  TTableEntry,
  TExpandable,
  TCustomBlocks,
  TArticleButton,
  TMarkdownBlock,
} from "~/types";
import type { ICustomBlock, ICustomBlockPre } from "./types";

export function parseTarget(props: ICustomBlockPre): ICustomBlock<TCustomBlocks> {
  const fallback = { sys: { contentType: { sys: { id: "fallback" } } } };
  const target = props.data.target ?? fallback;
  const { id: blockType } = target.sys.contentType.sys;
  return { ...props.data.target!.fields, blockType };
}

export function isAdmonition(target: ICustomBlock): target is ICustomBlock<TAdmonition> {
  return target.blockType === "admonition";
}

export function isArticleButton(target: ICustomBlock): target is ICustomBlock<TArticleButton> {
  return target.blockType === "articleButton";
}

export function isTable(target: ICustomBlock): target is ICustomBlock<TTableEntry> {
  return target.blockType === "table";
}

export function isExpandable(target: ICustomBlock): target is ICustomBlock<TExpandable> {
  return target.blockType === "expandable";
}

export function isMarkdownBlock(target: ICustomBlock): target is ICustomBlock<TMarkdownBlock> {
  return target.blockType === "markdownBlock";
}
