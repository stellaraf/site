import { INLINES } from "@contentful/rich-text-types";

import type { BoxProps, HeadingProps as ChakraHeadingProps } from "@chakra-ui/react";
import type { Asset } from "contentful";
import type { Link, Block as BlockNode, Inline as InlineNode } from "@contentful/rich-text-types";
import type { TTableEntry, TCustomBlocks, TAdmonition } from "~/types";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface BaseHeadingProps extends ChakraHeadingProps {
  level: HeadingLevel;
}

export type Headings = `h${HeadingLevel}`;

export type TCustomBlockTypes =
  | "markdownBlock"
  | "articleButton"
  | "admonition"
  | "expandable"
  | "table"
  | string;

type TContentType<T = TCustomBlocks> = {
  contentType: { sys: { id: T; linkType: "ContentType"; type: "Link" } };
};

export interface CustomBlockPreProps {
  data: {
    target?: {
      sys: Link<TCustomBlockTypes>["sys"] & TContentType<TCustomBlockTypes>;
      fields: TCustomBlocks;
    };
  };
}

export type CustomBlockProps<T extends TCustomBlocks = TCustomBlocks> = T & {
  blockType: TCustomBlockTypes;
};

export interface TdProps extends BoxProps {
  isHeader?: boolean;
}

export interface TableCellProps extends TdProps {
  children: string;
}

export interface InlineProps extends BoxProps {
  type: INLINES;
  node: InlineNode | BlockNode;
}

export type AssetProps = Asset["fields"];

type AssetFile = Asset["fields"]["file"];

export interface AssetFieldProps extends AssetFile, BoxProps {
  title: AssetProps["title"];
}

export interface MarkdownProps {
  children: string;
}

export interface AdmonitionIconProps {
  type: TAdmonition["type"];
}

export type TableData = Pick<TTableEntry["data"], "tableData">;
