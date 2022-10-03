import type { ParsedUrlQuery } from 'querystring';
import type { BoxProps, FlexProps, StackProps } from '@chakra-ui/react';
import type { IContactCard, CustomColors, FormModel } from '~/types';
import type { FormHandlers, TFormTypes } from './Forms/types';

type ContactOption = IContactCard & FlexProps;

export type FormIcon = IContactCard['icon'];

export interface IContactOption extends Omit<ContactOption, 'icon' | 'color' | 'buttonText'> {
  icon: JSX.Element;
  iconName: FormIcon;
  index?: number;
  accent?: keyof CustomColors;
  formRef?: React.MutableRefObject<FormHandlers>;
  toggleLayout?: (i?: number) => void;
}

export interface ICardBody extends BoxProps {
  spacing?: StackProps['spacing'];
}

export interface IMotionItems {
  idx: number;
  current: number | null;
}

export interface IOptions extends StackProps {
  cards: IContactCard[];
}

export interface IOptionsResponsive extends StackProps {}

export type TSupportedFormQuery = {
  form: TFormTypes;
};

export type TContactQuery = TSupportedFormQuery | ParsedUrlQuery;

export type AvailableForms = {
  Support: FormModel<'Support'>;
  Sales: FormModel<'Sales'>;
};
