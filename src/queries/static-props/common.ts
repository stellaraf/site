import { originFromEnv } from "~/lib";
import {
  configQuery,
  themeQuery,
  docsGroupsQuery,
  footerGroupsQuery,
  actionsQuery,
  twitterHandleQuery,
} from "~/queries";

import type { CommonPageProps } from "~/types";

export async function commonStaticPropsQuery(): Promise<CommonPageProps> {
  const actions = await actionsQuery();
  const config = await configQuery();
  const docsGroups = await docsGroupsQuery();
  const footerGroups = await footerGroupsQuery();
  const theme = await themeQuery();
  const twitterHandle = await twitterHandleQuery({ title: "Stellar" });
  const originUrl = originFromEnv(process.env);
  const origin = originUrl.toString();
  return { actions, config, docsGroups, footerGroups, theme, twitterHandle, origin };
}
