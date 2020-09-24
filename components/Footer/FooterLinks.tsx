import * as React from 'react';
import { Box, Flex, List, ListItem, Text } from '@chakra-ui/core';
import { Link } from 'site/components';
import { useColorValue } from 'site/context';

import type { IFooterLinks } from './types';

export const FooterLinks = (props: IFooterLinks) => {
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
    <Flex justifyContent="space-between" {...rest}>
      {sorted.map((title, i) => {
        const items = groups.filter(g => g.footerGroup?.title === title);
        return (
          <Box key={i} mr={8} zIndex={1}>
            <Text as="label" mb={8}>
              {title}
            </Text>
            <List>
              {items
                .sort((a, b) => a.sortWeight - b.sortWeight)
                .map((item, i) => (
                  <ListItem key={i} my={2}>
                    <Link href={item.href} fontSize="sm" color={linkColor}>
                      {item.title}
                    </Link>
                  </ListItem>
                ))}
            </List>
          </Box>
        );
      })}
    </Flex>
  );
};
