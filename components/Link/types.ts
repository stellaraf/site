import type { BoxProps, LinkProps as ChakraLinkProps } from '@chakra-ui/core';

export interface LinkProps extends ChakraLinkProps {
  showIcon?: boolean;
}

export type LinkIconProps = BoxProps;
