import { notNullUndefined } from "~/types";
import { ThemeColor, type ActionsQuery, type ActionsQueryVariables } from "~/types/schema";

import query from "./actions.gql";
import { queryFn } from "./base";

export type Actions = NonNullable<PropOf<ActionsQuery, "pageContents">>;

export default async function actions(variables: ActionsQueryVariables = {}): Promise<Actions> {
  const result = await queryFn<ActionsQuery, ActionsQueryVariables>({ query, variables });
  if (!notNullUndefined(result.pageContents)) {
    throw new Error(`Failed to find actions with query variables '${variables}'`);
  }
  const final = result.pageContents.map(each => {
    if (!notNullUndefined(each.callToAction.iconColor)) {
      const { callToAction: cta, ...pageContent } = each;
      const { iconColor, ...callToAction } = cta;
      return { ...pageContent, callToAction: { ...callToAction, iconColor: ThemeColor.Gray } };
    }
    return each;
  });

  return final;
}
