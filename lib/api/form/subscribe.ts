import isBot from "isbot";
import { z } from "zod";

import { isValidJsonRequest } from "~/lib";

import type { NextApiRequest } from "next";

const schema = z.object({ email: z.string().email() });

type Schema = z.infer<typeof schema>;

for (const key of ["CPM_API_KEY", "CPM_LIST_ID"]) {
  if (typeof process.env[key] === "undefined") {
    throw new Error(`'${key}' missing from environment variables`);
  }
}

export async function handleSubscribe(request: NextApiRequest): Promise<Response> {
  if (!isValidJsonRequest(request)) {
    throw new Error("Invalid request payload");
  }

  if (isBot(request.headers["user-agent"])) {
    throw new Error("You seem like a robot");
  }

  const data = request.body;

  const schemaResult = await schema.safeParseAsync(data);

  if (!schemaResult.success) {
    const error = schemaResult.error.issues
      .map(i => `${i.path.join("/")}: ${i.message}`)
      .join("\n");
    throw new Error(error);
  }

  const { email } = data as Schema;

  const url = `https://api.createsend.com/api/v3.3/subscribers/${process.env.CPM_LIST_ID}.json`;
  const basic = Buffer.from(`${process.env.CPM_API_KEY}:empty`).toString("base64");
  const body = JSON.stringify({ EmailAddress: email, ConsentToTrack: "Yes" });
  const Authorization = `Basic ${basic}`;
  const headers = new Headers({ "content-type": "application/json", Authorization });
  return await fetch(url, { body, headers, method: "POST" });
}
