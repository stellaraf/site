export async function submitter(
  data: Record<string, unknown>,
): Promise<Record<string, unknown> | Error> {
  if (typeof window !== "undefined") {
    try {
      // TODO: add an API route for form handling
      const url = `${window.location.origin}/api/form${window.location.pathname}`;
      const response = await fetch(window.location.href, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return json;
    } catch (err) {
      if (err instanceof Error) {
        return err;
      }
      return new Error(String(err));
    }
  }
  return {};
}
