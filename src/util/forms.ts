import { all, getErrorMessage } from './generic';

import type { IFormDataTrial, TFormResponse } from '~/types';

export async function submitTrialForm(data: IFormDataTrial): Promise<TFormResponse> {
  let response = { success: false, message: 'Something went wrong.' };
  const envUrl = process.env.NEXT_PUBLIC_FORM_SALES_URL ?? '';
  const envHeader = process.env.NEXT_PUBLIC_FORM_SALES_HEADER ?? '';
  const envKey = process.env.NEXT_PUBLIC_FORM_SALES_KEY ?? '';

  if (all(envUrl, envHeader, envKey)) {
    try {
      const res = await fetch(envUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { [envHeader]: envKey },
      });
      const resData: TFormResponse = await res.json();
      response = resData;
    } catch (err) {
      console.error(err);
      response.message = getErrorMessage(err);
    }
  }

  return response;
}
