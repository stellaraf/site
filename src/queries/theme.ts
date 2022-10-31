import query from "./theme.gql";
import { queryFn } from "./base";
import { notNullUndefined } from "~/types";

import type { ThemeConfig } from "~/types";
import type { ThemeQuery, ThemeQueryVariables } from "~/types/schema";

export type Theme = NonNullable<NonNullable<ThemeQuery["configuration"]>["theme"]>;

export default async function theme(): Promise<ThemeConfig> {
  const base = await queryFn<ThemeQuery, ThemeQueryVariables>({ query });

  if (!notNullUndefined(base.configuration)) {
    throw new Error("Failed to find configuration with theme");
  }
  if (!notNullUndefined(base.configuration.theme)) {
    throw new Error("No theme associated with configuration");
  }

  const { fonts } = base.configuration.theme;

  const colors = Object.entries(base.configuration.theme.colors).reduce<ThemeConfig["colors"]>(
    (final, [color, value]) => {
      if (typeof value === "object") {
        final[color] = value.hex;
      }
      return final;
    },
    {},
  );

  return { colors, fonts };
}
