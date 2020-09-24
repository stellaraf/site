import * as yup from 'yup';
import { post } from 'site/util';

export async function subscribeEmail(email: string) {
  const url = process.env.NEXT_PUBLIC_SUBSCRIBE1_URL ?? '';
  const headerName = process.env.NEXT_PUBLIC_SUBSCRIBE1_HEADER ?? '';
  const key = process.env.NEXT_PUBLIC_SUBSCRIBE1_KEY ?? '';
  return await post(url, { email }, { headers: { [headerName]: key } });
}

export const subscribeSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email address'),
});
