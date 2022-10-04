const favicons = require("favicons");
const fs = require("fs");

const sourceLight = "./public/logos/stellar-icon-round.svg";
const sourceDark = "./public/logos/stellar-icon-alt-round.svg";

const common = {
  appName: "Stellar Technologies",
  appShortName: "Stellar",
  appDescription: "Fueling Your Digital Velocity",
  lang: "en-US",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    firefox: true,
    windows: true,
  },
};
const configLight = {
  ...common,
  path: "/logos/light",
  background: "#fff",
  theme_color: "#2915d6",
};

const configDark = {
  ...common,
  path: "/logos/dark",
  background: "#0D090A",
  theme_color: "#9100FA",
};

const colorModeMap = {
  light: [sourceLight, configLight],
  dark: [sourceDark, configDark],
};

const modes = ["light", "dark"];

module.exports = function () {
  let images = new Set();
  for (let mode of modes) {
    const [source, config] = colorModeMap[mode];
    favicons(source, config, (error, response) => {
      if (error) {
        console.error(error.message);
        return;
      }
      try {
        for (let image of response.images) {
          console.log(`[${mode.toUpperCase()}]`, "Writing", image.name);
          fs.writeFileSync(`./public/logos/${mode}/${image.name}`, image.contents);
          images.add(image.name);
        }
        for (let file of response.files) {
          fs.writeFileSync(`./public/logos/${mode}/${file.name}`, file.contents);
          console.log(`[${mode.toUpperCase()}]`, "Writing", file.name);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
};
