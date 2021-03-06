import {
  Box,
  List,
  ListItem,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { Link } from '~/components';
import { useColorValue } from '~/context';

import type { IFooterLinks } from './types';

export const MobileLinks: React.FC<IFooterLinks> = (props: IFooterLinks) => {
  const { groups } = props;
  const sorted = [
    ...new Set(
      groups
        .sort((a, b) => a.footerGroup.sortWeight - b.footerGroup.sortWeight)
        .map(g => g.footerGroup?.title),
    ),
  ];
  const linkColor = useColorValue('whiteAlpha.700', 'whiteAlpha.700');
  return (
    <Accordion allowToggle position="relative" zIndex={1}>
      {sorted.map((title, i) => {
        const items = groups.filter(g => g.footerGroup?.title === title);
        const sortedItems = items
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .sort((a, b) => a.sortWeight - b.sortWeight);
        return (
          <AccordionItem
            key={i}
            borderTopWidth={0}
            borderBottomWidth={1}
            _last={{ borderBottomWidth: 1 }}
          >
            <AccordionButton my={4}>
              <Box w="100%" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <List>
                {sortedItems.map((item, i) => (
                  <ListItem key={i} my={2} pl={2}>
                    <Link href={item.href} fontSize="sm" color={linkColor}>
                      {item.title}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
