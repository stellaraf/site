import { Button } from 'site/components';
import { useTitle } from 'site/hooks';

import type { TArticleButton } from 'site/types';

export const ArticleButton = (props: TArticleButton) => {
  const { text, link } = props;
  const titleMe = useTitle();
  return (
    <Button px={4} size="xl" height={12} href={link} variant="heroPrimary">
      {titleMe(text)}
    </Button>
  );
};
