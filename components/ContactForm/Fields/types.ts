import type { InputProps, TextareaProps } from '@chakra-ui/core';
import type { Control } from 'react-hook-form';
import type { ISelect, TOptions } from 'site/components';

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
