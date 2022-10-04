import type { InputProps } from "@chakra-ui/react";
import type { Control } from "react-hook-form";
import type { TFormModelTrial, IFormDataTrial, IPartnerPage } from "~/types";

export type IPartnerLayout = IPartnerPage["pageData"];

export type IPartnerContext = Omit<IPartnerLayout, "trialForm"> & {
  fields: TFormModelTrial;
};

export interface ITextField extends InputProps {
  name: string;
  required?: boolean;
}

export interface ITextInput extends Omit<ITextField, "as" | "onFocus" | "name"> {
  ctl: Control;
  id: string;
}

export type TFormSubmitter = (v: string, d: IFormDataTrial) => Promise<TFormResponse>;

export type TFormRef = {
  submit(): void;
};

export type TFormResponse = {
  success: boolean;
  message: string;
};

export type { IFormDataTrial, TFormModelTrial } from "~/types";
export type { IFormHandlers } from "~/components";
