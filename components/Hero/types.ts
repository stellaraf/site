import type { BoxProps } from '@chakra-ui/core';
import type { ReactNode } from 'react';
// import type {PageAttrs} from "site/types"

// export type HeroProps = Pick<PageAttrs,

export interface HeroProps extends BoxProps {
  title: string;
  subtitle?: string;
  body?: ReactNode;
}
