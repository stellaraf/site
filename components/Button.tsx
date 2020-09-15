import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Button as ChakraButton } from '@chakra-ui/core';
import { useLinkType } from 'site/hooks';
import type { AnchorHTMLAttributes } from 'react';
import type { ButtonProps, LinkProps } from '@chakra-ui/core';

type ExternalButtonProps = ButtonProps & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const BaseButton = forwardRef<HTMLAnchorElement, ExternalButtonProps>((props, ref) => {
  return (
    <ChakraButton as="a" ref={ref} px={3} py={1} lineHeight={1.5} borderRadius="lg" {...props} />
  );
});

const ExternalButton = forwardRef<HTMLAnchorElement, ExternalButtonProps>((props, ref) => {
  const { href, ...rest } = props;
  return (
    <NextLink href={href} passHref>
      <BaseButton ref={ref} target="_blank" rel="noopener noreferrer" {...rest} />
    </NextLink>
  );
});

export const Button = forwardRef<HTMLAnchorElement, ExternalButtonProps>((props, ref) => {
  const { href = '/', ...rest } = props;
  let label = null;
  if (typeof props.children === 'string') {
    label = props.children;
  }
  const { isExternal, target } = useLinkType(href);
  let Component = BaseButton;

  if (isExternal) {
    Component = ExternalButton;
  }
  return <Component href={target} aria-label={label} ref={ref} {...rest} />;
});
