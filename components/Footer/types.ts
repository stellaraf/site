import type {
  BoxProps,
  FlexProps,
  StackProps,
  IconButtonProps,
  InputProps,
  IToast,
  AlertProps,
  RenderProps,
  ToastId,
} from '@chakra-ui/core';
import type { FooterItem } from 'site/types';

export interface FooterProps extends BoxProps {
  groups: FooterItem[];
}

export interface IFooterLinks extends FlexProps {
  groups: FooterItem[];
}

export interface StructuredItems<T> {
  [k: string]: T;
}

export interface ISocialLinks extends StackProps {}

export interface ISocialLink extends Omit<IconButtonProps, 'href' | 'title' | 'aria-label'> {
  label: string;
  href: string;
}

export type { BoxProps } from '@chakra-ui/core';

export interface ISubscribe extends StackProps {}

export interface ISubscribeInput extends InputProps {}

export interface ISubscribeFormData {
  email: string;
}

export type ToastStatus = IToast['status'];

type RenderedAlert = Omit<RenderProps, 'id'> & Omit<AlertProps, 'id'>;

export interface ISubscribeAlert extends RenderedAlert {
  status: IToast['status'];
  title?: string;
  description?: string;
  isClosable?: boolean;
  variant?: string;
  id: ToastId;
}

export interface ISubscribeToast {
  status: IToast['status'];
  message: string;
}
