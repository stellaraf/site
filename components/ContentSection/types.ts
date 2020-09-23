import type { PageContent } from 'site/types';

export interface ContentSectionProps {
  items: PageContent;
  index: number;
  [k: string]: any;
}
