import type { ComponentType, MutableRefObject } from 'react';
import type { State } from '@hookstate/core';
import type { BoxProps, FlexProps, StackProps } from '@chakra-ui/core';
import type { IconType } from '@meronex/icons';
import type { IContactCard, CustomColors, FormModels } from 'site/types';
import type { FormHandlers } from './Forms/types';

type ContactOption = IContactCard & FlexProps;

type TIconName = IContactCard['icon'];

export interface IContactOption extends Omit<ContactOption, 'icon' | 'color' | 'buttonText'> {
  icon: JSX.Element;
  iconName: TIconName;
  index?: number;
  accent?: keyof CustomColors;
  formRef?: MutableRefObject<FormHandlers>;
  toggleLayout: (i?: number) => void;
}

export interface ICardBody extends BoxProps {
  spacing?: StackProps['spacing'];
}

export interface IIcon extends Omit<FlexProps, 'color'> {
  icon: ComponentType<IconType>;
  size?: number;
  color: string;
}

export interface IFormState {
  selectedName: TIconName | null;
  selectedIndex: number | null;
  form: { Support: FormModels<'Support'>; Sales: FormModels<'Sales'> };
}

export type FormState = State<IFormState>;

export interface IMotionItems {
  idx: number;
  current: number | null;
}

export interface IOptions extends StackProps {
  cards: IContactCard[];
}

export interface IOptionsResponsive extends StackProps {
  cards: IContactCard[];
}

export interface IFormContainer {
  title: string;
  body: string;
  icon: JSX.Element;
  accent: keyof CustomColors;
  toggleLayout: (i?: number) => void;
  formRef: MutableRefObject<FormHandlers>;
}
