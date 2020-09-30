import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, useStyles } from '@chakra-ui/core';
import { merge } from '@chakra-ui/utils';
import { Link, Logo } from 'site/components';
import { useNavLogoState } from 'site/hooks';
import { NavLink, LinkGroup, ContactButton } from './Links';
import { HeaderLogo } from './Logo';

import type { BoxProps, FlexProps } from './types';

const Header = (props: BoxProps) => (
  <Box
    top={0}
    left={0}
    w="100%"
    right={0}
    as="header"
    pos="fixed"
    height={32}
    zIndex={1000}
    bg="transparent"
    transition={{ transition: 'all 200ms ease-in' }}
    {...props}
  />
);

const Navbar = (props: BoxProps) => {
  return (
    <Flex
      py={8}
      px={24}
      as="nav"
      flexDir="row"
      pos="relative"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="flex-start"
      {...props}
    />
  );
};

const NavGroup = (props: FlexProps) => (
  <Flex flex="1 0 0" alignItems="center" pointerEvents="auto" justifyContent="center" {...props} />
);

export const DHeader = (props: BoxProps) => {
  const { pathname } = useRouter();
  const { value: showLogo } = useNavLogoState();
  const styles = useStyles();
  return (
    <Header sx={merge({}, styles.box, styles.header)}>
      <Navbar {...props}>
        <Box overflow="hidden" pos="absolute">
          {pathname === '/' ? (
            <HeaderLogo show={showLogo} />
          ) : (
            <Link href="/">
              <Logo.Text width={160} height={56} pb={4} />
            </Link>
          )}
        </Box>
        <NavGroup>
          <LinkGroup side="left" styles={styles.link} />
          <LinkGroup side="right" styles={styles.link} />
          <NavLink href="https://docs.stellar.tech" styles={styles.link}>
            Docs
          </NavLink>
          <ContactButton sx={styles.button} />
        </NavGroup>
      </Navbar>
    </Header>
  );
};
