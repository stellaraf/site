import * as React from 'react';
import { useRouter } from 'next/router';
import { Button, Link } from 'site/components';
import navConfig from '../config';

import type { ButtonProps } from 'site/components';
import type { INavLink, ILinkGroup, IPassedLink } from './types';

export const NavLink = (props: INavLink) => {
  const { isActive = false, styles, ...rest } = props;
  const { activeColor, ...sx } = styles ?? {};
  let linkProps: IPassedLink = { sx };
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
  return <Link {...linkProps} {...rest} />;
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

export const ContactButton = (props: ButtonProps) => (
  <Button href="/contact" borderWidth="1px" borderColor="transparent" {...props}>
    Talk to Us
  </Button>
);