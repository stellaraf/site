import type { ReactNode } from 'react';
import type { FooterItem, IActions } from 'site/types';

export interface SiteLayoutProps {
  footerGroups: FooterItem[];
  actions: IActions[];
  children: ReactNode;
}

export type { BoxProps } from '@chakra-ui/core';
