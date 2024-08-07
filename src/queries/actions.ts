import { is } from "~/lib";
import { type ActionsQuery, type ActionsQueryVariables, ThemeColor } from "~/types";

import { queryFn } from "./base";
import query from "./gql/actions.gql";

export type Actions = NonNullable<PropOf<ActionsQuery, "pageContents">>;

export default async function actions(variables: ActionsQueryVariables = {}): Promise<Actions> {
  const result = await queryFn<ActionsQuery, ActionsQueryVariables>({ query, variables });
  if (!is(result.pageContents)) {
    throw new Error(`Failed to find actions with query variables '${variables}'`);
  }
  const final = result.pageContents.map(each => {
    if (!is(each.callToAction.iconColor)) {
      const { callToAction: cta, ...pageContent } = each;
      const { iconColor, ...callToAction } = cta;
      return { ...pageContent, callToAction: { ...callToAction, iconColor: ThemeColor.Gray } };
    }
    return each;
  });

  return final;
}
