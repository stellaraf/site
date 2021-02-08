import type { BoxProps } from '@chakra-ui/react';

export interface ICodeBlock extends BoxProps {
  children: string | JSX.Element;
}
