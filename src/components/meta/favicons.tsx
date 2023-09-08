import { useColorMode } from "@chakra-ui/react";
import { NextSeo, type NextSeoProps } from "next-seo";

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
      href: `/api/favicon?m=${colorMode}&w=${s}&h=${s}&a=true`,
    })),
    ...[57, 60, 72, 76, 120, 144, 152, 167, 180, 1024].map(s => ({
      rel: "apple-touch-icon",
      sizes: `${s}x${s}`,
      href: `/api/favicon?m=${colorMode}&w=${s}&h=${s}&a=false`,
    })),
    ...appleStartup.map(
      ([deviceWidth, deviceHeight, webkitRatio, orientation, resWidth, resHeight]) => ({
        rel: "apple-touch-startup-image",
        media: `(device-width: ${deviceWidth}px) and (device-height: ${deviceHeight}px) and (-webkit-device-pixel-ratio: ${webkitRatio}) and (orientation: ${orientation})`,
        href: `/api/favicon?m=${colorMode}&w=${resWidth}&h=${resHeight}&a=false`,
      }),
    ),
    { rel: "shortcut icon", href: `/favicon-${colorMode}.ico` },
    { rel: "manifest", href: `/site.webmanifest` },
    {
      rel: "icon",
      type: "image/png",
      sizes: "228x228",
      href: `/api/favicon?m=${colorMode}&w=228&h=228&a=false`,
    },
  ];

  const metaTags: MetaTags = [
    { name: "theme-color", content: theme },
    { name: "application-name", content: organizationName },
  ];

  return <NextSeo additionalLinkTags={linkTags} additionalMetaTags={metaTags} />;
};
