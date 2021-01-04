import type { FooterItem, IActions } from '~/types';

export interface ISiteLayout {
  footerGroups: FooterItem[];
  actions: IActions[];
  children: React.ReactNode;
  preview: boolean;
}
