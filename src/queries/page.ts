import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./page.gql";

import type { PageQuery, PageQueryVariables } from "~/types";

export type Page = NonNullable<PageQuery["page"]>;
export type PageContents = Page["contents"];
export type PageContent = ArrayElement<PageContents>;
export type Feature = ArrayElement<PageContent["features"]>;
export type Callout = NonNullable<Page["callout"]>;
export type VendorLogo = NonNullable<PageContent["vendorLogo"]>;

export default async function (variables: PageQueryVariables): Promise<Page> {
  const result = await queryFn<PageQuery, PageQueryVariables>({ query, variables });
  if (!is(result.page)) {
    throw new Error(`Failed to find page with query variables '${JSON.stringify(variables)}'`);
  }
  return result.page;
}
