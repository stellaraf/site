import { DefaultSeo } from "next-seo";

import { useConfig } from "~/context";

import type { DefaultSeoProps, NextSeoProps } from "next-seo";

export const SEOBase = (props: DefaultSeoProps) => {
  const { title, description, socialLinks, organizationName } = useConfig();

  let indexFollow = {} as NextSeoProps;
  let urlPrefix = "https://stellar.tech";
  if (process.env.GIT_BRANCH === "develop") {
    // Ensure noindex/nofollow are set for preview site.
    indexFollow = { nofollow: true, noindex: true };
    urlPrefix = "https://preview.stellar.tech";
  }

  const twitterHandle = socialLinks.reduce<string | undefined>((final, link) => {
    if (link.name.toLowerCase() === "twitter") {
      const parts = link.href.split("/");
      final = parts[parts.length - 1];
    }
    return final;
  }, undefined);

  return (
    <DefaultSeo
      title={organizationName}
      description={description}
      titleTemplate={`%s | ${title}`}
      twitter={{ site: twitterHandle, cardType: "summary" }}
      openGraph={{
        url: "/",
        title: organizationName,
        type: "website",
        description,
        images: [
          {
            url: `${urlPrefix}/opengraph.jpg`,
            width: 1200,
            height: 630,
            alt: organizationName,
          },
          {
            url: `${urlPrefix}/opengraph.png`,
            width: 1429,
            height: 687,
            alt: organizationName,
          },
        ],
      }}
      {...indexFollow}
      {...props}
    />
  );
};
