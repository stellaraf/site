import * as React from 'react';
import { Box, List, ListItem, Text, SimpleGrid } from '@chakra-ui/core';
import { Link } from 'site/components';
import { useColorValue } from 'site/context';

import type { IFooterLinks } from './types';

export const DesktopLinks = (props: IFooterLinks) => {
  const { groups, ...rest } = props;
  const sorted = [
    ...new Set(
      groups
        .sort((a, b) => a.footerGroup.sortWeight - b.footerGroup.sortWeight)
        .map(g => g.footerGroup?.title),
    ),
  ];
  const linkColor = useColorValue('whiteAlpha.700', 'whiteAlpha.700');
  return (
    <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={{ base: 8, lg: 16 }} {...rest}>
      {sorted.map((title, i) => {
        const items = groups.filter(g => g.footerGroup?.title === title);
        return (
          <Box key={i} zIndex={1}>
            <Text as="label" mb={8}>
              {title}
            </Text>
            <List>
              {items
                .sort((a, b) => a.sortWeight - b.sortWeight)
                .map((item, i) => (
                  <ListItem key={i} my={2}>
                    <Link href={item.href} fontSize={{ base: 'xs', lg: 'sm' }} color={linkColor}>
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
