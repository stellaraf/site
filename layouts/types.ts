import type { ReactNode } from 'react';
import type { FooterItem } from 'site/types';

export interface SiteLayoutProps {
  footerGroups: FooterItem[];
  children: ReactNode;
}

export type { BoxProps } from '@chakra-ui/core';
