import { isbot } from "isbot";
import type { NextApiRequest } from "next";
import { z } from "zod";
import { isValidJsonRequest } from "~/lib";
import { parseUserAgent } from "./common";
import type { SFDCLeadToAlertHub } from "./types";

const headers = new Headers({
  accept: "application/json",
  "content-type": "application/json",
  "user-agent": "stellar.tech/lib/api/form/partnership",
  authorization: process.env.ALERTHUB_TOKEN,
});

const schema = z.object({
  "full-name": z.string(),
  "company-name": z.string(),
  "email-address": z.string(),
  "phone-number": z.string(),
  "job-title": z.string(),
  "company-website": z.string(),
  "company-headquarters": z.string(),
  "partnership-type": z.string(),
  "additional-information": z.string(),
});

type Schema = z.infer<typeof schema>;

if (typeof process.env.SFDC_ORG_ID === "undefined") {
  throw new Error("SFDC_ORG_ID missing from environment variables");
}

export async function handlePartnershipForm(request: NextApiRequest): Promise<Response> {
  if (!isValidJsonRequest(request)) {
    throw new Error("Invalid request payload");
  }
  if (isbot(request.headers["user-agent"])) {
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
  if (!schemaResult.success) {
    const error = schemaResult.error.issues
      .map(i => `${i.path.join("/")}: ${i.message}`)
      .join("\n");
    throw new Error(error);
  }
  const {
    "full-name": fullName,
    "company-name": company,
    "email-address": email,
    "phone-number": phone,
    "job-title": title,
    "company-website": website,
    "company-headquarters": addressString,
    "partnership-type": leadType,
    "additional-information": description,
  } = data as Schema;

  const userData = parseUserAgent(request);

  const address = JSON.parse(addressString);

  let webFormMetadata = `Form: ${form}

  `;
  // Add each User Data key & value to case comment.
  for (const [k, v] of Object.entries(userData)) {
    webFormMetadata += `
    ${k}: ${v}`;
  }

  const [firstName, ...lastNameParts] = fullName.split(" ");
  const lastName = lastNameParts.join(" ");

  const formData: SFDCLeadToAlertHub = {
    firstName,
    lastName,
    webFormMetadata,
    website,
    email,
    company,
    phone,
    title,
    address,
    leadSource: "Website",
    leadType,
    description,
  };

  try {
    const res = await fetch("https://alerthub.stellar.tech/salesforce/lead/create", {
      body: JSON.stringify(formData),
      headers,
      method: "POST",
    });
    if (res.status !== 200) {
      const errData = await res.json();
      return new Response(JSON.stringify(errData), { status: 500 });
    }
    return new Response(null, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
}
