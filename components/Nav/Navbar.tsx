import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/core';
import { animated, useTransition } from 'react-spring';
import { Logo } from 'site/components/Logo';
import { Button } from 'site/components/Button';
import { Link } from 'site/components/Link';
import { useSyncedStyle, useHeaderLogo } from 'site/styles';
import navConfig from './config';

const Header = props => (
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
    {...props}
  />
);

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
  const { activeColor, ...style } = props?.linkStyle ?? {};
  return (
    <Link
      p={4}
      mr={8}
      pos="relative"
      fontWeight="medium"
      transition="all 0.2s"
      _hover={{
        textDecoration: 'none',
        transform: `translateY(-2px)`,
      }}
      {...style}
      _after={isActive ? { backgroundColor: activeColor, ...activeProps } : null}
      {...props}
    />
  );
};

const Items = ({ side, ...props }) => {
  const { pathname } = useRouter();
  const navItems = [];
  for (let i of navConfig[side]) {
    navItems.push(
      <NavLink key={i.link} href={i.link} isActive={pathname === i.link} {...props}>
        {i.title}
      </NavLink>,
    );
  }
  return navItems;
};

const ContactButton = props => (
  <Button href="/contact" borderWidth="1px" borderColor="transparent" {...props}>
    Talk to Us
  </Button>
);

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
  const syncedStyle = useSyncedStyle();
  const headerLogo = useHeaderLogo();
  const { pathname } = useRouter();
  const { linkStyle, buttonStyle, ...style } = syncedStyle.value;
  return (
    <Header {...style} {...props}>
      <Navbar>
        <Box overflow="hidden" pos="absolute">
          {pathname === '/' ? (
            <AnimatedLogo show={headerLogo.get()} color={style.color} />
          ) : (
            <Link href="/">
              <Logo.Typographic color={style.color} width={160} height={56} pb={4} />
            </Link>
          )}
        </Box>
        <ItemGroup>
          <Items side="left" linkStyle={linkStyle} />
          <Items side="right" linkStyle={linkStyle} />
          <NavLink href="https://docs.stellar.tech" linkStyle={linkStyle}>
            Docs
          </NavLink>
          <ContactButton {...buttonStyle} />
        </ItemGroup>
      </Navbar>
    </Header>
  );
};
