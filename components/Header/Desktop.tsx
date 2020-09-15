import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, useStyles } from '@chakra-ui/core';
import { merge } from '@chakra-ui/utils';
import { Logo } from 'site/components/Logo';
import { Link } from 'site/components/Link';
import { useHeaderLogo } from 'site/styles';
import { NavLink, LinkGroup, ContactButton } from './Links';
import { HeaderLogo } from './Logo';

const Header = props => (
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

const Navbar = props => {
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

const NavGroup = props => (
  <Flex flex="1 0 0" alignItems="center" pointerEvents="auto" justifyContent="center" {...props} />
);

export const HeaderDesktop = props => {
  const headerLogo = useHeaderLogo();
  const { pathname } = useRouter();
  const styles = useStyles();
  return (
    <Header sx={merge({}, styles.box, styles.header)} {...props}>
      <Navbar>
        <Box overflow="hidden" pos="absolute">
          {pathname === '/' ? (
            <HeaderLogo show={headerLogo.value} />
          ) : (
            <Link href="/">
              <Logo.Typographic width={160} height={56} pb={4} />
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
