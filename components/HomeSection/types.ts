import { BoxProps } from '@chakra-ui/core';
import type { HomeSection } from 'site/types';

export interface HomeSectionProps extends BoxProps {
  section: HomeSection;
  index: number;
}
