import { useTitleCase } from "use-title-case";
import { Button } from "~/components";

import type { TArticleButton } from "~/types";

export const ArticleButton = (props: TArticleButton) => {
  const { text, link } = props;
  const titleFn = useTitleCase();
  return (
    <Button px={4} size="xl" height={12} href={link} variant="heroPrimary">
      {titleFn(text)}
    </Button>
  );
};
