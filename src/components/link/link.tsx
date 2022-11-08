import { forwardRef } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { chakra, Link as ChakraLink } from "@chakra-ui/react";

import { DynamicIcon } from "~/components";
import { useColorTokenValue } from "~/context";
import { useLinkType } from "~/hooks";

import type { LinkProps } from "./types";
import type { BoxProps } from "@chakra-ui/react";

const BaseLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const borderColor = useColorTokenValue("secondary.500", "secondary.300");

  return (
    <ChakraLink
      ref={ref}
      css={{
        "&": { "--link-color": borderColor },
        "p > &, .st-content-p > &, td > &": {
          borderBottomWidth: "1px",
          borderBottomColor: "var(--link-color)",
          color: "inherit",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            textDecoration: "none",
            color: "var(--link-color)",
          },
        },
      }}
      {...props}
    />
  );
});

/**
 * External Icon.
 */
const LinkIcon = (props: BoxProps) => (
  <chakra.span mb={1} mx={1} {...props}>
    <DynamicIcon icon={{ ei: "EiExternalIcon" }} />
  </chakra.span>
);

/**
 * Anchor link with proper external attributes set.
 */
const ExternalLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <BaseLink isExternal ref={ref} {...props} />
));

/**
 * Anchor link wrapped with a Next.js router link component for internal
 * routing.
 */
const InternalLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { href = "/", children, ...rest } = props;

  // Links rendered outside of the Next.js Router Context won't be able to prefetch pages, which is
  // the default. If we're outside the Next.js Router Context, the returned value of useRouter()
  // will be `null`. When outside the Next.js Router Context, disable prefetching.
  const router = useRouter();
  let nextLinkProps = {};

  if (router === null) {
    nextLinkProps = { prefetch: false };
  }

  return (
    <BaseLink ref={ref} href={href} {...nextLinkProps} {...rest} as={NextLink}>
      {children}
    </BaseLink>
  );
});

/**
 * Extended Link Component to automagically determine internal vs. external or
 * optionally show an external link icon.
 */
export const Link = (props: LinkProps) => {
  const { href = "/", showIcon = false, children, ...rest } = props;

  const { isExternal, target } = useLinkType(href);

  if (isExternal) {
    return (
      <ExternalLink href={target} {...rest}>
        {children}
        {showIcon && <LinkIcon />}
      </ExternalLink>
    );
  }

  return (
    <InternalLink href={target} {...rest}>
      {children}
    </InternalLink>
  );
};

BaseLink.displayName = "BaseLink";
InternalLink.displayName = "InternalLink";
ExternalLink.displayName = "ExternalLink";