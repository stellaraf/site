import type { BoxProps, GridProps, HeadingProps } from '@chakra-ui/react';
import type { Paragraph } from 'site/types';

export interface TitleProps extends HeadingProps {
  id: string;
  children: string;
}
export interface ISubtitle extends HeadingProps {
  children: string;
}

export interface IContentBody extends BoxProps {}

export interface IUpdatedAt extends BoxProps {}

export interface ISubSection extends Omit<Paragraph, 'icon'> {
  icon?: string;
}

export interface ISubSectionGroup extends GridProps {
  sections: Paragraph[];
}

export interface IImage extends BoxProps {
  src: string;
}
