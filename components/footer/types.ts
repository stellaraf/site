import type {
  BoxProps,
  StackProps,
  IconButtonProps,
  InputProps,
  IToast,
  AlertProps,
  RenderProps,
  ToastId,
  SimpleGridProps,
} from '@chakra-ui/react';
import type { FooterItem } from 'site/types';

export interface IFooter extends BoxProps {
  groups: FooterItem[];
}

export interface IFooterLinks extends SimpleGridProps {
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

export type { BoxProps } from '@chakra-ui/react';

export interface ISubscribe extends StackProps {
  alertProps?: AlertProps;
  alertPosition?: IToast['position'];
}

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
