import { DefaultSeo } from "next-seo";
import { useConfig } from "~/context";

import type { NextSeoProps } from "next-seo";
import type { IBaseSEO } from "./types";

export const BaseSEO: React.FC<IBaseSEO> = (props: IBaseSEO) => {
  const { siteTitle, twitterHandle, siteDescription, orgName } = useConfig();

  let indexFollow = {} as NextSeoProps;
  let urlPrefix = "https://stellar.tech";
  if (process.env.GIT_BRANCH === "develop") {
    // Ensure noindex/nofollow are set for preview site.
    indexFollow = { nofollow: true, noindex: true };
    urlPrefix = "https://preview.stellar.tech";
  }

  return (
    <DefaultSeo
      title={orgName}
      description={siteDescription}
      titleTemplate={`%s | ${siteTitle}`}
      twitter={{ site: twitterHandle, cardType: "summary" }}
      openGraph={{
        url: "/",
        title: orgName,
        type: "website",
        description: siteDescription,
        images: [
          {
            url: `${urlPrefix}/opengraph.jpg`,
            width: 1200,
            height: 630,
            alt: orgName,
          },
          {
            url: `${urlPrefix}/opengraph.png`,
            width: 1429,
            height: 687,
            alt: orgName,
          },
        ],
      }}
      {...indexFollow}
      {...props}
    />
  );
};
