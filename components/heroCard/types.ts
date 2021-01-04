import type { FlexProps } from '@chakra-ui/react';
import type { Document } from '@contentful/rich-text-types';

export interface CardContent {
  title: string;
  body: Document;
}

export interface ICard extends FlexProps {
  content: CardContent;
}

export interface IHeroCards extends FlexProps {
  content: CardContent[];
  icon?: string;
}
