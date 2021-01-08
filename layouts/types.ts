import type { FooterItem, TActions } from '~/types';

export interface ISiteLayout {
  footerGroups: FooterItem[];
  actions: TActions[];
  children: React.ReactNode;
  preview: boolean;
}
