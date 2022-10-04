import { Admonition } from "./Admonition";
import { ArticleButton } from "./ArticleButton";
import { Table } from "./Table";
import { Expandable } from "./Expandable";
import { MarkdownBlock } from "./Markdown";

import {
  isTable,
  parseTarget,
  isAdmonition,
  isExpandable,
  isArticleButton,
  isMarkdownBlock,
} from "./guards";

import type { ICustomBlockPre } from "./types";

export const CustomBlock: React.FC<ICustomBlockPre> = (props: ICustomBlockPre) => {
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
