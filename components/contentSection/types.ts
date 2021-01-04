import type { BoxProps } from '@chakra-ui/react';
import type { PageContent } from 'site/types';

export interface IContentSection extends BoxProps {
  items: PageContent;
  index: number;
}
export type TSideValues = 'right' | 'left';
export type TSides = ['right', 'left'];

export interface ITitleLayout {
  titleBlock: JSX.Element;
  image: React.FC | null;
  isMobile: boolean;
  side: TSideValues;
}
