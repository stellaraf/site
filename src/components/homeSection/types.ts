import type { BoxProps, GridProps } from '@chakra-ui/react';
import type { HomeSection } from '~/types';

export interface IHomeSection extends BoxProps {
  section: HomeSection;
  index: number;
}

export type TSideValues = 'right' | 'left';
export type TSides = ['right', 'left'];

export interface IHomeBlock extends GridProps {
  buttonText: HomeSection['buttonText'];
  buttonLink: HomeSection['buttonLink'];
  subtitle: HomeSection['subtitle'];
  title: HomeSection['title'];
  body: React.ReactNode;
  side: TSideValues;
  imageUrl: string;
}
