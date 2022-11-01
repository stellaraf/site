import { notNullUndefined } from "~/types";

import { queryFn } from "./base";
import query from "./footer-groups.gql";

import type { FooterGroupsQuery, FooterGroupsQueryVariables } from "~/types/schema";

export type FooterGroups = NonNullable<FooterGroupsQuery["configuration"]>["footerGroups"];

export default async function footerGroups(
  variables: FooterGroupsQueryVariables = { title: "Stellar" },
): Promise<FooterGroups> {
  const result = await queryFn<FooterGroupsQuery, FooterGroupsQueryVariables>({ query, variables });
  if (!notNullUndefined(result.configuration)) {
    throw new Error(`Failed to find configuration with query variables '${variables}'`);
  }

  return result.configuration.footerGroups;
}
