import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Box, Icon, Link as ChakraLink } from '@chakra-ui/core';
import { EiExternalLink } from '@meronex/icons/ei';
import { useLinkType } from 'site/hooks';
import type { ReactChildren } from 'react';
import type { BoxProps, LinkProps as ChakraLinkProps } from '@chakra-ui/core';

interface LinkProps extends BoxProps {
  href: string;
  showIcon?: boolean;
  children?: ReactChildren;
}

const LinkIcon = props => (
  <Box as="span" mb={1} mx={1} {...props}>
    <EiExternalLink />
  </Box>
);

const ExternalLink = props => <ChakraLink isExternal {...props} />;

const InternalLink = forwardRef(({ href, children, ...props }: ChakraLinkProps, ref) => {
  return (
    <NextLink href={href}>
      <ChakraLink href={href} {...props} ref={ref}>
        {children}
      </ChakraLink>
    </NextLink>
  );
});

export const Link = ({ href, showIcon = false, children, ...props }: LinkProps) => {
  const { isExternal, target } = useLinkType(href);
  let Component = InternalLink;
  if (isExternal) {
    Component = ExternalLink;
  }
  return (
    <Component href={target} {...props}>
      {children}
      {showIcon && isExternal && <LinkIcon />}
    </Component>
  );
};
