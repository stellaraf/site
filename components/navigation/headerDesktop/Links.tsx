import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link as ChakraLink } from '@chakra-ui/react';
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
      left: 0,
      right: 0,
      bottom: 0,
      width: '50%',
      height: '2px',
      content: `""`,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'absolute',
      borderRadius: '0.75rem',
      backgroundColor: activeColor,
      transform: 'translateY(-10px)',
      transition: 'width: 0.5s, opacity: 0.5s, transform 0.5s',
    };
  }
  return (
    <NextLink href={props.href ?? '/'}>
      <ChakraLink
        py={4}
        pos="relative"
        fontWeight="medium"
        px={{ lg: 2, xl: 4 }}
        mr={{ lg: 4, xl: 8 }}
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
  const { asPath } = useRouter();

  return (
    <>
      {navConfig[side].map(i => {
        /**
         * Determine which nav item is currently active, including child/sub pages. Because
         * the / route will match everything, filter that out from current path comparisons.
         */
        let isActive = false;
        if (asPath === '/' && i.link === '/') {
          isActive = true;
        } else if (i.link !== '/') {
          const match = asPath.match(new RegExp(i.link, 'gi')) ?? [];
          isActive = match.length !== 0;
        }
        return (
          <NavLink key={i.link} href={i.link} isActive={isActive} {...rest}>
            {i.title}
          </NavLink>
        );
      })}
    </>
  );
};

export const ContactButton = (props: ButtonProps) => {
  const color = useColorValue('secondary.600', 'white');
  const hoverBg = useColorValue('secondary.50', 'whiteAlpha.100');
  const borderColor = useColorValue('original.secondary', 'white');
  return (
    <Button
      color={color}
      href="/contact"
      borderWidth="1px"
      variant="outline"
      borderColor={borderColor}
      _hover={{ backgroundColor: hoverBg }}
      {...props}>
      Talk to Us
    </Button>
  );
};
