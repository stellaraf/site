import {
  configQuery,
  themeQuery,
  docsGroupsQuery,
  footerGroupsQuery,
  actionsQuery,
} from "~/queries";

import type { CommonPageProps } from "~/types";

export async function commonStaticPropsQuery(): Promise<CommonPageProps> {
  const actions = await actionsQuery();
  const config = await configQuery();
  const docsGroups = await docsGroupsQuery();
  const footerGroups = await footerGroupsQuery();
  const theme = await themeQuery();
  return { actions, config, docsGroups, footerGroups, theme };
}
