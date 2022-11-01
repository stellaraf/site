export async function subscribeEmail(email: string): Promise<Response | undefined> {
  const url = process.env.NEXT_PUBLIC_SUBSCRIBE1_URL ?? "";
  const headerName = process.env.NEXT_PUBLIC_SUBSCRIBE1_HEADER ?? "";
  const key = process.env.NEXT_PUBLIC_SUBSCRIBE1_KEY ?? "";
  let response;
  if (typeof window !== "undefined") {
    response = await fetch(url, {
      headers: { [headerName]: key, "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }
  return response;
}
