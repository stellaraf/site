import type { GridProps, HeadingProps } from '@chakra-ui/core';
export type { BoxProps, GridProps, HeadingProps } from '@chakra-ui/core';
import type { Document } from '@contentful/rich-text-types';
import type { ReactNode } from 'react';

export interface TitleProps extends HeadingProps {
  id: string;
  children: string;
}
export interface ISubtitle extends HeadingProps {
  children: string;
}

export interface SubSectionProps {
  title: string;
  body: Document;
}

export interface RenderedSubSectionProps extends Omit<SubSectionProps, 'body'> {
  body: ReactNode;
}

export interface SubSectionGroupProps extends GridProps {
  sections: SubSectionProps[];
}
