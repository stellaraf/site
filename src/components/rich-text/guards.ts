import type {
  TAdmonition,
  TTableEntry,
  TExpandable,
  TCustomBlocks,
  TArticleButton,
  TMarkdownBlock,
} from "~/types";
import type { CustomBlockProps, CustomBlockPreProps } from "./types";

export function parseTarget(props: CustomBlockPreProps): CustomBlockProps<TCustomBlocks> {
  const fallback = { sys: { contentType: { sys: { id: "fallback" } } } };
  const target = props.data.target ?? fallback;
  const { id: blockType } = target.sys.contentType.sys;
  return { ...props.data.target!.fields, blockType };
}

export function isAdmonition(target: CustomBlockProps): target is CustomBlockProps<TAdmonition> {
  return target.blockType === "admonition";
}

export function isArticleButton(
  target: CustomBlockProps,
): target is CustomBlockProps<TArticleButton> {
  return target.blockType === "articleButton";
}

export function isTable(target: CustomBlockProps): target is CustomBlockProps<TTableEntry> {
  return target.blockType === "table";
}

export function isExpandable(target: CustomBlockProps): target is CustomBlockProps<TExpandable> {
  return target.blockType === "expandable";
}

export function isMarkdownBlock(
  target: CustomBlockProps,
): target is CustomBlockProps<TMarkdownBlock> {
  return target.blockType === "markdownBlock";
}
