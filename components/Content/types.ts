import type { ReactNode } from 'react';
import type { BoxProps, GridProps, HeadingProps } from '@chakra-ui/core';
import type { Paragraph } from 'site/types';

export interface TitleProps extends HeadingProps {
  id: string;
  children: string;
}
export interface ISubtitle extends HeadingProps {
  children: string;
}

export interface ISubSection extends Paragraph {}

export interface IContentBody extends BoxProps {}

export interface IUpdatedAt extends BoxProps {}

export interface RenderedSubSectionProps extends Omit<ISubSection, 'body' | 'icon'> {
  body: ReactNode;
  icon?: string;
}

export interface SubSectionGroupProps extends GridProps {
  sections: ISubSection[];
}

export interface IImage extends BoxProps {
  src: string;
}
