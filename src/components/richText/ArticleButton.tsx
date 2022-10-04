import { useTitleCase } from "use-title-case";
import { Button } from "~/components";

import type { TArticleButton } from "~/types";

export const ArticleButton: React.FC<TArticleButton> = (props: TArticleButton) => {
  const { text, link } = props;
  const titleMe = useTitleCase();
  return (
    <Button px={4} size="xl" height={12} href={link} variant="heroPrimary">
      {titleMe(text)}
    </Button>
  );
};
