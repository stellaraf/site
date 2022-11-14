import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/twitter-handle.gql";

import type { TwitterHandleQuery, TwitterHandleQueryVariables } from "~/types";

export default async function (variables: TwitterHandleQueryVariables): Promise<string> {
  const result = await queryFn<TwitterHandleQuery, TwitterHandleQueryVariables>({
    query,
    variables,
  });
  if (!is(result.configuration)) {
    throw new Error(
      `Failed to find twitter handle with query variables '${JSON.stringify(variables)}'`,
    );
  }
  const parts = result.configuration.socialLinks[0].href.split("/");
  return parts[parts.length - 1];
}
