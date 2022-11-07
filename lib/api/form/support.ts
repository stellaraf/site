import isBot from "isbot";
import queryString from "query-string";
import { z } from "zod";

import { isValidJsonRequest } from "~/lib";

import { parseUserAgent } from "./common";

import type { SFDCCase } from "./types";
import type { NextApiRequest } from "next";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string(),
  phoneNumber: z.string().optional(),
  details: z.string(),
  companyName: z.string(),
});

type Schema = z.infer<typeof schema>;

if (typeof process.env.SFDC_ORG_ID === "undefined") {
  throw new Error("SFDC_ORG_ID missing from environment variables");
}

// eslint-disable-next-line import/no-unused-modules
export async function handleSupportForm(request: NextApiRequest): Promise<Response> {
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

  const {
    firstName: first_name,
    lastName: last_name,
    emailAddress: email,
    phoneNumber: phone,
    details: description,
    companyName: company,
  } = data as Schema;
  const userData = parseUserAgent(request);
  // Initialize multi-line string for case comments, to which User Data will be added.
  let caseComment = `${description}
  `;

  // Add each User Data key & value to case comment.
  for (const [k, v] of Object.entries(userData)) {
    caseComment += `
    ${k}: ${v}`;
  }
  // Create an object conforming with SFDC field requirements.
  const formData: SFDCCase = {
    encoding: "UTF-8",
    name: `${first_name} ${last_name}`,
    email,
    phone,
    company,
    subject: "From website support form",
    description,
    status: "New",
    type: "Request",
    ["00N3j00000FccHG"]: caseComment,
    orgid: process.env.SFDC_ORG_ID,
  };

  // Add debug fields if in development environment.
  if (process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") {
    formData.debug = 1;
    formData.debugEmail = "matt@stellar.tech";
  }

  console.log(formData);

  const url = queryString.stringifyUrl({
    url: "https://webto.salesforce.com/servlet/servlet.WebToCase",
    query: formData,
  });
  return fetch(url, {
    method: "POST",
  });
}
