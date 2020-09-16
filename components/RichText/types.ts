import type {
  BoxProps,
  ListProps,
  ListItemProps,
  TextProps,
  CodeProps as ChakraCodeProps,
  HeadingProps as ChakraHeadingProps,
} from '@chakra-ui/core';

export type BlockQuoteProps = BoxProps;

export type CodeProps = ChakraCodeProps;

export type HeadingProps = ChakraHeadingProps;

export type UlProps = ListProps;
export type OlProps = ListProps;
export type LiProps = ListItemProps;

export type ParagraphProps = TextProps;

export interface BaseHeadingProps extends ChakraHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}
