import { Admonition } from "./admonition";
import { ArticleButton } from "./article-button";
import { Table } from "./table";
import { Expandable } from "./expandable";
import { MarkdownBlock } from "./markdown";
import {
  isTable,
  parseTarget,
  isAdmonition,
  isExpandable,
  isArticleButton,
  isMarkdownBlock,
} from "./guards";

import type { CustomBlockPreProps } from "./types";

export const CustomBlock = (props: CustomBlockPreProps) => {
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
