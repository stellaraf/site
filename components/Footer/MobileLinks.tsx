import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link } from 'site/components';
import { useColorValue } from 'site/context';

import type { IFooterLinks } from './types';

export const MobileLinks = (props: IFooterLinks) => {
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
        return (
          <AccordionItem
            key={i}
            _last={{ borderBottomWidth: 1 }}
            borderBottomWidth={1}
            borderTopWidth={0}>
            <AccordionButton my={4}>
              <Box w="100%" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <List>
                {items
                  .sort((a, b) => (a.title > b.title ? 1 : -1))
                  .sort((a, b) => a.sortWeight - b.sortWeight)
                  .map((item, i) => (
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
