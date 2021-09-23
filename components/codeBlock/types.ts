import type { BoxProps, CodeProps } from '@chakra-ui/react';

export interface ICodeBlock extends BoxProps, Pick<CodeProps, 'colorScheme'> {
  children: string | JSX.Element;
}
