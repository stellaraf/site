import type { BoxProps } from '@chakra-ui/react';

export interface IDocsLayout extends BoxProps {}

export interface IResponsiveLayout extends BoxProps {}

export interface UseDocsHref {
  href: string;
  isCurrent: boolean;
}
