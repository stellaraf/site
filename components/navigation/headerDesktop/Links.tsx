import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link as ChakraLink } from '@chakra-ui/core';
import { Button } from 'site/components';
import { useColorValue } from 'site/context';
import navConfig from '../config';

import type { ButtonProps } from 'site/components';
import type { INavLink, ILinkGroup, IPassedLink } from './types';

export const NavLink = (props: INavLink) => {
  const { isActive = false, ...rest } = props;
  const activeColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');

  let linkProps: IPassedLink = {};
  if (isActive) {
    linkProps._after = {
      backgroundColor: activeColor,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
      height: '2px',
      borderRadius: '0.75rem',
      content: `""`,
      transition: 'width: 0.5s, opacity: 0.5s, transform 0.5s',
      transform: 'translateY(-10px)',
    };
  }
  return (
    <NextLink href={props.href ?? '/'}>
      <ChakraLink
        py={4}
        px={{ lg: 2, xl: 4 }}
        mr={{ lg: 4, xl: 8 }}
        pos="relative"
        fontWeight="medium"
        transition="all 0.2s"
        _hover={{ textDecoration: 'none', transform: 'translateY(-2px)', opacity: 0.8 }}
        {...linkProps}
        {...rest}
      />
    </NextLink>
  );
};

/**
 * Group of header links, pinned to a specific side of the header.
 */
export const LinkGroup = (props: ILinkGroup) => {
  const { side, ...rest } = props;
  const { pathname } = useRouter();
  return (
    <>
      {navConfig[side].map(i => (
        <NavLink key={i.link} href={i.link} isActive={pathname === i.link} {...rest}>
          {i.title}
        </NavLink>
      ))}
    </>
  );
};

export const ContactButton = (props: ButtonProps) => {
  const borderColor = useColorValue('original.secondary', 'white');
  const hoverBg = useColorValue('secondary.50', 'whiteAlpha.100');
  const color = useColorValue('secondary.600', 'white');
  return (
    <Button
      href="/contact"
      borderWidth="1px"
      variant="outline"
      borderColor={borderColor}
      _hover={{ backgroundColor: hoverBg }}
      color={color}
      {...props}>
      Talk to Us
    </Button>
  );
};