import { Admonition } from "./admonition";
import { ArticleButton } from "./article-button";
import { Expandable } from "./expandable";
import {
  isTable,
  parseTarget,
  isAdmonition,
  isExpandable,
  isArticleButton,
  isMarkdownBlock,
} from "./guards";

import type { CustomBlockPreProps } from "./types";
import { MarkdownBlock } from "./markdown";
import { Table } from "./table";

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
