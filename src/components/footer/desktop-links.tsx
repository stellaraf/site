import { Box, List, ListItem, Text, SimpleGrid, useToken } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Link } from "~/components";

import { useFooterLinks } from "./use-footer-links";

import type { FooterLinksProps } from "./types";

export const DesktopLinks = (props: FooterLinksProps) => {
  const { groups, ...rest } = props;

  const borderRadius = useToken("radii", "lg");
  const fnTitle = useTitleCase();

  const rows = useFooterLinks(groups);

  return (
    <>
      {rows.map((row, i) => (
        <SimpleGrid
          key={i}
          mb={12}
          justifyContent="space-evenly"
          spacing={{ base: 8, lg: 16 }}
          columns={{ base: 2, lg: rows[0].length * 2 }}
          sx={{
            // CSS fuckery to center-align the last row which may not be full.
            // See: https://css-irl.info/controlling-leftover-grid-items
            [`& :last-child:nth-of-type(${rows[0].length}n - 1)`]: {
              base: { gridColumnEnd: -2 },
              lg: { gridColumnEnd: -2 },
            },
            [`& :nth-last-of-type(2):nth-of-type(${rows[0].length}n + 1)`]: {
              lg: { gridColumnEnd: rows[0].length - 1 },
            },
            [`& :last-child:nth-of-type(${rows[0].length}n - 2)`]: {
              lg: { gridColumnEnd: { base: 4, lg: rows[0].length * 2 + 1 } },
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
                        href={`/${item.slug}`}
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
      ))}
    </>
  );
};
