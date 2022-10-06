import type { TFormModelTrial, IFormDataTrial, TFormResponse } from "~/types";

export interface TrialFormProps {
  name: string;
  fields: Omit<TFormModelTrial, "name">;
  onSubmit: (data: IFormDataTrial) => Promise<TFormResponse>;
}
