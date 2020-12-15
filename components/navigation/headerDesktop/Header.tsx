import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';
import { Link, Logo } from 'site/components';
import { useColorValue } from 'site/context';
import { useNavLogoState } from 'site/hooks';
import { LinkGroup, ContactButton } from './Links';
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
      px={{ lg: 16, xl: 24 }}
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
  const bg = useColorValue('light.500', 'transparent');
  const color = useColorValue('dark.500', 'light.500');
  const cssProps = useColorValue({}, { css: { backdropFilter: 'blur(10px)' } });
  const logoColor = useColorValue('primary.500', 'currentColor');
  return (
    <Header bg={bg} color={color} {...cssProps}>
      <Navbar {...props}>
        <Box overflow="hidden" pos="absolute">
          {pathname === '/' ? (
            <HeaderLogo show={showLogo} color={logoColor} />
          ) : (
            <Link href="/">
              <Logo.Text width={160} height={56} pb={4} color={logoColor} />
            </Link>
          )}
        </Box>
        <NavGroup>
          <LinkGroup side="left" />
          <LinkGroup side="right" />
          <ContactButton />
        </NavGroup>
      </Navbar>
    </Header>
  );
};
