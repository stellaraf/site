import { is } from "~/lib";
import { type PageQuery, type PageQueryVariables, Stage } from "~/types";

import { queryFn } from "./base";
import query from "./gql/page.gql";

export type Page = NonNullable<PageQuery["page"]>;
export type PageContents = Page["contents"];
export type PageContent = ArrayElement<PageContents>;
export type Feature = ArrayElement<PageContent["features"]>;
export type Callout = NonNullable<Page["callout"]>;
export type VendorLogo = NonNullable<PageContent["vendorLogo"]>;

export default async function (variables: PageQueryVariables): Promise<Page> {
  const { slug, stage } = variables;
  let result = await queryFn<PageQuery, PageQueryVariables>({
    query,
    variables: { slug, stage },
  });
  if (!is(result.page)) {
    result = await queryFn<PageQuery, PageQueryVariables>({
      query,
      variables: { slug, stage: Stage.Published },
    });
  }
  if (!is(result.page)) {
    throw new Error(`Failed to find page with query variables '${JSON.stringify(variables)}'`);
  }
  return result.page;
}
