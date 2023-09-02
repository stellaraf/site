import { originFromEnv } from "~/lib";
import {
  configQuery,
  themeQuery,
  docsGroupsQuery,
  footerGroupsQuery,
  actionsQuery,
  twitterHandleQuery,
} from "~/queries";

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
  const theme = await themeQuery();
  const twitterHandle = await twitterHandleQuery({ title: "Stellar" });
  const originUrl = originFromEnv(process.env);
  const origin = originUrl.toString();
  return { actions, config, docsGroups, footerGroups, theme, twitterHandle, origin };
}
