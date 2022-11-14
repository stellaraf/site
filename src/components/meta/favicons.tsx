import { NextSeo, type NextSeoProps } from "next-seo";

import { useColorMode } from "~/context";

const appleStartup: [number, number, number, "portrait" | "landscape", number, number][] = [
  [320, 568, 2, "portrait", 640, 1136],
  [375, 667, 2, "portrait", 750, 1334],
  [414, 896, 2, "portrait", 828, 1792],
  [375, 812, 3, "portrait", 1125, 2436],
  [414, 736, 3, "portrait", 1242, 2208],
  [414, 896, 3, "portrait", 1242, 2688],
  [768, 1024, 2, "portrait", 1536, 2048],
  [834, 1112, 2, "portrait", 1668, 2224],
  [834, 1194, 2, "portrait", 1668, 2388],
  [1024, 1366, 2, "portrait", 2048, 2732],
  [810, 1080, 2, "portrait", 1620, 2160],
  [320, 568, 2, "landscape", 1136, 640],
  [375, 667, 2, "landscape", 1334, 750],
  [414, 896, 2, "landscape", 1792, 828],
  [375, 812, 3, "landscape", 2436, 1125],
  [414, 736, 3, "landscape", 2208, 1242],
  [414, 896, 3, "landscape", 2688, 1242],
  [768, 1024, 2, "landscape", 2048, 1536],
  [834, 1112, 2, "landscape", 2224, 1668],
  [834, 1194, 2, "landscape", 2388, 1668],
  [1024, 1366, 2, "landscape", 2732, 2048],
  [810, 1080, 2, "landscape", 2160, 1620],
];

type LinkTags = NonNullable<NextSeoProps["additionalLinkTags"]>;
type MetaTags = NonNullable<NextSeoProps["additionalMetaTags"]>;

interface FaviconsProps {
  organizationName: string;
  light: string;
  dark: string;
}

export const Favicons = (props: FaviconsProps) => {
  const { colorMode } = useColorMode();
  const { organizationName, light, dark } = props;
  const theme = colorMode === "light" ? light : dark;

  const linkTags: LinkTags = [
    ...[16, 32, 48].map(s => ({
      rel: "icon",
      type: "image/png",
      sizes: `${s}x${s}`,
      href: `/logos/${colorMode}/favicon-${s}x${s}.png`,
    })),
    ...[57, 60, 72, 76, 120, 144, 152, 167, 180, 1024].map(s => ({
      rel: "apple-touch-icon",
      sizes: `${s}x${s}`,
      href: `/logos/${colorMode}/apple-touch-icon-${s}x${s}.png`,
    })),
    ...appleStartup.map(
      ([deviceWidth, deviceHeight, webkitRatio, orientation, resWidth, resHeight]) => ({
        rel: "apple-touch-startup-image",
        media: `(device-width: ${deviceWidth}px) and (device-height: ${deviceHeight}px) and (-webkit-device-pixel-ratio: ${webkitRatio}) and (orientation: ${orientation})`,
        href: `/logos/${colorMode}/apple-touch-startup-image-${resWidth}x${resHeight}.png`,
      }),
    ),
    { rel: "shortcut icon", href: `/logos/${colorMode}/favicon.ico` },
    { rel: "manifest", href: `/logos/${colorMode}/manifest.json` },
    {
      rel: "icon",
      type: "image/png",
      sizes: "228x228",
      href: `/logos/${colorMode}/coast-228x228.png`,
    },
    {
      rel: "yandex-tableau-widget",
      href: `/logos/${colorMode}/yandex-browser-manifest.json`,
    },
  ];

  const metaTags: MetaTags = [
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "theme-color", content: theme },
    { name: "application-name", content: organizationName },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: organizationName },
    { name: "msapplication-TileColor", content: "#fff" },
    { name: "msapplication-TileImage", content: `/logos/${colorMode}/mstile-144x144.png` },
    { name: "msapplication-config", content: `/logos/${colorMode}/browserconfig.xml` },
  ];

  return <NextSeo additionalLinkTags={linkTags} additionalMetaTags={metaTags} />;
};
