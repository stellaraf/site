import { merge } from "merge-anything";
import { getParsedContent } from "./common";

import type { TActions, GlobalConfig, GlobalConfigEntry } from "~/types";

/**
 * Get the app's global configuration variables from Contentful.
 */
export async function getGlobalConfig(preview: boolean = false): Promise<GlobalConfig> {
  const [configEntry] = await getParsedContent<GlobalConfigEntry>("globalConfiguration", preview);

  // Extract the Theme Entry so its children can be parsed.
  const { theme: themeEntry, ...config } = configEntry;
  // Extract the color k:v pairs and remove themeName, which only exists for Contentful purposes.
  const { themeName: _, ...colors } = themeEntry.fields.colors.fields;
  // Extract the font k:v pairs and remove themeName, which only exists for Contentful purposes.
  const { themeName: __, ...fonts } = themeEntry.fields.fonts.fields;
  // Merge the theme & config.
  const globalConfig = merge(config, { theme: { colors, fonts } });

  return globalConfig;
}

/**
 * Get each Page Content with `showInCallToAction` set to true, & filter required fields.
 */
export async function getActions(preview: boolean = false): Promise<TActions[]> {
  const actions = [] as TActions[];

  const data = await getParsedContent<TActions>("pageContent", preview, {
    "fields.showInCallToAction": true,
    select: ["sys.id", "fields.body", "fields.page", "fields.title", "fields.subtitle", "fields.callToActionBody", "fields.callToActionIcon", "fields.callToActionIconColor"].join(","),
  });

  for (const item of data) {
    actions.push(item);
  }

  return actions;
}
