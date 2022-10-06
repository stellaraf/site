import { post } from "~/util";

export async function subscribeEmail(email: string): Promise<Response | undefined> {
  const url = process.env.NEXT_PUBLIC_SUBSCRIBE1_URL ?? "";
  const headerName = process.env.NEXT_PUBLIC_SUBSCRIBE1_HEADER ?? "";
  const key = process.env.NEXT_PUBLIC_SUBSCRIBE1_KEY ?? "";
  let response;
  if (typeof window !== "undefined") {
    response = await post(url, { email }, { headers: { [headerName]: key } });
  }
  return response;
}
