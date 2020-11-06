import { forwardRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Link as ChakraLink, useToken } from '@chakra-ui/core';
import { EiExternalLink as ExternalIcon } from '@meronex/icons/ei';
import { useColorValue } from 'site/context';
import { useLinkType } from 'site/hooks';

import type { ILinkIcon, ILink } from './types';

const BaseLink = forwardRef<HTMLAnchorElement, ILink>((props, ref) => {
  const borderColor = useColorValue(
    useToken('colors', 'original.secondary'),
    useToken('colors', 'secondary.300'),
  );
  return (
    <ChakraLink
      ref={ref}
      css={{
        '&': {
          '--link-color': borderColor,
        },
        'p > &, td > &': {
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--link-color)',
          color: 'inherit',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            textDecoration: 'none',
            color: 'var(--link-color)',
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
const LinkIcon = (props: ILinkIcon) => (
  <Box as="span" mb={1} mx={1} {...props}>
    <ExternalIcon />
  </Box>
);

/**
 * Anchor link with proper external attributes set.
 */
const ExternalLink = forwardRef<HTMLAnchorElement, ILink>((props, ref) => (
  <BaseLink isExternal ref={ref} {...props} />
));

/**
 * Anchor link wrapped with a Next.js router link component for internal
 * routing.
 */
const InternalLink = forwardRef<HTMLAnchorElement, ILink>((props, ref) => {
  const { href = '/', children, ...rest } = props;

  /**
   * Links rendered outside of the Next.js Router Context won't be able to prefetch pages, which is
   * the default. If we're outside the Next.js Router Context, the returned value of useRouter()
   * will be `null`. When outside the Next.js Router Context, disable prefetching.
   */
  const router = useRouter();
  let nextLinkProps = {};

  if (router === null) {
    nextLinkProps = { prefetch: false };
  }

  return (
    <NextLink href={href} {...nextLinkProps}>
      <BaseLink ref={ref} href={href} {...rest}>
        {children}
      </BaseLink>
    </NextLink>
  );
});

/**
 * Extended Link Component to automagically determine internal vs. external or
 * optionally show an external link icon.
 */
export const Link = (props: ILink) => {
  const { href = '/', showIcon = false, children, ...rest } = props;
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
