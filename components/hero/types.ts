import type { BoxProps } from '@chakra-ui/react';
import type { Document } from '@contentful/rich-text-types';

export interface IHero extends BoxProps {
  title: string;
  subtitle?: string;
  body: Document | null;
}
