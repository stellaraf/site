import type { InputProps } from '@chakra-ui/react';
import type { State } from '@hookstate/core';
import type { Control } from 'react-hook-form';
import type { IFormModelTrial, IFormDataTrial, IPartnerPage } from 'site/types';

export type IPartnerLayout = IPartnerPage['pageData'];

export type TTrialForm = State<IFormModelTrial>;

export type IPartnerContext = Omit<IPartnerLayout, 'trialForm'> & {
  trialForm: TTrialForm;
};

export interface ITextField extends InputProps {
  name: string;
  required?: boolean;
}

export interface ITextInput extends Omit<ITextField, 'as' | 'onFocus' | 'name'> {
  ctl: Control;
  id: string;
}

export type TFormSubmitter = (v: string, d: IFormDataTrial) => Promise<TFormResponse>;

export type TFormRef = {
  submit(): void;
};

export interface IForm {}

export type TFormResponse = {
  success: boolean;
  message: string;
};

export type { IFormDataTrial, IFormModelTrial } from 'site/types';
export type { IFormHandlers } from 'site/components';
