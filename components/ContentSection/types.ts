import type { PageContent } from 'site/util/content';

export interface ContentSectionProps {
  items: PageContent;
  index: number;
  [k: string]: any;
}
