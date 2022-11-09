import isBot from "isbot";
import queryString from "query-string";
import { z } from "zod";

import { isValidJsonRequest } from "~/lib";

import { parseUserAgent } from "./common";

import type { SFDCLead } from "./types";
import type { NextApiRequest } from "next";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string(),
  phoneNumber: z.string().optional(),
  interests: z.array(z.string()).default([]),
  companyName: z.string(),
});

type Schema = z.infer<typeof schema>;

if (typeof process.env.SFDC_ORG_ID === "undefined") {
  throw new Error("SFDC_ORG_ID missing from environment variables");
}

export async function handleSalesForm(request: NextApiRequest): Promise<Response> {
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

  const data = request.body;

  const schemaResult = await schema.safeParseAsync(data);

  if (schemaResult.success) {
    const {
      firstName: first_name,
      lastName: last_name,
      emailAddress: email,
      phoneNumber,
      interests,
      companyName: company,
    } = data as Schema;
    const userData = parseUserAgent(request);

    // Initialize multi-line string for case comments, to which User Data will be added.
    let webFormMetadata = `Form: ${form}
    Interests: ${interests.join(", ")}

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
    };
    // Set the doNotCall property if no phone number is specified.
    if (typeof phoneNumber === "undefined") {
      formData.doNotCall = 1;
    } else {
      formData.phone = phoneNumber;
    }
    // Add debug fields if in development environment.
    if (process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") {
      formData.debug = 1;
      formData.debugEmail = "matt@stellar.tech";
    }

    const url = queryString.stringifyUrl({
      url: "https://webto.salesforce.com/servlet/servlet.WebToLead",
      query: formData,
    });
    return fetch(url, {
      method: "POST",
    });
  }
  throw schemaResult.error;
}
