import type { ReactNode } from 'react';
import type { BoxProps, GridProps } from '@chakra-ui/react';
import type { HomeSection } from 'site/types';

export interface HomeSectionProps extends BoxProps {
  section: HomeSection;
  index: number;
}

export type TSideValues = 'right' | 'left';
export type TSides = ['right', 'left'];

export interface IHomeBlock extends GridProps {
  title: HomeSection['title'];
  subtitle: HomeSection['subtitle'];
  body: ReactNode;
  buttonText: HomeSection['buttonText'];
  buttonLink: HomeSection['buttonLink'];
  imageUrl: string;
  side: TSideValues;
}
