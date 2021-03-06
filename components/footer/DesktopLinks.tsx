import { Box, List, ListItem, Text, SimpleGrid, useToken } from '@chakra-ui/react';
import { Link } from '~/components';

import type { IFooterLinks } from './types';

export const DesktopLinks: React.FC<IFooterLinks> = (props: IFooterLinks) => {
  const { groups, ...rest } = props;
  const sorted = [
    ...new Set(
      groups
        .sort((a, b) => a.footerGroup.sortWeight - b.footerGroup.sortWeight)
        .map(g => g.footerGroup?.title),
    ),
  ];
  const borderRadius = useToken('radii', 'lg');
  return (
    <SimpleGrid columns={{ base: 2, lg: sorted.length }} spacing={{ base: 8, lg: 16 }} {...rest}>
      {sorted.map((title, i) => {
        const items = groups.filter(g => g.footerGroup?.title === title);
        return (
          <Box key={i} zIndex={1}>
            <Text as="label" mb={8}>
              {title}
            </Text>
            <List>
              {items
                .sort((a, b) => (a.title > b.title ? 1 : -1))
                .sort((a, b) => a.sortWeight - b.sortWeight)
                .map((item, i) => (
                  <ListItem
                    key={i}
                    my={2}
                    transition="transform 0.1s ease-in-out"
                    _hover={{ transform: 'translateX(2px)' }}
                  >
                    <Link
                      p={1}
                      opacity={0.6}
                      href={item.href}
                      fontSize={{ base: 'xs', lg: 'sm' }}
                      css={{ '&:focus': { borderRadius } }}
                      _hover={{ textDecoration: 'none', opacity: 0.9 }}
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
