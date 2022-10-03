import type { BoxProps } from '@chakra-ui/react';
import type { PageContent } from '~/types';

export interface IContentSection extends BoxProps {
  items: PageContent;
  index: number;
}
export type TSideValues = 'right' | 'left';
export type TSides = ['right', 'left'];

export interface ITitleLayout {
  titleBlock: JSX.Element;
  image: JSX.Element | null;
  isMobile: boolean;
  side: TSideValues;
}
