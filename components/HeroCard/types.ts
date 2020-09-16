import type { FlexProps } from '@chakra-ui/core';
import type { Document } from '@contentful/rich-text-types';

export interface CardContent {
  title: string;
  body: Document;
}

export interface CardProps extends FlexProps {
  content: CardContent;
}

export interface CardContainerProps extends FlexProps {
  content: CardContent[];
  icon?: string;
}