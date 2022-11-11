import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/footer-groups.gql";

import type { FooterGroupsQuery, FooterGroupsQueryVariables } from "~/types";

export type FooterGroups = NonNullable<FooterGroupsQuery["configuration"]>["footerGroups"];

export default async function footerGroups(
  variables: FooterGroupsQueryVariables = { title: "Stellar" },
): Promise<FooterGroups> {
  const result = await queryFn<FooterGroupsQuery, FooterGroupsQueryVariables>({ query, variables });
  if (!is(result.configuration)) {
    throw new Error(`Failed to find configuration with query variables '${variables}'`);
  }

  return result.configuration.footerGroups;
}
