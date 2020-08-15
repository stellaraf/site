import * as React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/core';
import { animated, useTransition } from 'react-spring';
import { Logo } from 'site/components/Logo';
import { Button } from 'site/components/Button';
import { Link } from 'site/components/Link';
import { showHeaderLogo, _headerStyle } from 'site/state/atoms';
import { useColorMode } from 'site/context';
import navConfig from './config';

const bg = { dark: 'original.dark', light: 'original.primary' };
const accent = { dark: 'original.tertiary', light: 'blackAlpha.300' };
const variant = { dark: 'tertiary', light: 'gray' };
const text = { dark: 'light.200', light: 'blackAlpha.800' };
const textHover = { dark: 'light.50', light: 'blackAlpha.600' };

const Header = props => {
  const [headerStyle] = useRecoilState(_headerStyle);
  return (
    <Box
      as="header"
      pos="fixed"
      height={32}
      top={0}
      left={0}
      right={0}
      w="100%"
      zIndex={1000}
      transition={{ transition: 'all 200ms ease-in' }}
      bg="transparent"
      {...headerStyle}
      {...props}
    />
  );
};

const Navbar = props => {
  return (
    <Flex
      as="nav"
      pos="relative"
      px={24}
      py={8}
      alignItems="center"
      flexDir="row"
      flexWrap="nowrap"
      justifyContent="flex-start"
      {...props}
    />
  );
};

const ItemGroup = props => (
  <Flex flex="1 0 0" alignItems="center" pointerEvents="auto" justifyContent="center" {...props} />
);

const activeProps = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
  height: '2px',
  borderRadius: '0.75rem',
  content: '""',
  transition: 'width: 0.5s, opacity: 0.5s, transform 0.5s',
  transform: 'translateY(-10px)',
};

const NavLink = ({ isActive, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <Link
      p={4}
      mr={8}
      pos="relative"
      fontWeight="medium"
      transition="all 0.2s"
      _hover={{
        color: textHover[colorMode],
        textDecoration: 'none',
        transform: `translateY(-2px)`,
      }}
      _after={isActive ? { backgroundColor: accent[colorMode], ...activeProps } : null}
      {...props}
    />
  );
};

const Items = ({ side }) => {
  const { pathname } = useRouter();
  const navItems = [];
  for (let i of navConfig[side]) {
    navItems.push(
      <NavLink key={i.link} href={i.link} isActive={pathname === i.link}>
        {i.title}
      </NavLink>,
    );
  }
  return navItems;
};

const btnBorder = { dark: 'original.tertiary', light: 'blackAlpha.800' };

const ContactButton = props => {
  const { colorMode } = useColorMode();
  return (
    <Button
      href="/contact"
      borderWidth="1px"
      borderColor="transparent"
      _hover={{
        backgroundColor: 'transparent',
        color: btnBorder[colorMode],
        borderColor: btnBorder[colorMode],
        borderWidth: '1px',
      }}
      {...props}>
      Talk to Us
    </Button>
  );
};

const AnimatedLogo = ({ color, show, ...props }) => {
  const LogoShown = (
    <Link href="/">
      <Logo.Typographic color={color} width={160} height={56} pb={4} />
    </Link>
  );
  const transitions = useTransition([null, LogoShown][+show], {
    key: item => (item === null ? 0 : 1),
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
    config: { duration: 150 },
  });
  return transitions((values, item) => <animated.div style={values}>{item}</animated.div>);
};

export const NavbarDesktop = props => {
  const [headerStyle] = useRecoilState(_headerStyle);
  const [headerLogo] = useRecoilState(showHeaderLogo);
  const { pathname } = useRouter();
  const LogoShown = (
    <Link href="/">
      <Logo.Typographic color={headerStyle?.color} width={160} height={56} pb={4} />
    </Link>
  );

  return (
    <Header {...props}>
      <Navbar>
        <Box overflow="hidden" pos="absolute">
          {pathname === '/' ? (
            <AnimatedLogo show={headerLogo} color={headerStyle?.color} />
          ) : (
            LogoShown
          )}
        </Box>
        <ItemGroup>
          <Items side="left" />
          <Items side="right" />
          <NavLink href="https://docs.stellar.tech">Docs</NavLink>
          <ContactButton />
        </ItemGroup>
      </Navbar>
    </Header>
  );
};
