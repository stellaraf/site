import { Button } from '~/components';
import { useTitle } from '~/hooks';

import type { TArticleButton } from '~/types';

export const ArticleButton: React.FC<TArticleButton> = (props: TArticleButton) => {
  const { text, link } = props;
  const titleMe = useTitle();
  return (
    <Button px={4} size="xl" height={12} href={link} variant="heroPrimary">
      {titleMe(text)}
    </Button>
  );
};
