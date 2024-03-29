import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/theme.gql";

import type { ThemeConfig } from "~/theme";
import type { ThemeQuery, ThemeQueryVariables } from "~/types";

export type Theme = NonNullable<NonNullable<ThemeQuery["configuration"]>["theme"]>;

export default async function theme(): Promise<ThemeConfig> {
  const base = await queryFn<ThemeQuery, ThemeQueryVariables>({ query });

  if (!is(base.configuration)) {
    throw new Error("Failed to find configuration with theme");
  }
  if (!is(base.configuration.theme)) {
    throw new Error("No theme associated with configuration");
  }

  const colors = Object.entries(base.configuration.theme.colors).reduce<ThemeConfig["colors"]>(
    (final, [color, value]) => {
      if (typeof value === "object") {
        final[color] = value.hex;
      }
      return final;
    },
    {},
  );

  return { colors };
}
