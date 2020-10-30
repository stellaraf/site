import type { TFormResponse, IFormDataTrial } from './types';
import { all } from 'site/util';

export async function submitForm(vendor: string, data: IFormDataTrial): Promise<TFormResponse> {
  let response = { success: false, message: 'Something went wrong.' };
  const envUrl = process.env.NEXT_PUBLIC_FORM_SALES_URL ?? '';
  const envHeader = process.env.NEXT_PUBLIC_FORM_SALES_HEADER ?? '';
  const envKey = process.env.NEXT_PUBLIC_FORM_SALES_KEY ?? '';

  if (all(envUrl, envHeader, envKey)) {
    try {
      const res = await fetch(envUrl, {
        method: 'POST',
        body: JSON.stringify({ vendor, ...data }),
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
