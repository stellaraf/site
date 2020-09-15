import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Box, Link as ChakraLink } from '@chakra-ui/core';
import ExternalIcon from '@meronex/icons/ei/EiExternalLink';
import { useLinkType } from 'site/hooks';

import type { BoxProps, LinkProps as ChakraLinkProps } from '@chakra-ui/core';

interface LinkProps extends ChakraLinkProps {
  showIcon?: boolean;
}

const LinkIcon = (props: BoxProps) => (
  <Box as="span" mb={1} mx={1} {...props}>
    <ExternalIcon />
  </Box>
);

const ExternalLink = forwardRef<HTMLAnchorElement, ChakraLinkProps>((props, ref) => (
  <ChakraLink isExternal ref={ref} {...props} />
));

const InternalLink = forwardRef<HTMLAnchorElement, ChakraLinkProps>((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <NextLink href={href}>
      <ChakraLink ref={ref} href={href} {...rest}>
        {children}
      </ChakraLink>
    </NextLink>
  );
});

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
