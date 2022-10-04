import fs from "node:fs";
import favicons from "favicons";

import type { FaviconOptions } from "favicons";

const sourceLight = "./public/logos/stellar-icon-round.svg";
const sourceDark = "./public/logos/stellar-icon-alt-round.svg";

type ColorModeMap = { light: [string, FaviconOptions]; dark: [string, FaviconOptions] };

const common: FaviconOptions = {
  appName: "Stellar Technologies",
  appShortName: "Stellar",
  appDescription: "Fueling Your Digital Velocity",
  lang: "en-US",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    windows: true,
    yandex: false,
  },
};
const configLight: FaviconOptions = {
  ...common,
  path: "/logos/light",
  background: "#fff",
  theme_color: "#2915d6",
};

const configDark: FaviconOptions = {
  ...common,
  path: "/logos/dark",
  background: "#0D090A",
  theme_color: "#9100FA",
};

const colorModeMap: ColorModeMap = {
  light: [sourceLight, configLight],
  dark: [sourceDark, configDark],
};

const modes: Array<keyof ColorModeMap> = ["light", "dark"];

export default async function generate() {
  const images = new Set();
  for (const mode of modes) {
    const [source, config] = colorModeMap[mode];
    const response = await favicons(source, config);
    try {
      for (const image of response.images) {
        console.log(`[${mode.toUpperCase()}]`, "Writing", image.name);
        fs.writeFileSync(`./public/logos/${mode}/${image.name}`, image.contents);
        images.add(image.name);
      }
      for (const file of response.files) {
        fs.writeFileSync(`./public/logos/${mode}/${file.name}`, file.contents);
        console.log(`[${mode.toUpperCase()}]`, "Writing", file.name);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
