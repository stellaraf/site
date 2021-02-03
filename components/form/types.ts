import type { InputProps, TextareaProps } from '@chakra-ui/react';
import type { Control } from 'react-hook-form';
import type { ISelect, TOptions } from '~/components';
import type { IFormModelTrial, IFormDataTrial, TFormResponse } from '~/types';

export interface ITextField extends InputProps {
  name: string;
  required?: boolean;
}

export interface ITextInput extends Omit<ITextField, 'as' | 'onFocus' | 'name'> {
  ctl: Control;
  id: string;
}

export interface ITextAreaField extends TextareaProps {
  name: string;
  required?: boolean;
}

export interface ITextArea extends Omit<ITextAreaField, 'as' | 'onFocus' | 'name'> {
  ctl: Control;
  id: string;
}

export interface ISelectField extends Omit<ISelect, 'name' | 'onSelect' | 'options'> {
  id: string;
  opts: TOptions;
}

export interface IFormHandlers {
  submit: () => void;
}

export interface TTrialForm {
  name: string;
  fields: Omit<IFormModelTrial, 'name'>;
  onSubmit: (data: IFormDataTrial) => Promise<TFormResponse>;
}
