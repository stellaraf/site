import slugify from "slugify";

export async function submitForm(name: string, data: unknown): Promise<Response | Error> {
  if (typeof window !== "undefined") {
    try {
      const formName = slugify(name, { lower: true, trim: true });
      const url = `${window.location.origin}/api/form/${formName}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", "x-form-name": name },
        body: JSON.stringify(data),
      });
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err;
      }
      return new Error(String(err));
    }
  }
  return new Response(null, { status: 200 });
}
