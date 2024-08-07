import { originFromEnv } from "~/lib";

import {
  actionsQuery,
  configQuery,
  docsGroupsQuery,
  footerGroupsQuery,
  headerGroupsQuery,
  themeQuery,
  twitterHandleQuery,
} from "../";
import { buildFooter } from "./footer";
import { buildHeaders } from "./header";

import type { CommonPageProps, Stage } from "~/types";

interface CommonStaticPropsQueryProps {
  stage: Stage;
}

export async function commonStaticPropsQuery(
  props: CommonStaticPropsQueryProps,
): Promise<CommonPageProps> {
  const { stage } = props;
  const actions = await actionsQuery();
  const config = await configQuery();
  const docsGroups = await docsGroupsQuery({ stage });
  const footerGroups = await footerGroupsQuery();
  const headerGroups = await headerGroupsQuery();
  const menus = buildHeaders(headerGroups);
  const footers = buildFooter(footerGroups);
  const theme = await themeQuery();
  const twitterHandle = await twitterHandleQuery({ title: "Stellar" });
  const originUrl = originFromEnv(process.env);
  const origin = originUrl.toString();
  return { actions, config, docsGroups, footers, theme, twitterHandle, origin, menus };
}
