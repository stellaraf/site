import type {
  ToastProps,
  ToastId,
  BoxProps,
  StackProps,
  InputProps,
  AlertProps,
  RenderProps,
  IconButtonProps,
  SimpleGridProps,
} from '@chakra-ui/react';
import type { ControllerRenderProps } from 'react-hook-form';
import type { SortedFooterItem } from '~/types';

export interface IFooter extends BoxProps {
  groups: SortedFooterItem[];
}

export interface IFooterLinks extends SimpleGridProps {
  groups: SortedFooterItem[];
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
  alertPosition?: ToastProps['position'];
}

export interface ISubscribeInput extends InputProps {
  field: ControllerRenderProps<ISubscribeFormData>;
}

export interface ISubscribeFormData {
  email: string;
}

export type ToastStatus = ToastProps['status'];

type RenderedAlert = Omit<RenderProps, 'id'> & Omit<AlertProps, 'id'>;

export interface ISubscribeAlert extends RenderedAlert {
  status: ToastProps['status'];
  title?: string;
  description?: string;
  isClosable?: boolean;
  variant?: string;
  id: ToastId;
}

export interface ISubscribeToast {
  status: ToastProps['status'];
  message: string;
}
