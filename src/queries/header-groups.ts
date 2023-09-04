import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/header-groups.gql";

import type { HeaderGroupsQuery, HeaderGroupsQueryVariables } from "~/types";

export type HeaderGroups = NonNullable<HeaderGroupsQuery["configuration"]>["headerGroups"];

export default async function (
  variables: HeaderGroupsQueryVariables = { title: "Stellar" },
): Promise<HeaderGroups> {
  const result = await queryFn<HeaderGroupsQuery, HeaderGroupsQueryVariables>({ query, variables });
  if (!is(result.configuration)) {
    throw new Error(
      `Failed to find configuration with query variables '${JSON.stringify(variables)}'`,
    );
  }

  return result.configuration.headerGroups;
}
