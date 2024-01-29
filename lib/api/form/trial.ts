import isBot from "isbot";
import queryString from "query-string";
import { z } from "zod";

import { isValidJsonRequest } from "~/lib";

import { parseUserAgent, formNameFromHeaders } from "./common";

import type { SFDCLead } from "./types";
import type { NextApiRequest } from "next";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string(),
  phoneNumber: z.string().optional(),
  product: z.string(),
  company: z.string(),
});

type Schema = z.infer<typeof schema>;

if (typeof process.env.SFDC_ORG_ID === "undefined") {
  throw new Error("SFDC_ORG_ID missing from environment variables");
}

export async function handleTrialForm(request: NextApiRequest): Promise<Response> {
  if (!isValidJsonRequest(request)) {
    throw new Error("Invalid request payload");
  }

  if (isBot(request.headers["user-agent"])) {
    throw new Error("You seem like a robot");
  }

  let form = "unknown";
  if (typeof request.url !== "undefined") {
    const [withoutQuery] = request.url.split("?");
    const paths = withoutQuery.split("/");
    form = paths[paths.length - 1];
  }

  const formName = formNameFromHeaders(request.headers);

  const data = { ...request.body, product: formName };

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
    phoneNumber,
    product,
    company,
  } = data as Schema;
  const userData = parseUserAgent(request);

  // Initialize multi-line string for case comments, to which User Data will be added.
  let webFormMetadata = `Form: ${form}
    Product: ${product}

  `;
  // Add each User Data key & value to case comment.
  for (const [k, v] of Object.entries(userData)) {
    webFormMetadata += `
    ${k}: ${v}`;
  }
  // Create an object conforming with SFDC field requirements.
  const formData: SFDCLead = {
    encoding: "UTF-8",
    oid: process.env.SFDC_ORG_ID,
    first_name,
    last_name,
    company,
    email,
    lead_source: "Website",
    description: "",
    ["00N3j00000FccT7"]: webFormMetadata,
    retURL: "https://stellar.tech",
  };
  // Set the doNotCall property if no phone number is specified.
  if (typeof phoneNumber === "undefined" || phoneNumber === "") {
    formData.doNotCall = 1;
  } else {
    formData.phone = phoneNumber;
  }
  // Add debug fields if in development environment.
  if (process.env.NODE_ENV !== "production") {
    formData.debug = 1;
    formData.debugEmail = "matt@stellar.tech";
  }

  const url = queryString.stringifyUrl({
    url: "https://webto.salesforce.com/servlet/servlet.WebToLead",
    query: formData,
  });
  console.group("submitting form");
  console.dir(formData);
  console.groupEnd();
  return await fetch(url, {
    method: "POST",
  });
}
