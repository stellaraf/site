import queryString from "query-string";

import type { SelectOptionSingle } from "~/types";

const headers = new Headers({
  accept: "application/json",
  "user-agent": "stellar.tech/lib/server/lead-types",
  authorization: process.env.ALERTHUB_TOKEN,
});

export async function getLeadTypes(): Promise<SelectOptionSingle[]> {
  const url = queryString.stringifyUrl({
    url: "https://alerthub.stellar.tech/salesforce/data/picklist-values",
    query: {
      sobject: "Lead",
      field: "Lead_Type__c",
    },
  });
  const res = await fetch(url, { headers });
  const data = (await res.json()) as SelectOptionSingle[];
  return data.sort((a, b) => (a.label > b.label ? 1 : -1));
}
