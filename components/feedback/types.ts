import { BoxProps, AlertProps } from '@chakra-ui/react';

export interface IError extends AlertProps {
  title?: string;
  description?: React.ReactNode;
}

export interface IContentLoader extends BoxProps {}
