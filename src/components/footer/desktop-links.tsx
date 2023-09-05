import { Box, List, ListItem, Text, SimpleGrid, useToken } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Link, Status } from "~/components";

import type { FooterLinksProps } from "./types";

export const DesktopLinks = (props: FooterLinksProps) => {
  const { groups, ...rest } = props;

  const borderRadius = useToken("radii", "lg");
  const fnTitle = useTitleCase();

  return (
    <>
      {groups.map((row, i) => (
        <SimpleGrid
          key={i}
          mb={12}
          justifyContent="space-evenly"
          spacing={{ base: 8, lg: 16 }}
          columns={{ base: 2, lg: groups[0].length * 2 }}
          sx={{
            // CSS fuckery to center-align the last row which may not be full.
            // See: https://css-irl.info/controlling-leftover-grid-items
            [`& :last-child:nth-of-type(${groups[0].length}n - 1)`]: {
              base: { gridColumnEnd: -2 },
              lg: { gridColumnEnd: -2 },
            },
            [`& :nth-last-of-type(2):nth-of-type(${groups[0].length}n + 1)`]: {
              lg: { gridColumnEnd: groups[0].length - 1 },
            },
            [`& :last-child:nth-of-type(${groups[0].length}n - 2)`]: {
              lg: { gridColumnEnd: { base: 4, lg: groups[0].length * 2 + 1 } },
            },
          }}
          {...rest}
        >
          {row.map(({ group, items }) => {
            return (
              <Box key={group} zIndex={1} gridColumn="span 2">
                <Text as="label" mb={8}>
                  {fnTitle(group)}
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
                        fontSize={{ base: "xs", lg: "sm" }}
                        css={{ "&:focus": { borderRadius } }}
                        showIcon={item.external && item.showIcon}
                        _hover={{ textDecoration: "none", opacity: 0.9 }}
                        href={item.external ? item.slug : `/${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </ListItem>
                  ))}
                  {group === "Cloud" && (
                    <ListItem my={2} transition="transform 0.1s ease-in-out">
                      <Status
                        p={1}
                        opacity={0.6}
                        css={{ "&:focus": { borderRadius } }}
                        _hover={{ textDecoration: "none", opacity: 0.9 }}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            );
          })}
        </SimpleGrid>
      ))}
    </>
  );
};
