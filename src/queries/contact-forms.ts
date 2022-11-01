import { notNullUndefined } from "~/types";

import { queryFn } from "./base";
import query from "./contact-forms.gql";

import type { ContactFormsQuery, ContactFormsQueryVariables } from "~/types/schema";

export type ContactForms = NonNullable<PropOf<ContactFormsQuery, "configuration">>["contactForms"];
export type ContactForm = ArrayElement<ContactForms>;
export type ContactFormFields = ContactForm["fields"];

export default async function contactForms(
  variables: ContactFormsQueryVariables = { config: "Stellar" },
): Promise<ContactForms> {
  const result = await queryFn<ContactFormsQuery, ContactFormsQueryVariables>({ query, variables });
  if (!notNullUndefined(result.configuration)) {
    throw new Error(`Failed to find configuration with query variables '${variables}'`);
  }
  return result.configuration.contactForms;
}
