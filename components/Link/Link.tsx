import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Box, Link as ChakraLink } from '@chakra-ui/core';
import ExternalIcon from '@meronex/icons/ei/EiExternalLink';
import { useLinkType } from 'site/hooks';

import type { LinkIconProps, LinkProps } from './types';

/**
 * External Icon.
 */
const LinkIcon = (props: LinkIconProps) => (
  <Box as="span" mb={1} mx={1} {...props}>
    <ExternalIcon />
  </Box>
);

/**
 * Anchor link with proper external attributes set.
 */
const ExternalLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <ChakraLink isExternal ref={ref} {...props} />
));

/**
 * Anchor link wrapped with a Next.js router link component for internal
 * routing.
 */
const InternalLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <NextLink href={href}>
      <ChakraLink ref={ref} href={href} {...rest}>
        {children}
      </ChakraLink>
    </NextLink>
  );
});

/**
 * Extended Link Component to automagically determine internal vs. external or
 * optionally show an external link icon.
 */
export const Link = (props: LinkProps) => {
  const { href, showIcon = false, children, ...rest } = props;
  const { isExternal, target } = useLinkType(href);
  let Component = InternalLink;
  if (isExternal) {
    Component = ExternalLink;
  }
  return (
    <Component href={target} {...rest}>
      {children}
      {showIcon && isExternal && <LinkIcon />}
    </Component>
  );
};
