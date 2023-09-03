import { handleSalesForm, handleSupportForm, handleSubscribe } from "~/lib/api";

import type { NextApiHandler, NextApiRequest } from "next";

type FormKeys = "support" | "sales" | "subscribe" | "trial";
type FormHandler = (response: NextApiRequest) => Promise<Response>;

const FORM_MAP = new Map<FormKeys | string, FormHandler>([
  ["sales", handleSalesForm],
  ["support", handleSupportForm],
  ["subscribe", handleSubscribe],
  ["security-demo", handleSalesForm],
]);

function isValidForm(form: unknown): form is FormKeys {
  return typeof form === "string" && FORM_MAP.has(form);
}

const handler: NextApiHandler = async (request, response) => {
  if (request.method?.toLowerCase() !== "post") {
    return response.status(405).send(null);
  }

  const { name } = request.query;

  if (!isValidForm(name)) {
    const error = `'${name}' is an invalid form type`;
    console.error(error);
    return response.status(400).json({ error });
  }
  console.group(`${name} form`);
  try {
    const handler = FORM_MAP.get(name);
    if (typeof handler === "undefined") {
      const error = `No handler defined for form '${name}'`;
      console.error(error);
      console.groupEnd();
      return response.status(500).json({ error });
    }
    const result = await handler(request);
    const body = await result.text();

    if (result.ok) {
      console.log(result.status, result.statusText);
      console.log(body);
      console.groupEnd();
      return response.status(201).send(null);
    } else {
      const error = JSON.stringify(body);
      console.error(error);
      console.groupEnd();
      return response.status(500).json({ error });
    }
  } catch (error) {
    console.error(error);
    console.groupEnd();
    return response.status(500).json({ error: String(error) });
  }
};

export default handler;
