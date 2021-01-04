import { all } from '~/util';

import type { TFormTypes, TFormFields, TFormResponse } from './Forms/types';

export async function submitForm<F extends TFormTypes, D extends TFormFields<F>>(
  form: F,
  data: D,
): Promise<TFormResponse> {
  let response = { success: false, message: 'Something went wrong.' };
  const formKey = form.toUpperCase();
  let envUrl = '',
    envHeader = '',
    envKey = '';

  if (formKey === 'SUPPORT') {
    envUrl = process.env.NEXT_PUBLIC_FORM_SUPPORT_URL ?? '';
    envHeader = process.env.NEXT_PUBLIC_FORM_SUPPORT_HEADER ?? '';
    envKey = process.env.NEXT_PUBLIC_FORM_SUPPORT_KEY ?? '';
  } else if (formKey === 'SALES') {
    envUrl = process.env.NEXT_PUBLIC_FORM_SALES_URL ?? '';
    envHeader = process.env.NEXT_PUBLIC_FORM_SALES_HEADER ?? '';
    envKey = process.env.NEXT_PUBLIC_FORM_SALES_KEY ?? '';
  }

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
      response.message = err.message;
    }
  }

  return response;
}
