import type { SortedFooterItem, TActions } from '~/types';

export interface ISiteLayout {
  footerGroups: SortedFooterItem[];
  actions: TActions[];
  children: React.ReactNode;
  preview: boolean;
}
