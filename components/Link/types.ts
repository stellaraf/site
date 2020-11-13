import type { LinkProps as NextLinkProps } from 'next/link';
import type { BoxProps, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type CombinedLinkProps = NextLinkProps & ChakraLinkProps;

export interface ILink extends Omit<CombinedLinkProps, 'href'> {
  href?: string;
  showIcon?: boolean;
}

export type ILinkIcon = BoxProps;
