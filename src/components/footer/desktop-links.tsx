import { Box, List, ListItem, Text, SimpleGrid, useToken } from "@chakra-ui/react";

import { Link } from "~/components";

import type { FooterLinksProps } from "./types";

export const DesktopLinks = (props: FooterLinksProps) => {
  const { groups, ...rest } = props;

  const borderRadius = useToken("radii", "lg");

  return (
    <SimpleGrid columns={{ base: 2, lg: groups.length }} spacing={{ base: 8, lg: 16 }} {...rest}>
      {groups.map(({ title, items }) => {
        return (
          <Box key={title} zIndex={1}>
            <Text as="label" mb={8}>
              {title}
            </Text>
            <List>
              {items.map(item => (
                <ListItem
                  my={2}
                  key={item.title}
                  transition="transform 0.1s ease-in-out"
                  _hover={{ transform: "translateX(2px)" }}
                >
                  <Link
                    p={1}
                    opacity={0.6}
                    href={item.href}
                    fontSize={{ base: "xs", lg: "sm" }}
                    css={{ "&:focus": { borderRadius } }}
                    _hover={{ textDecoration: "none", opacity: 0.9 }}
                  >
                    {item.title}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
