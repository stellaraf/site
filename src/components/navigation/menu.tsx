import NextLink from "next/link";

import {
  Button,
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuItem as ChakraMenuItem,
  SimpleGrid,
  Text,
  VStack,
  Portal,
  chakra,
} from "@chakra-ui/react";
import { TitleCase } from "use-title-case";

import { Icon } from "~/components";
import { ExternalLink } from "~/icons";

import { useIsActive } from "./use-is-active";

import type { MenuProps, MenuItemProps, MenuSectionProps } from "./types";

const NavButton = chakra(Button, {
  baseStyle: {
    py: 4,
    fontWeight: "medium",
    pos: "relative",
    px: { lg: 2, xl: 3, "2xl": 6 },
    mr: { lg: 4, xl: 8 },
    transition: "all 0.2s",
    _focus: { borderRadius: "lg" },
    _hover: { textDecoration: "none", transform: "translateY(-2px)" },
    opacity: 0.8,
  },
});
const activeAfterProps = {
  left: 0,
  right: 0,
  bottom: 0,
  width: "50%",
  height: "2px",
  content: `""`,
  marginLeft: "auto",
  marginRight: "auto",
  position: "absolute",
  borderRadius: "0.75rem",
  backgroundColor: "blackAlpha.300",
  transform: "translateY(-10px)",
  transition: "width: 0.5s, opacity: 0.5s, transform 0.5s",
};
const activeDarkAfterProps = {
  backgroundColor: "whiteAlpha.300",
};

const MenuItem = (props: MenuItemProps) => {
  const { title, description, icon, showIcon = false, href, ...rest } = props;

  return (
    <ChakraMenuItem
      as={NextLink}
      href={href}
      icon={icon && !showIcon ? <Icon url={icon.url} size={12} noBackground /> : undefined}
      _hover={{ backgroundColor: "blackAlpha.100" }}
      _dark={{
        _hover: { bg: "whiteAlpha.100" },
      }}
      css={{ "& .chakra-menu__icon-wrapper": { marginInlineEnd: 0 } }}
      {...rest}
    >
      {description ? (
        <VStack alignItems="flex-start">
          <Text as={TitleCase} fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" fontWeight="light">
            {description}
          </Text>
        </VStack>
      ) : (
        <Text as={TitleCase} fontSize="lg" fontWeight="bold">
          {title}
        </Text>
      )}
      {showIcon && !icon ? <Icon size={6} icon={ExternalLink} noBackground /> : undefined}
    </ChakraMenuItem>
  );
};

const MenuSection = (props: MenuSectionProps) => {
  const { title, href, columns = 2, items } = props;

  return (
    <MenuGroup>
      {href && (
        <>
          <MenuItem href={href} title={title} width="fit-content" />
          <MenuDivider mx={-4} key={`${title}--divider-1`} />
        </>
      )}
      <SimpleGrid columns={columns}>
        {items.map(item => (
          <MenuItem key={item.title} {...item} />
        ))}
      </SimpleGrid>
    </MenuGroup>
  );
};

export const Menu = (props: MenuProps) => {
  const { title, sections, href, columns = 2, ...rest } = props;

  const isActive = useIsActive(href ?? "/");

  if (href && sections.length === 0) {
    return (
      <NavButton
        as={NextLink}
        href={href}
        _dark={{ _after: isActive ? activeDarkAfterProps : {} }}
        _after={isActive ? activeAfterProps : undefined}
      >
        {title}
      </NavButton>
    );
  }
  return (
    <ChakraMenu isLazy {...rest}>
      <MenuButton
        as={NavButton}
        variant="unstyled"
        height="unset"
        _dark={{ _after: isActive ? activeDarkAfterProps : {} }}
        _after={isActive ? activeAfterProps : undefined}
      >
        {title}
      </MenuButton>
      <Portal>
        <MenuList
          zIndex="overlay"
          p={4}
          color="body-fg"
          borderRadius="lg"
          backgroundColor="light.500"
          _light={{ boxShadow: "lg" }}
          borderColor="blackAlpha.300"
          _dark={{
            borderColor: "whiteAlpha.300",
            backgroundColor: "blackAlpha.700",
            backdropFilter: "blur(8px)",
          }}
          sx={{
            "& .chakra-menu__menuitem": { borderRadius: "lg", background: "inherit" },
            "& .chakra-menu__group:not(:last-of-type)": { mb: 6 },
          }}
        >
          {sections.map(section => (
            <MenuSection key={section.title} columns={columns} {...section} />
          ))}
        </MenuList>
      </Portal>
    </ChakraMenu>
  );
};
