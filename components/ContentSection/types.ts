import type { PageContent } from 'site/types';

export interface ContentSectionProps {
  items: PageContent;
  index: number;
  [k: string]: any;
}
export type TSideValues = 'right' | 'left';
export type TSides = ['right', 'left'];
