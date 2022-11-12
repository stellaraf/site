import { DefaultSeo } from "next-seo";

import { useConfig } from "~/context";

import type { DefaultSeoProps, NextSeoProps } from "next-seo";

export const SEOBase = (props: DefaultSeoProps) => {
  const { title, description, socialLinks, organizationName } = useConfig();

  let indexFollow = {} as NextSeoProps;
  if (process.env.VERCEL_ENV === "preview") {
    // Ensure noindex/nofollow are set for preview site.
    indexFollow = { nofollow: true, noindex: true };
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
      {...indexFollow}
      {...props}
    />
  );
};
