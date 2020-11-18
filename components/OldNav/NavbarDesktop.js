import * as React from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/core";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Link } from "../Link";
import { useConfig } from "../../context";

const Header = props => {
  return (
    <Box
      as="header"
      pos="fixed"
      height={20}
      top={0}
      left={0}
      right={0}
      w="100%"
      zIndex={1000}
      bg="original.primary"
      {...props}
    />
  );
};

const Navbar = props => {
  return (
    <Flex
      as="nav"
      pos="relative"
      px={4}
      py={2}
      alignItems="center"
      flexDir="row"
      flexWrap="nowrap"
      justifyContent="flex-start"
      {...props}
    />
  );
};

const ItemGroup = props => (
  <Flex
    flex="1 0 0"
    alignItems="center"
    pointerEvents="auto"
    justifyContent="center"
    {...props}
  />
);

const activeProps = {
  position: "absolute",
  left: 0,
  width: "100%",
  height: "2px",
  backgroundColor: "original.teal",
  content: '""',
  transition: "width: 0.5s, opacity: 0.5s, transform 0.5s",
  transform: "translateY(-10px)"
};

const NavLink = ({ isActive, ...props }) => {
  return (
    <Link
      p={4}
      mr={8}
      pos="relative"
      color="whiteAlpha.800"
      fontWeight="medium"
      transition="all 0.2s"
      _hover={{
        color: "white",
        textDecoration: "none",
        transform: `translateY(-2px)`
      }}
      _before={isActive ? activeProps : null}
      {...props}
    />
  );
};

const Items = ({ side }) => {
  const { pathname } = useRouter();
  const navItems = [];
  const { nav } = useConfig();
  nav[side].map(item => {
    navItems.push(
      <NavLink
        key={item.link}
        href={item.link}
        isActive={pathname === item.link}
      >
        {item.title}
      </NavLink>
    );
  });
  return navItems;
};

export const NavbarDesktop = props => {
  return (
    <Header {...props}>
      <Navbar>
        <ItemGroup>
          <Items side="left" />
        </ItemGroup>
        <Link href="/">
          <Logo.Typographic color="white" width={160} />
        </Link>
        <ItemGroup>
          <Items side="right" />
          <NavLink href="https://docs.stellar.tech">Docs</NavLink>
          <Button
            href="/contact"
            variant="outline"
            _hover={{
              color: "original.dark",
              borderColor: "whiteAlpha.900",
              backgroundColor: "whiteAlpha.900"
            }}
          >
            Talk to Us
          </Button>
        </ItemGroup>
      </Navbar>
    </Header>
  );
};
