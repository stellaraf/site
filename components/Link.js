import * as React from 'react';
import NextLink from 'next/link';
import { Icon, Link as ChakraLink } from '@chakra-ui/core';
import { useLinkType } from '../hooks';

export const Link = ({ href, showIcon = false, children, ...props }) => {
  const { isExternal, target } = useLinkType(href);
  const Wrapper = isExternal ? React.Fragment : NextLink;
  const wrapperProps = isExternal ? {} : { passHref: true, href: target };
  const linkProps = isExternal ? { isExternal, href: target } : {};
  return (
    <Wrapper {...wrapperProps}>
      <ChakraLink {...linkProps} {...props}>
        {children}
        {showIcon && isExternal && <Icon name="external-link" mb={1} mx={1} />}
      </ChakraLink>
    </Wrapper>
  );
};
